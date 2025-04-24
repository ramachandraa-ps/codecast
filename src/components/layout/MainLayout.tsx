
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
