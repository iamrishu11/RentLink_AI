
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  company: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const isMobile = useIsMobile();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsUpdating(true);
    try {
      await updateProfile({
        name: data.name,
        company: data.company,
      });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'There was an error updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-4 md:py-8 px-3 md:px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Profile Settings</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Profile Avatar Section */}
            <Card className="md:col-span-1 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-xl">Your Profile</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</p>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    signOut();
                    toast({
                      title: 'Signed out',
                      description: 'You have been signed out successfully.',
                    });
                    navigate('/login');
                  }}
                >
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          
            {/* Profile Form Section */}
            <Card className="md:col-span-2 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-xl">Account Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            You cannot change your email address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Preferences</h3>
                      
                      <FormField
                        control={form.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription className="text-xs">
                                Receive email notifications for payment updates and tenant activities
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="smsNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">SMS Notifications</FormLabel>
                              <FormDescription className="text-xs">
                                Receive text messages for urgent payment issues
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" disabled={isUpdating} className="w-full md:w-auto">
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-3 md:py-4 text-center text-xs md:text-sm text-muted-foreground">
        <div className="container mx-auto px-3 md:px-4">
          RentLink AI © {new Date().getFullYear()} - Simplified rent payment reconciliation
        </div>
      </footer>
    </div>
  );
};

export default Profile;
