
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VideoGrid from "@/components/common/VideoGrid";
import TagFilter from "@/components/common/TagFilter";
import VideoFilters from "@/components/common/VideoFilters";
import { useData } from "@/contexts/DataContext";
import { Difficulty } from "@/types";

const HomePage = () => {
  const { videos, filterVideos } = useData();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  
  // Extract unique tags and categories from videos
  const allTags = Array.from(new Set(videos.flatMap(video => video.tags)));
  const allCategories = Array.from(new Set(videos.map(video => video.category)));
  
  // Get recently uploaded videos (sorted by createdAt)
  const recentVideos = [...videos]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
  
  // Filter videos based on selected filters
  const filteredVideos = filterVideos({
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    difficulty,
    category,
  });
  
  // Get trending videos (high view count, recent)
  const getTrendingVideos = () => {
    return [...videos]
      .sort((a, b) => {
        // Consider both view count and recency
        const viewScore = b.viewCount - a.viewCount;
        const recencyScore = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return viewScore * 0.7 + recencyScore * 0.3;
      })
      .slice(0, 8);
  };
  
  // Handle tag selection
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <MainLayout className="container py-6">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Discover</h2>
          <div className="flex items-center gap-2">
            <VideoFilters
              difficulty={difficulty}
              category={category}
              categories={allCategories}
              onDifficultyChange={setDifficulty}
              onCategoryChange={setCategory}
            />
          </div>
        </div>
        
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onChange={handleTagsChange}
          className="mb-6"
        />
        
        {selectedTags.length > 0 || difficulty || category ? (
          <>
            <h3 className="text-xl font-medium mb-4">Filtered Results</h3>
            <VideoGrid videos={filteredVideos} />
          </>
        ) : (
          <>
            <h3 className="text-xl font-medium mb-4">Trending Videos</h3>
            <VideoGrid videos={getTrendingVideos()} />
            
            <h3 className="text-xl font-medium mt-10 mb-4">Recently Uploaded</h3>
            <VideoGrid videos={recentVideos} />
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default HomePage;
