
import { Heart, MessageCircle, Share2, Play } from "lucide-react";
import { useState } from "react";

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
          <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-colors">
            <Play className="w-8 h-8 text-white fill-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center space-x-1 text-sm hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
            <span>{likes}</span>
          </button>
          
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
