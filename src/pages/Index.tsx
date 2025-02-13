
import { MusicCard } from "@/components/MusicCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

const musicPosts = [
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
  },
  {
    id: 3,
    title: "The Deep",
    artist: "Ocean Sounds",
    coverUrl: "/lovable-uploads/9c13248e-f703-40aa-9169-e7410aa762bc.png",
    likes: 1893,
    comments: 134,
    shares: 67
  }
];

const Index = () => {
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
          <h1 className="text-4xl font-bold mb-4">MusicFlow</h1>
          <p className="text-lg text-muted-foreground">Discover and share the music you love</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {musicPosts.map((post) => (
            <div key={post.id} className="animate-fade-in">
              <MusicCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
