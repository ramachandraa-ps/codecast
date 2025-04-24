
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "@/types";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MetricsOverviewProps {
  videos: Video[];
}

interface ChartData {
  name: string;
  views: number;
  likes: number;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ videos }) => {
  // Generate last 7 days dates
  const getDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  // Generate random metrics for demo
  const generateChartData = (): ChartData[] => {
    const dates = getDates();
    
    return dates.map((date, index) => {
      // Create a base number that generally increases
      const baseViews = 100 + (index * 50) + Math.floor(Math.random() * 200);
      const baseLikes = Math.floor(baseViews * (0.1 + Math.random() * 0.3));
      
      return {
        name: date.toLocaleDateString(undefined, { weekday: 'short' }),
        views: baseViews,
        likes: baseLikes,
      };
    });
  };

  const chartData = generateChartData();

  const getTotalViews = () => videos.reduce((sum, video) => sum + video.viewCount, 0);
  
  const getTotalLikes = () => videos.reduce((sum, video) => sum + video.likeCount, 0);
  
  const getTotalComments = () => {
    // Simulate ~3% of views resulting in comments
    return Math.floor(getTotalViews() * 0.03);
  };
  
  const getAvgWatchDuration = () => {
    // Simulate avg watch duration between 50-85%
    return Math.floor(Math.random() * 35) + 50;
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalViews().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 15) + 5}% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalLikes().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20) + 10}% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalComments().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 12) + 3}% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Watch Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAvgWatchDuration()}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.random() > 0.5 ? "+" : "-"}
              {Math.floor(Math.random() * 5) + 1}% from last week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#0EA5E9"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#8B5CF6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
