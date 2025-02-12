
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/user";

interface UserAvatarProps {
  user: Pick<UserProfile, "username" | "avatarUrl">;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-20 w-20"
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={user.avatarUrl} alt={user.username} />
      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
