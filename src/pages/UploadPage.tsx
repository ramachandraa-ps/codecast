
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadForm from "@/components/creator/UploadForm";

const UploadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not authenticated or is not a creator/admin
  if (!user || (user.role !== "creator" && user.role !== "admin")) {
    navigate("/");
    return null;
  }

  return (
    <MainLayout className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Upload New Video</h1>
        <p className="text-muted-foreground">
          Share your knowledge with the developer community
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <UploadForm />
      </div>
    </MainLayout>
  );
};

export default UploadPage;
