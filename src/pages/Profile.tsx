import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/types/user";
import { ArrowLeft, CalendarDays, Home, Mail, Music, Users, Camera, X, Edit2, Save, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { MusicCard } from "@/components/MusicCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schéma de validation pour le formulaire d'édition du profil
const profileFormSchema = z.object({
  displayName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  bio: z.string().max(500, "La biographie ne peut pas dépasser 500 caractères"),
  email: z.string().email("Email invalide"),
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: z.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères").optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Données de test
const mockProfile: UserProfile = {
  id: "1",
  username: "musiclover",
  displayName: "Music Lover",
  bio: "Passionate about music and sharing great tunes with the community! 🎵",
  avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  followers: 1234,
  following: 567,
  playlists: 23,
  joinedDate: "2023-01-15",
  badges: [
    {
      id: "1",
      name: "Mélomane",
      description: "A partagé plus de 100 morceaux",
      icon: "🎵",
      level: "gold"
    },
    {
      id: "2",
      name: "Défricheur",
      description: "Découvre régulièrement de nouveaux artistes",
      icon: "🔍",
      level: "silver"
    }
  ],
  expertise: {
    sharedMusic: 156,
    interactions: 789
  },
  posts: [
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
  ]
};

const profilePosts = mockProfile.posts.map(post => ({
  ...post,
  user: {
    username: "currentUser",
    avatarUrl: "/profile-avatar.jpg"
  }
}));

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();
  const [visibleBadges, setVisibleBadges] = useState<string[]>(
    mockProfile.badges.map(badge => badge.id)
  );

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: mockProfile.displayName,
      username: mockProfile.username,
      bio: mockProfile.bio,
      email: "user@example.com", // Exemple
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast({
        title: "Photo de profil mise à jour",
        description: "Vos modifications ont été enregistrées",
      });
    }
  };

  const toggleBadgeVisibility = (badgeId: string) => {
    setVisibleBadges(prev => 
      prev.includes(badgeId) 
        ? prev.filter(id => id !== badgeId)
        : [...prev, badgeId]
    );
  };

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifier
                </>
              )}
            </Button>
            <Link to="/messages">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Messages
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <UserAvatar user={mockProfile} size="lg" />
                  <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'affichage</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biographie</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4 border rounded-lg p-4">
                  <h3 className="font-medium">Badges visibles</h3>
                  {mockProfile.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                      <Switch
                        checked={visibleBadges.includes(badge.id)}
                        onCheckedChange={() => toggleBadgeVisibility(badge.id)}
                      />
                    </div>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Modifier le mot de passe
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier le mot de passe</DialogTitle>
                      <DialogDescription>
                        Entrez votre mot de passe actuel et votre nouveau mot de passe.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe actuel</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nouveau mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer les modifications
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Link to="/messages">
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" size="icon">
                    <Home className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <UserAvatar user={mockProfile} size="lg" />
              <div className="text-center">
                <h1 className="text-2xl font-bold">{mockProfile.displayName}</h1>
                <p className="text-muted-foreground">@{mockProfile.username}</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                {mockProfile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                      badge.level === 'gold' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : badge.level === 'silver'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    <span>{badge.icon}</span>
                    <span className="font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold">{mockProfile.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{mockProfile.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{mockProfile.playlists}</p>
                <p className="text-sm text-muted-foreground">Playlists</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground">{mockProfile.bio}</p>
              <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>Joined {new Date(mockProfile.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button>Follow</Button>
              <Link to="/messages">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="posts" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts" className="flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="playlists" className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Playlists
                </TabsTrigger>
                <TabsTrigger value="liked" className="flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Liked
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profilePosts.map((post) => (
                    <MusicCard key={post.id} {...post} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="playlists" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="h-48 bg-accent rounded-lg flex items-center justify-center">
                    Playlists coming soon
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="liked" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="h-48 bg-accent rounded-lg flex items-center justify-center">
                    Liked content coming soon
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
