
import { Link } from "react-router-dom";
import { Video } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-codecast-purple p-1.5 rounded">
                <Video size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl">CodeCast</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              A developer-centric video sharing platform where tech enthusiasts can upload,
              share, and learn from code-focused content.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/discover" className="text-muted-foreground hover:text-foreground">
                  Discover
                </Link>
              </li>
              <li>
                <Link to="/search?category=Web+Development" className="text-muted-foreground hover:text-foreground">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/search?tag=System+Design" className="text-muted-foreground hover:text-foreground">
                  System Design
                </Link>
              </li>
              <li>
                <Link to="/search?difficulty=beginner" className="text-muted-foreground hover:text-foreground">
                  Beginner Tutorials
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>© {currentYear} CodeCast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
