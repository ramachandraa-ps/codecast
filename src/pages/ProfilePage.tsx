
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoGrid from "@/components/common/VideoGrid";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getVideosByCreatorId, getRecentlyWatched } = useData();
  const navigate = useNavigate();

  // Redirect if user is not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const userVideos = user?.role === "creator" ? getVideosByCreatorId(user.id) : [];
  const recentlyWatched = getRecentlyWatched();

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout className="container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user?.name}</CardTitle>
              <CardDescription className="capitalize">{user?.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <div className="font-medium text-muted-foreground">Email</div>
                <div>{user?.email}</div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => logout()}>
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-3/4">
          <Tabs defaultValue="history">
            <TabsList className="mb-6">
              <TabsTrigger value="history">Watch History</TabsTrigger>
              {user?.role === "creator" && (
                <TabsTrigger value="your-videos">Your Videos</TabsTrigger>
              )}
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <h2 className="text-xl font-medium mb-4">Recently Watched</h2>
              {recentlyWatched.length > 0 ? (
                <VideoGrid videos={recentlyWatched} />
              ) : (
                <p className="text-muted-foreground">You haven't watched any videos yet.</p>
              )}
            </TabsContent>
            
            {user?.role === "creator" && (
              <TabsContent value="your-videos">
                <h2 className="text-xl font-medium mb-4">Your Videos</h2>
                {userVideos.length > 0 ? (
                  <VideoGrid videos={userVideos} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't uploaded any videos yet.</p>
                    <Button onClick={() => navigate("/upload")}>Upload Your First Video</Button>
                  </div>
                )}
              </TabsContent>
            )}
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Account settings will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
