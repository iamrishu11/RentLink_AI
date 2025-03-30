
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';

const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
    company: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signupSchema>;

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, {
        name: data.name,
        company: data.company || '',
      });
      toast({
        title: 'Account created!',
        description: 'You have successfully signed up.',
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Sign up failed',
        description: 'There was an error creating your account.',
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
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Enter your details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
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
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormDescription>This will help us tailor your experience</FormDescription>
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
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
