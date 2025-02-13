
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'inscription réussie
    if (email && password && username && displayName) {
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur MusicFlow!"
      });
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Inscription</h1>
          <p className="mt-2 text-muted-foreground">
            Rejoignez la communauté MusicFlow
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Nom d'utilisateur
              </label>
              <Input
                id="username"
                type="text"
                placeholder="votre_pseudo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                Nom d'affichage
              </label>
              <Input
                id="displayName"
                type="text"
                placeholder="Votre nom public"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
