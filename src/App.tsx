
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Home, User, MessageSquare, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/Search";
import Playlists from "./pages/Playlists";
import CreatePlaylist from "./pages/CreatePlaylist";
import PlaylistDetail from "./pages/PlaylistDetail";

const queryClient = new QueryClient();

function BottomNav() {
  const location = useLocation();
  
  const links = [
    { icon: Home, to: "/", label: "Home" },
    { icon: Search, to: "/search", label: "Search" },
    { icon: Plus, to: "/upload", label: "Upload" },
    { icon: MessageSquare, to: "/messages", label: "Messages" },
    { icon: User, to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50">
      <div className="container max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {links.map(({ icon: Icon, to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-lg transition-colors",
                location.pathname === to 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/create" element={<CreatePlaylist />} />
            <Route path="/playlists/:id" element={<PlaylistDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
