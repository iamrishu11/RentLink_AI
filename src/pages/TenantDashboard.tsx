
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import {
  DollarSign,
  Home,
  Clock,
  FileText,
  ArrowUpRight,
  Check,
  AlertTriangle,
  Calendar,
  CreditCard,
  BellRing
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TenantDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const property = {
    name: "Sunset Apartments",
    unit: "#302",
    address: "123 Main St, Anytown, CA 12345",
    rentAmount: "$1,200.00",
    dueDate: "5th of each month",
    manager: "Property Management Inc.",
    leaseStart: "Jan 1, 2023",
    leaseEnd: "Dec 31, 2023"
  };

  const payments = [
    { id: 1, date: "Nov 1, 2023", amount: "$1,200.00", status: "Paid", reference: "PMT-2023-11" },
    { id: 2, date: "Oct 1, 2023", amount: "$1,200.00", status: "Paid", reference: "PMT-2023-10" },
    { id: 3, date: "Sep 1, 2023", amount: "$1,200.00", status: "Paid", reference: "PMT-2023-09" },
    { id: 4, date: "Aug 1, 2023", amount: "$1,200.00", status: "Paid", reference: "PMT-2023-08" },
  ];

  const maintenance = [
    { id: 1, date: "Oct 15, 2023", issue: "Leaking faucet", status: "Completed", priority: "Low" },
    { id: 2, date: "Sep 8, 2023", issue: "AC not cooling", status: "Completed", priority: "High" },
    { id: 3, date: "Aug 22, 2023", issue: "Garbage disposal jammed", status: "Completed", priority: "Medium" },
  ];

  const handleMakePayment = () => {
    toast({
      title: "Payment Initiated",
      description: "You'll be redirected to the payment processor.",
    });
  };

  const handleMaintenanceRequest = () => {
    toast({
      title: "Maintenance Request Created",
      description: "Your property manager has been notified.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      
      <main className="flex-1 container mx-auto py-4 md:py-6 px-2 md:px-4 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Your tenant portal dashboard</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleMaintenanceRequest}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Request Maintenance
            </Button>
            <Button onClick={handleMakePayment}>
              <DollarSign className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4 md:space-y-8"
        >
          <div className="flex justify-center animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            <TabsList className="grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="overview">
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Payment History</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance">
                <Clock className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Maintenance</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Next Payment Due</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{property.rentAmount}</div>
                      <div className="text-sm text-muted-foreground">December 5, 2023</div>
                    </div>
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-600 dark:text-green-400 text-lg font-bold flex items-center">
                        <Check className="h-5 w-5 mr-1" />
                        Current
                      </div>
                      <div className="text-sm text-muted-foreground">Last paid: November 1, 2023</div>
                    </div>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Lease Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-medium">{property.leaseEnd}</div>
                      <div className="text-sm text-muted-foreground">Lease end date</div>
                    </div>
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Details about your rental property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Property Name</h4>
                      <p className="font-medium">{property.name} {property.unit}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                      <p className="font-medium">{property.address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Monthly Rent</h4>
                      <p className="font-medium">{property.rentAmount}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                      <p className="font-medium">{property.dueDate}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Property Manager</h4>
                      <p className="font-medium">{property.manager}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Lease Start</h4>
                      <p className="font-medium">{property.leaseStart}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Lease End</h4>
                      <p className="font-medium">{property.leaseEnd}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Payment Reference</h4>
                      <div className="flex items-center">
                        <p className="font-medium mr-2">TEN-JAMES-1001</p>
                        <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => {
                          navigator.clipboard.writeText("TEN-JAMES-1001");
                          toast({ title: "Reference copied to clipboard" });
                        }}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Next 3 months of scheduled payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "December 2023", amount: "$1,200.00", status: "Upcoming" },
                      { month: "January 2024", amount: "$1,200.00", status: "Upcoming" },
                      { month: "February 2024", amount: "$1,200.00", status: "Upcoming" },
                    ].map((payment, i) => (
                      <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                        <div>
                          <div className="font-medium">{payment.month}</div>
                          <div className="text-muted-foreground text-sm">Due on the 5th</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{payment.amount}</div>
                          <Badge variant="outline" className="mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Updates from your property manager</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: "Nov 10", title: "Maintenance Complete", description: "The maintenance request for your leaking faucet has been completed." },
                      { date: "Nov 5", title: "Payment Received", description: "Thank you for your rent payment for November." },
                      { date: "Oct 28", title: "Building Update", description: "The lobby will be closed for renovations on Nov 15-16." },
                    ].map((notification, i) => (
                      <div key={i} className="flex items-start border-b last:border-0 pb-3 last:pb-0">
                        <div className="rounded-full p-2 bg-primary/10 text-primary mr-3 mt-1">
                          <BellRing className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="font-medium">{notification.title}</div>
                            <div className="text-muted-foreground text-xs ml-2">{notification.date}</div>
                          </div>
                          <div className="text-muted-foreground text-sm mt-1">
                            {notification.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Record of your previous rent payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-left font-medium">Date</th>
                        <th className="pb-3 text-left font-medium">Amount</th>
                        <th className="pb-3 text-left font-medium">Reference</th>
                        <th className="pb-3 text-left font-medium">Status</th>
                        <th className="pb-3 text-left font-medium">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3">{payment.date}</td>
                          <td className="py-3">{payment.amount}</td>
                          <td className="py-3">{payment.reference}</td>
                          <td className="py-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200">
                              <Check className="h-3 w-3 mr-1" />
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
                  <p className="text-muted-foreground mb-4">Include the following payment reference with all payments: <span className="font-medium">TEN-JAMES-1001</span></p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Bank Transfer</h4>
                      <p className="text-sm text-muted-foreground">Property Management Inc.<br />Account: 1234567890<br />Routing: 987654321</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Online Payment</h4>
                      <p className="text-sm text-muted-foreground mb-2">Pay securely through our tenant portal</p>
                      <Button size="sm" onClick={handleMakePayment}>
                        <DollarSign className="h-4 w-4 mr-1" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance" className="animate-fade-in">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>Request and track property maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button onClick={handleMaintenanceRequest}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Submit New Request
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-left font-medium">Date</th>
                        <th className="pb-3 text-left font-medium">Issue</th>
                        <th className="pb-3 text-left font-medium">Priority</th>
                        <th className="pb-3 text-left font-medium">Status</th>
                        <th className="pb-3 text-left font-medium">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenance.map((request) => (
                        <tr key={request.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3">{request.date}</td>
                          <td className="py-3">{request.issue}</td>
                          <td className="py-3">
                            <Badge variant="outline" className={
                              request.priority === "High" 
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : request.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }>
                              {request.priority}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <Check className="h-3 w-3 mr-1" />
                              {request.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Maintenance Information</h3>
                  <p className="text-muted-foreground mb-2">For emergencies (water leaks, no heat, etc.), please call:</p>
                  <p className="font-medium text-lg mb-4">(555) 123-4567</p>
                  
                  <h4 className="font-medium mb-2">Regular maintenance hours:</h4>
                  <p className="text-muted-foreground">Monday - Friday: 9am - 5pm<br />Saturday: 10am - 2pm<br />Sunday: Closed (Emergency only)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t py-3 md:py-4 text-center text-xs md:text-sm text-muted-foreground">
        <div className="container mx-auto px-2 md:px-4">
          RentLink AI © {new Date().getFullYear()} - Tenant Portal
        </div>
      </footer>
    </div>
  );
};

export default TenantDashboard;
