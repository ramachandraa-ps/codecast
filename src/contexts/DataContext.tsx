
import { mockComments, mockVideos } from "@/lib/mock-data";
import { Comment, Difficulty, Video } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

type DataContextType = {
  videos: Video[];
  getVideoById: (id: string) => Video | undefined;
  getVideosByCreatorId: (creatorId: string) => Video[];
  getCommentsByVideoId: (videoId: string) => Comment[];
  addComment: (videoId: string, text: string) => void;
  addVideo: (videoData: Partial<Video>) => void;
  updateVideo: (id: string, videoData: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  toggleLike: (videoId: string) => void;
  toggleDislike: (videoId: string) => void;
  incrementView: (videoId: string) => void;
  filterVideos: (options: {
    query?: string;
    tags?: string[];
    category?: string;
    difficulty?: Difficulty;
  }) => Video[];
  getRecentlyWatched: () => Video[];
  addToRecentlyWatched: (videoId: string) => void;
  getWatchLater: () => Video[];
  toggleWatchLater: (videoId: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>(() => {
    const stored = localStorage.getItem("codecast-recently-watched");
    return stored ? JSON.parse(stored) : [];
  });
  const [watchLater, setWatchLater] = useState<string[]>(() => {
    const stored = localStorage.getItem("codecast-watch-later");
    return stored ? JSON.parse(stored) : [];
  });

  const getVideoById = (id: string) => videos.find(video => video.id === id);

  const getVideosByCreatorId = (creatorId: string) => 
    videos.filter(video => video.creatorId === creatorId);

  const getCommentsByVideoId = (videoId: string) => 
    comments.filter(comment => comment.videoId === videoId);

  const addComment = (videoId: string, text: string) => {
    if (!user) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      videoId,
      text,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    
    setComments(prev => [...prev, newComment]);
    toast({
      title: "Comment added",
      description: "Your comment has been posted anonymously.",
    });
  };

  const addVideo = (videoData: Partial<Video>) => {
    if (!user) return;
    
    const newVideo: Video = {
      id: `video-${Date.now()}`,
      title: videoData.title || "Untitled Video",
      description: videoData.description || "",
      thumbnailUrl: videoData.thumbnailUrl || `https://picsum.photos/seed/new-${Date.now()}/640/360`,
      videoUrl: videoData.videoUrl || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      duration: videoData.duration || 0,
      viewCount: 0,
      likeCount: 0,
      dislikeCount: 0,
      creatorId: user.id,
      creator: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      tags: videoData.tags || [],
      category: videoData.category || "Web Development",
      difficulty: videoData.difficulty || "intermediate",
    };
    
    setVideos(prev => [newVideo, ...prev]);
    toast({
      title: "Video uploaded",
      description: "Your video has been published successfully.",
    });
  };

  const updateVideo = (id: string, videoData: Partial<Video>) => {
    if (!user) return;
    
    setVideos(prev => 
      prev.map(video => 
        video.id === id && (video.creatorId === user.id || user.role === "admin")
          ? { ...video, ...videoData, updatedAt: new Date().toISOString() }
          : video
      )
    );
    
    toast({
      title: "Video updated",
      description: "Your changes have been saved.",
    });
  };

  const deleteVideo = (id: string) => {
    if (!user) return;
    
    setVideos(prev => 
      prev.filter(video => 
        !(video.id === id && (video.creatorId === user.id || user.role === "admin"))
      )
    );
    
    // Also delete related comments
    setComments(prev => 
      prev.filter(comment => comment.videoId !== id)
    );
    
    toast({
      title: "Video deleted",
      description: "The video has been removed.",
    });
  };

  const toggleLike = (videoId: string) => {
    if (!user) return;
    
    setVideos(prev => 
      prev.map(video => 
        video.id === videoId
          ? { ...video, likeCount: video.likeCount + 1 }
          : video
      )
    );
  };

  const toggleDislike = (videoId: string) => {
    if (!user) return;
    
    setVideos(prev => 
      prev.map(video => 
        video.id === videoId
          ? { ...video, dislikeCount: video.dislikeCount + 1 }
          : video
      )
    );
  };

  const incrementView = (videoId: string) => {
    setVideos(prev => 
      prev.map(video => 
        video.id === videoId
          ? { ...video, viewCount: video.viewCount + 1 }
          : video
      )
    );
  };

  const filterVideos = (options: {
    query?: string;
    tags?: string[];
    category?: string;
    difficulty?: Difficulty;
  }) => {
    let filtered = [...videos];
    
    if (options.query) {
      const query = options.query.toLowerCase();
      filtered = filtered.filter(
        video => 
          video.title.toLowerCase().includes(query) || 
          video.description.toLowerCase().includes(query)
      );
    }
    
    if (options.tags && options.tags.length > 0) {
      filtered = filtered.filter(
        video => options.tags?.some(tag => video.tags.includes(tag))
      );
    }
    
    if (options.category) {
      filtered = filtered.filter(video => video.category === options.category);
    }
    
    if (options.difficulty) {
      filtered = filtered.filter(video => video.difficulty === options.difficulty);
    }
    
    return filtered;
  };

  const getRecentlyWatched = () => {
    return recentlyWatched
      .map(id => getVideoById(id))
      .filter(Boolean) as Video[];
  };

  const addToRecentlyWatched = (videoId: string) => {
    const updated = [
      videoId,
      ...recentlyWatched.filter(id => id !== videoId),
    ].slice(0, 10);
    
    setRecentlyWatched(updated);
    localStorage.setItem("codecast-recently-watched", JSON.stringify(updated));
  };

  const getWatchLater = () => {
    return watchLater
      .map(id => getVideoById(id))
      .filter(Boolean) as Video[];
  };

  const toggleWatchLater = (videoId: string) => {
    if (!user) return;
    
    const isInWatchLater = watchLater.includes(videoId);
    let updated: string[];
    
    if (isInWatchLater) {
      updated = watchLater.filter(id => id !== videoId);
      toast({
        title: "Removed from Watch Later",
        description: "Video has been removed from your Watch Later list.",
      });
    } else {
      updated = [...watchLater, videoId];
      toast({
        title: "Added to Watch Later",
        description: "Video has been added to your Watch Later list.",
      });
    }
    
    setWatchLater(updated);
    localStorage.setItem("codecast-watch-later", JSON.stringify(updated));
  };

  return (
    <DataContext.Provider value={{
      videos,
      getVideoById,
      getVideosByCreatorId,
      getCommentsByVideoId,
      addComment,
      addVideo,
      updateVideo,
      deleteVideo,
      toggleLike,
      toggleDislike,
      incrementView,
      filterVideos,
      getRecentlyWatched,
      addToRecentlyWatched,
      getWatchLater,
      toggleWatchLater,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
