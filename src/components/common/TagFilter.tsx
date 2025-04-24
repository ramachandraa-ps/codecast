
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onChange,
  className,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("tag-container");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 z-10 bg-card/80"
        onClick={() => handleScroll("left")}
      >
        <ChevronLeft size={18} />
      </Button>

      <ScrollArea id="tag-container" className="flex-1 px-8">
        <div className="flex items-center gap-2 py-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 z-10 bg-card/80"
        onClick={() => handleScroll("right")}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

export default TagFilter;

