
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import VideoMetricsCard from "@/components/dashboard/VideoMetricsCard";
import { PlusCircle, VideoIcon } from "lucide-react";
import { Video } from "@/types";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getVideosByCreatorId, videos } = useData();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if user is not authenticated or is not a creator/admin
  if (!user || (user.role !== "creator" && user.role !== "admin")) {
    navigate("/");
    return null;
  }

  const userVideos = getVideosByCreatorId(user.id);
  const hasVideos = userVideos.length > 0;

  return (
    <MainLayout className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your video performance and analytics
          </p>
        </div>
        <Button onClick={() => navigate("/upload")} className="gap-2">
          <PlusCircle size={18} />
          Upload New Video
        </Button>
      </div>

      {hasVideos ? (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="videos">Your Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <MetricsOverview videos={userVideos} />
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Recent Performance</h2>
            <div className="grid gap-6">
              {userVideos.slice(0, 3).map((video) => (
                <VideoMetricsCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid gap-6">
              {userVideos.map((video) => (
                <VideoMetricsCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>
                  Understand your audience demographics and engagement patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                {/* Placeholder for detailed analytics */}
                <p className="text-muted-foreground">
                  Detailed analytics will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>
                  All comments are shown anonymously to protect viewer privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                {/* Placeholder for comments management */}
                <p className="text-muted-foreground">
                  Comment management features will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your dashboard!</CardTitle>
            <CardDescription>You haven't uploaded any videos yet</CardDescription>
          </CardHeader>
          <CardContent className="py-6 flex flex-col items-center text-center">
            <div className="mb-4 p-6 bg-muted rounded-full">
              <VideoIcon size={48} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              Share your knowledge with the developer community by uploading your first video
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/upload")} className="gap-2">
              <PlusCircle size={16} />
              Upload Your First Video
            </Button>
          </CardFooter>
        </Card>
      )}
    </MainLayout>
  );
};

export default DashboardPage;
