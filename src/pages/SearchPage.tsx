
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import VideoGrid from "@/components/common/VideoGrid";
import { useData } from "@/contexts/DataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Difficulty, Video } from "@/types";
import TagFilter from "@/components/common/TagFilter";
import VideoFilters from "@/components/common/VideoFilters";

const SearchPage = () => {
  const location = useLocation();
  const { videos, filterVideos } = useData();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  
  // Extract unique tags and categories from videos
  const allTags = Array.from(new Set(videos.flatMap(video => video.tags)));
  const allCategories = Array.from(new Set(videos.map(video => video.category)));

  // Parse query params when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    const tag = params.get("tag");
    const cat = params.get("category");
    const diff = params.get("difficulty") as Difficulty | null;
    
    if (q) setSearchQuery(q);
    if (tag) setSelectedTags([tag]);
    if (cat) setCategory(cat);
    if (diff) setDifficulty(diff);
  }, [location]);

  // Filter videos whenever search criteria changes
  useEffect(() => {
    const filtered = filterVideos({
      query: searchQuery,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      category,
      difficulty,
    });
    
    setFilteredVideos(filtered);
  }, [searchQuery, selectedTags, category, difficulty, filterVideos]);

  // Handle tag selection
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };

  return (
    <MainLayout className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="text-muted-foreground">
          Find videos that match your interests
        </p>
      </div>

      <div className="space-y-6">
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Filters</h3>
              <VideoFilters
                difficulty={difficulty}
                category={category}
                categories={allCategories}
                onDifficultyChange={setDifficulty}
                onCategoryChange={setCategory}
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 20).map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        handleTagsChange(selectedTags.filter(t => t !== tag));
                      } else {
                        handleTagsChange([...selectedTags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            <h2 className="text-xl font-medium mb-4">
              {searchQuery ? `Results for "${searchQuery}"` : "All Videos"}
              {(selectedTags.length > 0 || difficulty || category) && " (Filtered)"}
            </h2>
            
            <VideoGrid videos={filteredVideos} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
