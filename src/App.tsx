/**
 * CodeCast - Main Application Component
 * 
 * This is the root component of the CodeCast application, setting up the core providers
 * and routing structure. The application uses React Router for navigation, React Query
 * for data fetching, and custom providers for auth and data management.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";

// Page Components
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VideoPage from "./pages/VideoPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import NotFound from "./pages/NotFound";

// Initialize React Query client for data fetching and caching
const queryClient = new QueryClient();

/**
 * Main App Component
 * 
 * Provider Hierarchy:
 * 1. QueryClientProvider - Manages API data fetching and caching
 * 2. TooltipProvider - Provides tooltip functionality across the app
 * 3. AuthProvider - Manages authentication state and user sessions
 * 4. DataProvider - Manages global application state
 * 
 * Routing Structure:
 * - / -> Home page with video feed
 * - /login -> User authentication
 * - /register -> New user registration
 * - /video/:id -> Individual video viewing
 * - /dashboard -> Creator dashboard
 * - /upload -> Video upload interface
 * - /profile -> User profile management
 * - /search -> Video search interface
 * - /watch-later -> Saved videos list
 * - * -> 404 Not Found
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          {/* Toast notifications for user feedback */}
          <Toaster />
          <Sonner />
          
          {/* Application routing */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/watch-later" element={<WatchLaterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
