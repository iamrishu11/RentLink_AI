
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Sign in failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - quick login
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('demo@rentlink.ai', 'demo1234');
      toast({
        title: 'Demo mode activated',
        description: 'You are now logged in as a demo user.',
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Demo login failed',
        description: 'Unable to log in with demo account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-brand-blue">Rent</span>
            <span className="font-semibold">Link</span>
            <span className="ai-gradient font-bold ml-1">AI</span>
          </h1>
          <p className="text-muted-foreground">Simplified rent payment reconciliation</p>
        </div>
        
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading}
                onClick={handleDemoLogin}
              >
                Try Demo Account
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
