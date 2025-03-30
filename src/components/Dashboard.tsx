
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "./ui/stats-card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Calendar, CreditCard, PieChart } from "lucide-react";

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <StatsCard
            title="Total Rent Collected"
            value="$24,350"
            description="This month"
            icon={<DollarSign className="h-4 w-4" />}
            trend="up"
            trendValue="+12.5%"
            className="hover-scale"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <StatsCard
            title="Pending Payments"
            value="$3,250"
            description="From 5 tenants"
            icon={<CreditCard className="h-4 w-4" />}
            trend="down"
            trendValue="-3.2%"
            className="hover-scale"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <StatsCard
            title="Total Tenants"
            value="28"
            description="3 new this month"
            icon={<Users className="h-4 w-4" />}
            trend="up"
            trendValue="+3"
            className="hover-scale"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <StatsCard
            title="Reminders Sent"
            value="12"
            description="This month"
            icon={<Calendar className="h-4 w-4" />}
            trend="neutral"
            trendValue="0%"
            className="hover-scale"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="animate-fade-in animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>
              AI matched payments in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tenant: "James Wilson", date: "Today", amount: "$1,200", status: "Matched", match: "High" },
                { tenant: "Sarah Johnson", date: "Yesterday", amount: "$950", status: "Matched", match: "High" },
                { tenant: "Michael Brown", date: "2 days ago", amount: "$1,050", status: "Manual", match: "Low" },
                { tenant: "Emma Davis", date: "3 days ago", amount: "$875", status: "Matched", match: "Medium" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 hover:bg-muted/20 transition-colors p-2 rounded">
                  <div>
                    <div className="font-medium">{activity.tenant}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{activity.amount}</div>
                    <div className="flex items-center text-sm">
                      <span 
                        className={`mr-1 rounded-full h-2 w-2 ${
                          activity.match === "High" 
                            ? "bg-green-500" 
                            : activity.match === "Medium" 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                        }`}
                      />
                      <span className={
                        activity.status === "Matched" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-muted-foreground"
                      }>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle>AI Payment Matching</CardTitle>
            <CardDescription>
              Current month performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Auto-matched Payments</div>
                  <div className="text-sm font-medium">85%</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full animate-slide-in-right" style={{ width: '85%', animationDelay: '0.7s' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Manual Review Required</div>
                  <div className="text-sm font-medium">12%</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full animate-slide-in-right" style={{ width: '12%', animationDelay: '0.8s' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Failed Matching</div>
                  <div className="text-sm font-medium">3%</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full animate-slide-in-right" style={{ width: '3%', animationDelay: '0.9s' }}></div>
                </div>
              </div>

              <div className="pt-2 flex items-center">
                <div className="flex-1 text-center p-3 bg-brand-gray rounded-lg mr-2 hover-scale dark:bg-gray-800">
                  <div className="text-2xl font-bold text-brand-blue dark:text-blue-400">42</div>
                  <div className="text-sm text-muted-foreground">Total Payments</div>
                </div>
                <div className="flex-1 text-center p-3 bg-brand-gray rounded-lg ml-2 hover-scale dark:bg-gray-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">94%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
