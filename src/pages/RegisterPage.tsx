
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Video } from "lucide-react";

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Video className="text-primary-foreground" size={28} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">CodeCast</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the developer-centric video community
          </p>
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <AuthForm mode="register" />
          
          <div className="mt-6">
            <Separator className="my-4" />
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:text-primary/90">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>&copy; 2025 CodeCast. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
