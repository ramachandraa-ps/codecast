
import { Video } from "@/types";
import VideoCard from "./VideoCard";

interface VideoGridProps {
  videos: Video[];
  className?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, className }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No videos found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
