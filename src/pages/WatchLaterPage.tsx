
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import VideoGrid from "@/components/common/VideoGrid";
import { useNavigate } from "react-router-dom";

const WatchLaterPage = () => {
  const { isAuthenticated } = useAuth();
  const { getWatchLater } = useData();
  const navigate = useNavigate();

  // Redirect if user is not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const watchLaterVideos = getWatchLater();
  const hasVideos = watchLaterVideos.length > 0;

  return (
    <MainLayout className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Watch Later</h1>
        <p className="text-muted-foreground">
          Videos you've saved to watch later
        </p>
      </div>

      {hasVideos ? (
        <VideoGrid videos={watchLaterVideos} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No saved videos yet</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Videos you save will appear here
          </p>
          <button 
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Browse videos to save
          </button>
        </div>
      )}
    </MainLayout>
  );
};

export default WatchLaterPage;
