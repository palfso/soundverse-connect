import { MusicCard } from "@/components/MusicCard";
import { ThemeToggle } from "@/components/ThemeToggle";

// Données de test
const musicPosts = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    likes: 1234,
    comments: 89,
    shares: 45
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    likes: 2341,
    comments: 167,
    shares: 78
  },
  {
    id: 3,
    title: "Bad Habit",
    artist: "Steve Lacy",
    coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    likes: 987,
    comments: 56,
    shares: 23
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 relative">
          <div className="absolute right-4 top-0">
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
