
import { Video } from "@/types";
import { Link } from "react-router-dom";
import { Eye, ThumbsUp, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface VideoCardProps {
  video: Video;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className }) => {
  const { isAuthenticated } = useAuth();
  const { toggleWatchLater, getWatchLater } = useData();
  const [isHovered, setIsHovered] = useState(false);
  
  const watchLater = getWatchLater();
  const isInWatchLater = watchLater.some(v => v.id === video.id);
  
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-difficulty-beginner text-white";
      case "intermediate": return "bg-difficulty-intermediate text-white";
      case "advanced": return "bg-difficulty-advanced text-white";
      default: return "bg-muted";
    }
  };
  
  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleWatchLater(video.id);
    }
  };

  return (
    <Link to={`/video/${video.id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-200 hover:shadow-md group",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </div>
          
          {isAuthenticated && isHovered && (
            <Button
              variant={isInWatchLater ? "default" : "outline"}
              size="sm"
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 border-none"
              onClick={handleWatchLaterClick}
            >
              <Clock size={16} className="mr-1" />
              {isInWatchLater ? "Saved" : "Watch Later"}
            </Button>
          )}
          
          <Badge 
            className={cn(
              "absolute top-2 left-2", 
              getDifficultyColor(video.difficulty)
            )}
          >
            {video.difficulty.charAt(0).toUpperCase() + video.difficulty.slice(1)}
          </Badge>
        </div>
        
        <CardContent className="p-3">
          <div className="flex gap-3">
            <img
              src={video.creator.avatar}
              alt={video.creator.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{video.creator.name}</p>
              
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {video.viewCount.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} />
                  {video.likeCount.toLocaleString()}
                </span>
                <span>
                  {formatDistance(new Date(video.createdAt), new Date(), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;
