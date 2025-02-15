
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
  id: string;
  title: string;
  artist: string;
  timestamp: Date;
}

// Mock data
const mockHistory: HistoryItem[] = [
  {
    id: "1",
    title: "Starboy",
    artist: "The Weeknd",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "brat",
    artist: "Unknown Artist",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export function ListeningHistory() {
  const { toast } = useToast();

  const clearHistory = () => {
    toast({
      title: "Historique effacé",
      description: "Votre historique d'écoute a été effacé avec succès",
    });
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (minutes < 1440) return `Il y a ${Math.floor(minutes / 60)}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-sm p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Historique d'écoute
        </h3>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          <X className="w-4 h-4 mr-2" />
          Effacer
        </Button>
      </div>
      <ScrollArea className="h-[300px] rounded-md border">
        <div className="p-4 space-y-4">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.artist}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatTimestamp(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
