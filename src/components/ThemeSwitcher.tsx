
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast({
      title: `Theme changed to ${newTheme}`,
      description: `Your preference has been saved`,
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
          {theme === 'light' && <Sun className="h-5 w-5 text-muted-foreground animate-pulse-slow" />}
          {theme === 'dark' && <Moon className="h-5 w-5 text-muted-foreground animate-pulse-slow" />}
          {theme === 'system' && <Monitor className="h-5 w-5 text-muted-foreground" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')} className="cursor-pointer">
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="cursor-pointer">
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')} className="cursor-pointer">
          <Monitor className="h-4 w-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
