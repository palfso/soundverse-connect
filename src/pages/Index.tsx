
import { MusicCard } from "@/components/MusicCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { UserCircle, Search, TrendingUp, Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { MiniPlayer } from "@/components/MiniPlayer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const musicPosts = [
  {
    id: 1,
    title: "Starboy",
    artist: "The Weeknd",
    coverUrl: "/lovable-uploads/5259fc9c-304a-4272-a957-f87c06a2e81b.png",
    likes: 2345,
    comments: 156,
    shares: 89,
    trending: true,
    user: {
      username: "musiclover",
      avatarUrl: "/lovable-uploads/5259fc9c-304a-4272-a957-f87c06a2e81b.png"
    }
  },
  {
    id: 2,
    title: "brat",
    artist: "Unknown Artist",
    coverUrl: "/lovable-uploads/eaecae18-c47f-4626-94b7-fd4f0151e39b.png",
    likes: 1678,
    comments: 92,
    shares: 45,
    trending: false,
    user: {
      username: "beatmaker",
      avatarUrl: "/lovable-uploads/eaecae18-c47f-4626-94b7-fd4f0151e39b.png"
    }
  },
  {
    id: 3,
    title: "The Deep",
    artist: "Ocean Sounds",
    coverUrl: "/lovable-uploads/9c13248e-f703-40aa-9169-e7410aa762bc.png",
    likes: 1893,
    comments: 134,
    shares: 67,
    trending: true,
    user: {
      username: "wavesurfer",
      avatarUrl: "/lovable-uploads/9c13248e-f703-40aa-9169-e7410aa762bc.png"
    }
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showTrending, setShowTrending] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "alphabetical">("recent");
  const [currentTrack, setCurrentTrack] = useState(musicPosts[0]);

  const getSortedPosts = () => {
    let sorted = [...musicPosts];
    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => b.likes - a.likes);
      case "alphabetical":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const filteredPosts = getSortedPosts().filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrending = showTrending ? post.trending : true;
    return matchesSearch && matchesTrending;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 relative">
          <div className="absolute right-4 top-0 flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <UserCircle className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
          <div className="mb-6">
            <img src="/lovable-uploads/f6d2ebf5-91c5-4785-8503-1c47a2ead8af.png" alt="Flow" className="h-16 mx-auto" />
          </div>
          <p className="text-lg text-muted-foreground mb-8">Discover and share the music you love</p>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for songs or artists..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 justify-center">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="hiphop">Hip Hop</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Trier par
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Plus récents
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Plus populaires
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                    Ordre alphabétique
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={showTrending ? "default" : "outline"}
                onClick={() => setShowTrending(!showTrending)}
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="animate-fade-in" onClick={() => setCurrentTrack(post)}>
              <MusicCard {...post} />
            </div>
          ))}
        </div>
      </div>

      <MiniPlayer currentTrack={currentTrack} />
    </div>
  );
};

export default Index;
