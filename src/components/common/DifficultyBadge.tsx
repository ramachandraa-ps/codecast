
import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/types";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className }) => {
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-difficulty-beginner text-white";
      case "intermediate":
        return "bg-difficulty-intermediate text-white";
      case "advanced":
        return "bg-difficulty-advanced text-white";
    }
  };

  return (
    <Badge className={cn(getDifficultyColor(difficulty), className)}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};

export default DifficultyBadge;
