import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

import HomeScreen from "./pages/HomeScreen"; 
import TenantDashboard from "./pages/TenantDashboard";
import { User } from "./types/user";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = ["manager", "admin", "tenant"] }: { 
  children: React.ReactNode, 
  allowedRoles?: string[] 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Check if user has the required role
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "tenant") {
      return <Navigate to="/tenant" replace />;
    } else if (user.role === "manager" || user.role === "admin") {
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
};

// Public only route (redirects to dashboard if logged in)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }
  
  if (isAuthenticated) {
    // Redirect based on role
    if (user && user.role === "tenant") {
      return <Navigate to="/tenant" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/*main landing page - accessible to all */}
      <Route path="/home" element={<HomeScreen />} />
      
      {/* Public routes */}
      <Route path="/login" element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/signup" element={
        <PublicOnlyRoute>
          <SignUp />
        </PublicOnlyRoute>
      } />
      
      {/* Protected routes for managers/admins */}
      <Route path="/" element={
        <ProtectedRoute allowedRoles={["manager", "admin"]}>
          <Index />
        </ProtectedRoute>
      } />
      
      {/* Protected routes for tenants */}
      <Route path="/tenant" element={
        <ProtectedRoute allowedRoles={["tenant"]}>
          <TenantDashboard />
        </ProtectedRoute>
      } />
      
      {/* Routes for all authenticated users */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      {/* Redirect from root to home for not authenticated users */}
      <Route path="/" element={
        <PublicOnlyRoute>
          <Navigate to="/home" replace />
        </PublicOnlyRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="rentlink-theme">
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
