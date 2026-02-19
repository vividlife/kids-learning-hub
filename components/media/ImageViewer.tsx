'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
  onClose?: () => void;
}

export default function ImageViewer({ src, alt = '', className = '', onClose }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="relative max-w-4xl max-h-[90vh] flex flex-col">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-white hover:bg-white/20">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-white hover:bg-white/20">
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[80vh] object-contain transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}
