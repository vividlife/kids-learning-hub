import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface FlashcardProps {
  word: {
    word: string;
    translation: string;
    pronunciation: string;
    example: string;
    category: string;
    imageUrl?: string;
    audioUrl?: string;
    difficulty: string;
  };
  onPronounce: () => void;
  onFlip: () => void;
  isFlipped: boolean;
  onNext?: () => void;
}

export default function Flashcard({ word, onPronounce, onFlip, isFlipped, onNext }: FlashcardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const imageUrl = word.imageUrl || `https://source.unsplash.com/400x300/?${word.word.toLowerCase()}`;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
    onPronounce();
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={cardRef}
        className={`relative w-96 h-120 perspective-1000 transition-transform duration-700 ease-in-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
      >
        {/* Front */}
        <Card className="absolute w-full h-full backface-hidden shadow-2xl cursor-pointer flex items-center justify-center p-8 text-center bg-gradient-to-br from-blue-400 to-purple-500 text-white">
          <div>
            <Image
              src={imageUrl}
              alt={word.word}
              width={256}
              height={192}
              className="w-64 h-48 object-cover rounded-xl mb-6 shadow-lg mx-auto"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{word.word}</h2>
            <p className="text-2xl font-semibold drop-shadow-md">Tap to flip!</p>
          </div>
        </Card>
        
        {/* Back */}
        <Card className={`absolute w-full h-full backface-hidden rotate-y-180 shadow-2xl flex flex-col justify-between p-8 text-center bg-gradient-to-br from-green-400 to-emerald-500 text-white`}>
          <div>
            <Image
              src={imageUrl}
              alt={word.word}
              width={256}
              height={192}
              className="w-64 h-48 object-cover rounded-xl mb-6 shadow-lg mx-auto"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h2 className="text-4xl font-bold mb-4">{word.translation}</h2>
            <p className="text-xl mb-2 italic">/{word.pronunciation}/</p>
            <p className="text-lg bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">"{word.example}"</p>
            <div className="inline-block bg-white/30 px-4 py-2 rounded-full text-sm font-bold">
              {word.category}
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={speak}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            >
              <Play className="w-5 h-5" />
            </Button>
            {onNext && (
              <Button 
                variant="default" 
                size="sm"
                onClick={onNext}
                className="bg-white text-green-800 hover:bg-white/80 font-bold"
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Custom CSS for 3D flip */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
