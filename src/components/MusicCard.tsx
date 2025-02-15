
import { Heart, MessageCircle, Share2, Play, Flame, Headphones, Send } from "lucide-react";
import { useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { UserAvatar } from "./UserAvatar";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MusicCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  likes: number;
  comments: number;
  shares: number;
  user: {
    username: string;
    avatarUrl: string;
  };
}

export function MusicCard({ title, artist, coverUrl, likes, comments, shares, user }: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
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
    
    toast({
      title: "Réaction ajoutée",
      description: `Vous avez réagi avec ${
        type === 'fire' ? '🔥' : type === 'headphones' ? '🎧' : '❤️'
      }`,
    });
  };

  const handleShareInDM = () => {
    toast({
      title: "Musique partagée",
      description: "La musique a été partagée en message privé",
    });
  };
  
  return (
    <TooltipProvider>
      <div 
        className="music-card w-full max-w-sm mx-auto animate-fade-in"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4 border-b border-border">
          <Link to="/profile" className="flex items-center space-x-3 group">
            <UserAvatar user={user} size="sm" />
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              @{user.username}
            </span>
          </Link>
        </div>

        <div className="relative aspect-square">
          <img 
            src={coverUrl} 
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (!isPlaying) {
                      toast({
                        title: "Lecture démarrée",
                        description: `${title} - ${artist}`,
                      });
                    }
                  }}
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? 'Mettre en pause' : 'Lancer la lecture'}</p>
              </TooltipContent>
            </Tooltip>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => handleReaction('fire')}
                  className="flex items-center space-x-1 text-sm hover:text-orange-500 transition-colors px-2 py-1 rounded-full hover:bg-orange-500/10"
                >
                  <Flame className="w-5 h-5" />
                  <span>{reactions.fire}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cette musique est 🔥</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => handleReaction('headphones')}
                  className="flex items-center space-x-1 text-sm hover:text-purple-500 transition-colors px-2 py-1 rounded-full hover:bg-purple-500/10"
                >
                  <Headphones className="w-5 h-5" />
                  <span>{reactions.headphones}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>J'écoute en boucle</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => handleReaction('love')}
                  className="flex items-center space-x-1 text-sm hover:text-pink-500 transition-colors px-2 py-1 rounded-full hover:bg-pink-500/10"
                >
                  <Heart className="w-5 h-5" />
                  <span>{reactions.love}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ajouter aux favoris</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleShareInDM}
                  className="ml-auto hover:text-blue-500"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Partager en message privé</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex items-center justify-between border-t border-border pt-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center space-x-1 text-sm hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voir les commentaires</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center space-x-1 text-sm hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>{shares}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Partager</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
