'use client'

import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Play, Volume2, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className = '' }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      <ReactPlayer
        url={src}
        playing={playing}
        muted={muted}
        width="100%"
        height="300px"
        controls={true}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="rounded-2xl"
      />
      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setPlaying(!playing)}
          className="bg-white/80 backdrop-blur-sm text-black"
        >
          {playing ? '⏸️' : '▶️'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setMuted(!muted)}
          className="bg-white/80 backdrop-blur-sm text-black"
        >
          <Volume2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
