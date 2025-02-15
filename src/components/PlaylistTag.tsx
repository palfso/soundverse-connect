
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlaylistTagProps {
  name: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  description?: string;
}

export function PlaylistTag({ name, color = "default", description }: PlaylistTagProps) {
  const baseComponent = (
    <Badge
      variant="secondary"
      className={`
        ${color === "primary" && "bg-primary/10 text-primary hover:bg-primary/20"}
        ${color === "success" && "bg-green-500/10 text-green-500 hover:bg-green-500/20"}
        ${color === "warning" && "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"}
        ${color === "danger" && "bg-red-500/10 text-red-500 hover:bg-red-500/20"}
      `}
    >
      {name}
    </Badge>
  );

  if (description) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {baseComponent}
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return baseComponent;
}
