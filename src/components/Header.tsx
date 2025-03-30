
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellRing, Settings, LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New payment received",
      message: "You've received a new payment of $1,200 from John Smith",
      time: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Tenant alert",
      message: "Sarah Johnson's payment is 3 days overdue",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      title: "System update",
      message: "RentLink AI has updated payment matching algorithms",
      time: "Yesterday",
      read: true
    }
  ]);
  
  const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    });
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <header className="border-b border-border bg-card py-3 px-4 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
            <span className="text-brand-blue group-hover:scale-105 transition-transform inline-block">Rent</span>
            <span className="font-semibold group-hover:scale-105 transition-transform inline-block">Link</span>
            <span className="ai-gradient font-bold ml-1 group-hover:scale-105 transition-transform inline-block">AI</span>
          </h1>
        </Link>
        
        <div className="flex items-center space-x-3">
          <ThemeSwitcher />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 relative">
                <BellRing className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 max-h-[400px] overflow-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleMarkAllRead}
                  disabled={unreadCount === 0}
                >
                  Mark all read
                </Button>
              </div>
              <div className="divide-y max-h-[300px] overflow-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${!notification.read ? 'bg-accent/20' : ''}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-brand-blue' : 'bg-transparent'}`} />
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile" className="w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  signOut();
                  toast({
                    title: "Signed out",
                    description: "You have been signed out of your account",
                  });
                }} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
