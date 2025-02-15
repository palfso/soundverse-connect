
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Minimize2,
  Maximize2,
  Heart
} from "lucide-react";

interface MiniPlayerProps {
  currentTrack?: {
    title: string;
    artist: string;
    coverUrl: string;
  };
}

export function MiniPlayer({ currentTrack }: MiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [progress, setProgress] = useState([0]);

  if (!currentTrack) return null;

  return (
    <div className={`fixed bottom-20 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-24'
    }`}>
      <div className="container max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title}
              className="w-10 h-10 rounded-md object-cover"
            />
            <div className={`transition-opacity duration-200 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
              <h4 className="font-medium line-clamp-1">{currentTrack.title}</h4>
              <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? 'text-pink-500' : ''}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <SkipBack className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              
              <Button variant="ghost" size="icon">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            {!isMinimized && (
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
            )}

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="w-5 h-5" />
              ) : (
                <Minimize2 className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
