
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import { CreatePlaylistDTO } from "@/types/playlist";
import { useToast } from "@/components/ui/use-toast";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreatePlaylistDTO>({
    name: "",
    description: "",
    isPublic: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement playlist creation
      console.log("Creating playlist:", formData);
      
      toast({
        title: "Playlist créée",
        description: "Votre playlist a été créée avec succès",
      });
      
      navigate("/playlists");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la playlist",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle playlist</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de la playlist</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ma super playlist"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (optionnelle)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Décrivez votre playlist..."
            className="resize-none"
          />
        </div>

        <div className="space-y-4">
          <Label>Image de couverture (optionnelle)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Button type="button" variant="outline">
              <ImagePlus className="w-4 h-4 mr-2" />
              Choisir une image
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="public"
            checked={formData.isPublic}
            onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
          />
          <Label htmlFor="public">Rendre la playlist publique</Label>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Créer la playlist
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;
