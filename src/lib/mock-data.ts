
import { Comment, Difficulty, User, Video } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@codecast.dev",
    role: "creator",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
  },
  {
    id: "user-2",
    name: "Jamie Smith",
    email: "jamie@codecast.dev",
    role: "creator",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Jamie",
  },
  {
    id: "user-3",
    name: "Taylor Wright",
    email: "taylor@codecast.dev",
    role: "viewer",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Taylor",
  },
  {
    id: "user-4",
    name: "Admin User",
    email: "admin@codecast.dev",
    role: "admin",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Admin",
  },
];

const tagOptions = [
  "React", 
  "TypeScript",
  "JavaScript", 
  "Next.js", 
  "Node.js", 
  "Python", 
  "DevOps", 
  "AWS", 
  "Docker",
  "Database", 
  "GraphQL",
  "System Design",
  "Testing",
  "CSS",
  "HTML",
  "Vue.js",
  "Angular",
  "Svelte",
  "Go",
  "Rust"
];

const categoryOptions = [
  "Web Development",
  "Backend Development",
  "Frontend Development",
  "Mobile Development",
  "Data Science",
  "DevOps",
  "Cloud",
  "Security",
  "Architecture",
  "Career",
];

const difficultyLevels: Difficulty[] = ["beginner", "intermediate", "advanced"];

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

function getRandomTags(): string[] {
  const shuffled = [...tagOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 1);
}

function getRandomCategory(): string {
  return categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
}

function getRandomDifficulty(): Difficulty {
  return difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
}

export const mockVideos: Video[] = Array.from({ length: 24 }, (_, i) => {
  const id = `video-${i + 1}`;
  const creatorIndex = Math.floor(Math.random() * 2); // Only use the first 2 users (creators)
  const creator = mockUsers[creatorIndex];
  const createdAt = generateRandomDate(new Date(2023, 0, 1), new Date());
  const viewCount = Math.floor(Math.random() * 10000);
  
  return {
    id,
    title: [
      "Building a React Component Library from Scratch",
      "Advanced TypeScript Patterns for Better Code",
      "System Design: Scaling Microservices",
      "Next.js 13 App Router: Complete Guide",
      "How to Build a Real-time Dashboard with WebSockets",
      "AWS Lambda Functions Explained",
      "Testing React Components with Testing Library",
      "Deep Dive into CSS Grid and Flexbox",
      "Docker Containers for JavaScript Developers",
      "GraphQL vs REST: Practical Comparison"
    ][i % 10] + (i >= 10 ? ` - Part ${Math.floor(i / 10) + 1}` : ""),
    description: "This video explores advanced concepts and practical examples. Perfect for developers looking to level up their skills in this area.",
    thumbnailUrl: `https://picsum.photos/seed/${id}/640/360`,
    videoUrl: "https://example.com/videos/sample.mp4", // Placeholder URL
    createdAt,
    updatedAt: createdAt,
    duration: Math.floor(Math.random() * 1800) + 300, // 5-35 minutes
    viewCount,
    likeCount: Math.floor(viewCount * (Math.random() * 0.3)),
    dislikeCount: Math.floor(viewCount * (Math.random() * 0.05)),
    creatorId: creator.id,
    creator: {
      id: creator.id,
      name: creator.name,
      avatar: creator.avatar,
    },
    tags: getRandomTags(),
    category: getRandomCategory(),
    difficulty: getRandomDifficulty(),
  };
});

export const mockComments: Comment[] = mockVideos.flatMap((video) => {
  return Array.from({ length: Math.floor(Math.random() * 15) + 5 }, (_, i) => {
    const randomUserId = mockUsers[Math.floor(Math.random() * mockUsers.length)].id;
    const commentDate = generateRandomDate(new Date(video.createdAt), new Date());
    
    return {
      id: `comment-${video.id}-${i + 1}`,
      videoId: video.id,
      text: [
        "Great explanation, really helped me understand this concept!",
        "Could you clarify the part about dependency injection?",
        "I've been using this pattern for years, works perfectly.",
        "Have you considered covering more advanced use cases?",
        "This saved me hours of debugging, thanks!",
        "Would love to see a follow-up video on this topic.",
        "Interesting approach, but I wonder about performance implications.",
        "This is exactly what I needed to learn today.",
        "The code examples are super helpful!",
        "I'm implementing this in my project right now.",
      ][Math.floor(Math.random() * 10)],
      createdAt: commentDate,
      userId: randomUserId, // stored but never displayed
    };
  });
});
