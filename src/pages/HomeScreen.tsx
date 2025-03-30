
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ArrowRight, Building, CreditCard, Shield, ChevronRight, Check, Bell, DollarSign, LucideArrowRight } from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
        {/* Header */}
        <header className="border-b py-4 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold ai-gradient">RentLink AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a href="#features" className="text-muted-foreground hover:text-foreground animated-underline">Features</a>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground animated-underline">How It Works</a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground animated-underline">Pricing</a>
              </nav>
              <ThemeSwitcher />
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  The Smarter Way to <span className="ai-gradient">Collect Rent</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  AI-powered rent collection and payment reconciliation for property managers. Say goodbye to manual payment tracking forever.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" onClick={() => navigate('/signup')} className="shadow-lg hover:shadow-xl gradient-button">
                    <span>Start Free Trial</span>
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                    <span className="mr-2">See Demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-card rounded-xl overflow-hidden border shadow-xl">
                    <div className="p-2 bg-muted/80 flex items-center space-x-2">
                      <div className="rounded-full w-3 h-3 bg-red-500"></div>
                      <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                      <div className="rounded-full w-3 h-3 bg-green-500"></div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Payment Dashboard</h3>
                          </div>
                          <div className="text-sm text-muted-foreground">Today</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-muted/50 animate-pulse-slow">
                            <div className="text-sm text-muted-foreground">Collected</div>
                            <div className="text-xl font-bold">$12,450</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50 animate-pulse-slow" style={{ animationDelay: '0.2s' }}>
                            <div className="text-sm text-muted-foreground">Pending</div>
                            <div className="text-xl font-bold">$1,850</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50 animate-pulse-slow" style={{ animationDelay: '0.4s' }}>
                            <div className="text-sm text-muted-foreground">Overdue</div>
                            <div className="text-xl font-bold">$950</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="font-medium">James Wilson</div>
                                <div className="text-xs text-muted-foreground">Payment received</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">$1,200.00</div>
                              <div className="text-xs text-muted-foreground">Just now</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="font-medium">Sarah Johnson</div>
                                <div className="text-xs text-muted-foreground">Payment received</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">$950.00</div>
                              <div className="text-xs text-muted-foreground">2 hours ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful AI-Driven Features</h2>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                Everything you need to streamline rent collection and payment reconciliation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <ArrowRight className="h-8 w-8 text-primary" />,
                  title: "AI Payment Matching",
                  description: "Automatically match incoming payments to tenants with 99.9% accuracy using our advanced AI"
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-primary" />,
                  title: "Virtual Accounts",
                  description: "Generate unique payment references for each tenant to simplify tracking and reconciliation"
                },
                {
                  icon: <Building className="h-8 w-8 text-primary" />,
                  title: "Property Management",
                  description: "Organize properties, units, and tenants in one place with our intuitive dashboard"
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Secure Payments",
                  description: "Process payments securely with bank-grade encryption and compliance standards"
                },
                {
                  icon: <Bell className="h-8 w-8 text-primary" />,
                  title: "Automated Reminders",
                  description: "Send payment reminders automatically to reduce late payments and improve cash flow"
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-primary" />,
                  title: "Financial Insights",
                  description: "Gain valuable insights into payment patterns and forecast future cash flows"
                }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow card-hover animate-scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How RentLink AI Works</h2>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                Our AI-powered platform makes rent collection and reconciliation simple
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Connect Your Bank Account",
                  description: "Securely link your bank account to monitor incoming rent payments automatically"
                },
                {
                  step: "2",
                  title: "Add Your Properties and Tenants",
                  description: "Set up your rental properties and add tenant information in minutes"
                },
                {
                  step: "3",
                  title: "Generate Virtual Accounts",
                  description: "Create unique payment references for each tenant for easy tracking"
                },
                {
                  step: "4",
                  title: "Let AI Handle The Rest",
                  description: "Our AI system automatically matches payments and keeps your books up to date"
                }
              ].map((step, i) => (
                <div 
                  key={i} 
                  className="flex mb-8 last:mb-0 animate-slide-in-right"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="mr-6 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    {i !== 3 && <div className="w-0.5 h-16 bg-border ml-6 -mb-4"></div>}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                Choose the plan that best fits your property portfolio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$29",
                  description: "Perfect for small landlords",
                  features: [
                    "Up to 10 units",
                    "AI payment matching",
                    "Email reminders",
                    "Basic reporting",
                    "Email support"
                  ],
                  featured: false
                },
                {
                  name: "Professional",
                  price: "$79",
                  description: "For growing property portfolios",
                  features: [
                    "Up to 50 units",
                    "Advanced AI matching",
                    "Email & SMS reminders",
                    "Advanced analytics",
                    "Priority support",
                    "Multiple user accounts"
                  ],
                  featured: true
                },
                {
                  name: "Enterprise",
                  price: "$199",
                  description: "For property management companies",
                  features: [
                    "Unlimited units",
                    "Custom AI rules",
                    "API access",
                    "Custom reporting",
                    "Dedicated account manager",
                    "White labeling"
                  ],
                  featured: false
                }
              ].map((plan, i) => (
                <div 
                  key={i} 
                  className={`bg-card rounded-xl border overflow-hidden transition-all animate-scale-in ${
                    plan.featured ? 'border-primary shadow-lg ring-1 ring-primary scale-105 md:scale-110' : 'shadow-sm'
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {plan.featured && (
                    <div className="bg-primary py-1 text-center text-primary-foreground text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/month</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant={plan.featured ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => navigate('/signup')}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">RentLink AI</span>
                </div>
                <p className="text-muted-foreground">
                  AI-powered rent collection and payment reconciliation for property managers
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-muted-foreground">support@rentlinkai.com</li>
                  <li className="text-muted-foreground">+1 (555) 123-4567</li>
                </ul>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988c4.781-.75 8.437-4.887 8.437-9.878z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} RentLink AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default HomeScreen;
