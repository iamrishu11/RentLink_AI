
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import TenantManagement from '@/components/TenantManagement';
import VirtualAccounts from '@/components/VirtualAccounts';
import PaymentMatching from '@/components/PaymentMatching';
import Reminders from '@/components/Reminders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, CreditCard, ArrowLeftRight, BellRing } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTab = localStorage.getItem("activeTab");
      if (storedTab) setActiveTab(storedTab);
    }
  }, []);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };
  
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  // Show welcome toast on initial load
  useEffect(() => {
    setMounted(true);
    
    // Only show welcome toast once per session
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    if (!hasShownWelcome && user) {
      setTimeout(() => {
        toast({
          title: "Welcome back!",
          description: `Hello ${user.name}, your dashboard is ready.`,
        });
        sessionStorage.setItem('hasShownWelcome', 'true');
      }, 1000);
    }
  }, [user]);

  // If not mounted yet, show nothing to prevent hydration issues
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      
      <main className="flex-1 container mx-auto py-4 md:py-6 px-2 md:px-4 animate-fade-in">
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={handleTabChange}  
          className="space-y-4 md:space-y-8"
        >
          <div className="flex justify-center animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="dashboard" className="flex items-center justify-center md:justify-start group py-2">
                <LayoutDashboard className="h-4 w-4 md:mr-2 group-data-[state=active]:text-primary" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="tenants" className="flex items-center justify-center md:justify-start group py-2">
                <Users className="h-4 w-4 md:mr-2 group-data-[state=active]:text-primary" />
                <span className="hidden md:inline">Tenants</span>
              </TabsTrigger>
              <TabsTrigger value="accounts" className="flex items-center justify-center md:justify-start group py-2">
                <CreditCard className="h-4 w-4 md:mr-2 group-data-[state=active]:text-primary" />
                <span className="hidden md:inline">Accounts</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center justify-center md:justify-start group py-2">
                <ArrowLeftRight className="h-4 w-4 md:mr-2 group-data-[state=active]:text-primary" />
                <span className="hidden md:inline">Payments</span>
              </TabsTrigger>
              <TabsTrigger value="reminders" className="flex items-center justify-center md:justify-start group py-2">
                <BellRing className="h-4 w-4 md:mr-2 group-data-[state=active]:text-primary" />
                <span className="hidden md:inline">Reminders</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="tenants" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <TenantManagement />
          </TabsContent>
          
          <TabsContent value="accounts" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <VirtualAccounts />
          </TabsContent>
          
          <TabsContent value="payments" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <PaymentMatching />
          </TabsContent>
          
          <TabsContent value="reminders" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Reminders />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t py-3 md:py-4 text-center text-xs md:text-sm text-muted-foreground">
        <div className="container mx-auto px-2 md:px-4">
          RentLink AI © {new Date().getFullYear()} - Simplified rent payment reconciliation
        </div>
      </footer>
    </div>
  );
};

export default Index;
