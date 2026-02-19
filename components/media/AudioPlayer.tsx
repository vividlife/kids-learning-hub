'use client'

import ReactAudioPlayer from 'react-audio-player';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface AudioPlayerProps {
  src: string;
  className?: string;
}

export default function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`flex items-center gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm shadow-lg ${className}`}>
      <ReactAudioPlayer
        src={src}
        controls={false}
        autoPlay={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />
      <Button 
        variant="ghost" 
        size="lg" 
        className="p-3 rounded-full bg-white/80 hover:bg-white shadow-md w-12 h-12"
        onClick={() => {
          const audio = document.querySelector('audio') as HTMLAudioElement;
          if (audio) {
            if (isPlaying) audio.pause();
            else audio.play();
          }
        }}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </Button>
      <div className="flex-1">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-white/80">
        <Volume2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
