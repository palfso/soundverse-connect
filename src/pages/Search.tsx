
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MusicCard } from "@/components/MusicCard";
import { Search as SearchIcon, Filter } from "lucide-react";
import { UserProfile, MusicPost } from "@/types/user";

// Mock data for testing
const mockSearchResults: MusicPost[] = [
  {
    id: 1,
    title: "Starboy",
    artist: "The Weeknd",
    coverUrl: "/lovable-uploads/5259fc9c-304a-4272-a957-f87c06a2e81b.png",
    likes: 2345,
    comments: 156,
    shares: 89
  },
  {
    id: 2,
    title: "brat",
    artist: "Unknown Artist",
    coverUrl: "/lovable-uploads/eaecae18-c47f-4626-94b7-fd4f0151e39b.png",
    likes: 1678,
    comments: 92,
    shares: 45
  }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState([0, 10]);
  const [sortBy, setSortBy] = useState("popularity");

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Searching with:", { searchTerm, genre, duration, sortBy });
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Rechercher des morceaux, artistes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch}>
          <SearchIcon className="w-4 h-4 mr-2" />
          Rechercher
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Genre musical" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="rap">Rap</SelectItem>
            <SelectItem value="electronic">Electronic</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularité</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Titre</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 space-y-2">
          <label className="text-sm text-muted-foreground">Durée (minutes)</label>
          <Slider
            value={duration}
            onValueChange={setDuration}
            max={10}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSearchResults.map((track) => (
          <MusicCard
            key={track.id}
            {...track}
            user={{ username: "artist", avatarUrl: "" }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
