
export type Role = "viewer" | "creator" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
};

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  duration: number; // in seconds
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  creatorId: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  category: string;
  difficulty: Difficulty;
};

export type Comment = {
  id: string;
  videoId: string;
  text: string;
  createdAt: string;
  userId: string; // stored but never displayed (anonymous)
};

export type VideoMetrics = {
  videoId: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  avgWatchDuration: number; // percentage of video watched on average
};
