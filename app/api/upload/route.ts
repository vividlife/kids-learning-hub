import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { writeFile } from 'fs/promises'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const wordId = formData.get('wordId') as string // optional for updating existing word
    const field = formData.get('field') as string || 'file' // image, audio

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let mimeType = file.type
    let ext = '.dat'
    if (mimeType?.startsWith('image/')) {
      ext = '.webp' // or .jpg
    } else if (mimeType?.startsWith('audio/')) {
      ext = '.mp3'
    } else if (mimeType?.startsWith('video/')) {
      ext = '.mp4'
    } else if (mimeType === 'application/pdf') {
      ext = '.pdf'
    }

    const filename = `${crypto.randomUUID()}${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', field || 'media')
    await fs.mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, filename)
    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${field || 'media'}/${filename}`

    // Optional: update word if wordId provided
    let updatedWord = null
    if (wordId && field) {
      // Use Prisma to update
      const prisma = await import('@/lib/db').then(m => m.db)
      await prisma.word.update({
        where: { id: wordId },
        data: { [`${field}Url`]: publicUrl }
      })
      updatedWord = await prisma.word.findUnique({ where: { id: wordId } })
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      updatedWord
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
