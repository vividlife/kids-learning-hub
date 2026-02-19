// Simple PDF viewer using iframe (add react-pdf for better support later)
// Note: needs @react-pdf-viewer/core in deps for advanced features

'use client'

interface PdfViewerProps {
  src: string;
  className?: string;
}

export default function PdfViewer({ src, className = '' }: PdfViewerProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border ${className}`}>
      <iframe
        src={src}
        className="w-full h-[500px]"
        style={{ border: 'none' }}
      />
    </div>
  );
}
