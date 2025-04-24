
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "@/types";
import { formatDistance } from "date-fns";
import { Eye, MessageSquare, ThumbsDown, ThumbsUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface VideoMetricsCardProps {
  video: Video;
  className?: string;
}

const VideoMetricsCard: React.FC<VideoMetricsCardProps> = ({
  video,
  className,
}) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getAvgWatchDuration = () => {
    // Simulate avg watch duration between 40-95%
    return Math.floor(Math.random() * 55) + 40;
  };

  const getEngagementRate = () => {
    // Calculate engagement as (likes + comments) / views
    const commentCount = Math.floor(Math.random() * 100); // Mock comment count
    const rate = ((video.likeCount + commentCount) / video.viewCount) * 100;
    return rate.toFixed(1);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <Link to={`/video/${video.id}`}>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full md:h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium text-white">
              {formatDuration(video.duration)}
            </div>
          </Link>
        </div>

        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="space-y-1">
              <Link to={`/video/${video.id}`} className="hover:underline">
                <CardTitle className="line-clamp-2 text-base">{video.title}</CardTitle>
              </Link>
              <p className="text-xs text-muted-foreground">
                Published {formatDistance(new Date(video.createdAt), new Date(), { addSuffix: true })}
              </p>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye size={16} className="mr-1" /> Views
                </div>
                <p className="text-lg font-medium">{video.viewCount.toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-1" /> Avg. Watch
                </div>
                <p className="text-lg font-medium">{getAvgWatchDuration()}%</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <ThumbsUp size={16} className="mr-1" /> Likes
                </div>
                <p className="text-lg font-medium">{video.likeCount.toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <ThumbsDown size={16} className="mr-1" /> Dislikes
                </div>
                <p className="text-lg font-medium">{video.dislikeCount.toLocaleString()}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageSquare size={16} className="mr-1" /> Comments
                </div>
                <p className="text-lg font-medium">
                  {Math.floor(video.viewCount * 0.03).toLocaleString()}
                </p>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
                <p className="text-lg font-medium">{getEngagementRate()}%</p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default VideoMetricsCard;
