
import { Difficulty } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface VideoFiltersProps {
  difficulty?: Difficulty;
  category?: string;
  categories: string[];
  onDifficultyChange: (difficulty?: Difficulty) => void;
  onCategoryChange: (category?: string) => void;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({
  difficulty,
  category,
  categories,
  onDifficultyChange,
  onCategoryChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            Difficulty
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by difficulty</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={difficulty || "all"}
            onValueChange={(value) => {
              if (value === "all") {
                onDifficultyChange(undefined);
              } else {
                onDifficultyChange(value as Difficulty);
              }
            }}
          >
            <DropdownMenuRadioItem value="all">All levels</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="beginner">Beginner</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="intermediate">Intermediate</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="advanced">Advanced</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            Category
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-80 overflow-y-auto">
          <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={category || "all"}
            onValueChange={(value) => {
              if (value === "all") {
                onCategoryChange(undefined);
              } else {
                onCategoryChange(value);
              }
            }}
          >
            <DropdownMenuRadioItem value="all">All categories</DropdownMenuRadioItem>
            {categories.map((cat) => (
              <DropdownMenuRadioItem key={cat} value={cat}>
                {cat}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default VideoFilters;
