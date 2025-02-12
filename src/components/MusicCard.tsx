
import { Heart, MessageCircle, Share2, Play, Flame, Headphones } from "lucide-react";
import { useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";

interface MusicCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  likes: number;
  comments: number;
  shares: number;
}

export function MusicCard({ title, artist, coverUrl, likes, comments, shares }: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reactions, setReactions] = useState({
    fire: 0,
    headphones: 0,
    love: 0
  });
  
  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };
  
  return (
    <div 
      className="music-card w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <img 
          src={coverUrl} 
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}>
          <button 
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </button>
        </div>
      </div>
      
      {isPlaying && (
        <div className="px-4 py-2">
          <AudioVisualizer />
        </div>
      )}
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <button 
            onClick={() => handleReaction('fire')}
            className="flex items-center space-x-1 text-sm hover:text-orange-500 transition-colors px-2 py-1 rounded-full hover:bg-orange-500/10"
          >
            <Flame className="w-5 h-5" />
            <span>{reactions.fire}</span>
          </button>
          
          <button 
            onClick={() => handleReaction('headphones')}
            className="flex items-center space-x-1 text-sm hover:text-purple-500 transition-colors px-2 py-1 rounded-full hover:bg-purple-500/10"
          >
            <Headphones className="w-5 h-5" />
            <span>{reactions.headphones}</span>
          </button>
          
          <button 
            onClick={() => handleReaction('love')}
            className="flex items-center space-x-1 text-sm hover:text-pink-500 transition-colors px-2 py-1 rounded-full hover:bg-pink-500/10"
          >
            <Heart className="w-5 h-5" />
            <span>{reactions.love}</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between border-t border-border pt-3">
          <button className="flex items-center space-x-1 text-sm hover:text-primary transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-sm hover:text-primary transition-colors">
            <Share2 className="w-5 h-5" />
            <span>{shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
