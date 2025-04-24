
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import VideoPlayer from "@/components/common/VideoPlayer";
import { useData } from "@/contexts/DataContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistance } from "date-fns";
import { Eye, ThumbsUp, ThumbsDown, Clock, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Comment as CommentType } from "@/types";
import DifficultyBadge from "@/components/common/DifficultyBadge";
import { useAuth } from "@/contexts/AuthContext";
import VideoGrid from "@/components/common/VideoGrid";
import { useToast } from "@/components/ui/use-toast";

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    getVideoById, 
    getCommentsByVideoId, 
    addComment, 
    toggleLike, 
    toggleDislike,
    incrementView, 
    addToRecentlyWatched,
    toggleWatchLater,
    getWatchLater,
    videos,
  } = useData();
  
  const { user, isAuthenticated } = useAuth();
  
  const [comment, setComment] = useState("");
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  
  const video = getVideoById(id || "");
  const comments = getCommentsByVideoId(id || "");
  const watchLater = getWatchLater();
  const isInWatchLater = watchLater.some(v => v.id === id);
  
  useEffect(() => {
    if (video) {
      // Increment view count once per session
      incrementView(video.id);
      addToRecentlyWatched(video.id);
    } else {
      navigate("/not-found");
    }
  }, [video, incrementView, addToRecentlyWatched, navigate]);
  
  if (!video) {
    return null; // Will redirect in the useEffect
  }
  
  // Format view count
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment on videos",
      });
      return;
    }
    
    if (comment.trim() === "") return;
    
    addComment(video.id, comment);
    setComment("");
  };
  
  // Handle like/dislike
  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to like videos",
      });
      return;
    }
    
    toggleLike(video.id);
  };
  
  const handleDislike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to dislike videos",
      });
      return;
    }
    
    toggleDislike(video.id);
  };
  
  // Handle watch later
  const handleWatchLater = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to save videos",
      });
      return;
    }
    
    toggleWatchLater(video.id);
  };
  
  // Get related videos
  const getRelatedVideos = () => {
    return videos
      .filter(v => 
        v.id !== video.id && 
        (
          v.tags.some(tag => video.tags.includes(tag)) || 
          v.category === video.category ||
          v.difficulty === video.difficulty
        )
      )
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 4);
  };
  
  // Video time update handler
  const handleTimeUpdate = (currentTime: number, duration: number) => {
    setCurrentTime(currentTime);
    setVideoDuration(duration);
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Get initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <VideoPlayer
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            onTimeUpdate={handleTimeUpdate}
            className="w-full aspect-video rounded-lg overflow-hidden"
          />
          
          {/* Video Info */}
          <div>
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-muted-foreground flex items-center gap-1">
                <Eye size={16} /> {formatViewCount(video.viewCount)} views
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar size={16} /> {formatDate(video.createdAt)}
              </span>
              <span className="text-muted-foreground">•</span>
              <DifficultyBadge difficulty={video.difficulty} />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handleLike} className="flex gap-1">
                <ThumbsUp size={16} /> {video.likeCount.toLocaleString()}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDislike} className="flex gap-1">
                <ThumbsDown size={16} /> {video.dislikeCount.toLocaleString()}
              </Button>
              <Button 
                variant={isInWatchLater ? "default" : "outline"} 
                size="sm" 
                onClick={handleWatchLater}
                className="flex gap-1"
              >
                <Clock size={16} /> {isInWatchLater ? "Saved" : "Watch Later"}
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Creator Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
              <AvatarFallback>{getInitials(video.creator.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{video.creator.name}</h3>
              <p className="text-sm text-muted-foreground">Creator</p>
            </div>
          </div>
          
          {/* Description */}
          <div className="bg-card border rounded-lg p-4">
            <p className="whitespace-pre-line">{video.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {video.tags.map(tag => (
                <Link to={`/search?tag=${encodeURIComponent(tag)}`} key={tag}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Comments ({comments.length})</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add an anonymous comment..."
                className="flex-1"
              />
              <Button type="submit" disabled={!isAuthenticated || comment.trim() === ""}>
                Comment
              </Button>
            </form>
            
            {/* Comments List */}
            <div className="space-y-4 mt-4">
              {comments.map((comment: CommentType) => (
                <div key={comment.id} className="bg-card border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Anonymous</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-2">{comment.text}</p>
                </div>
              ))}
              
              {comments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Related Videos */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Related Videos</h3>
          <div className="grid grid-cols-1 gap-4">
            <VideoGrid videos={getRelatedVideos()} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPage;
