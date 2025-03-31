import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BellRing, Mail, MessageSquare, Clock, PlusCircle, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface Reminder {
  tenant: string;
  due: string;
  type: string;
  channel: string;
  lastSent?: string;
}

interface RemindersProps {
  className?: string;
}

const Reminders = ({ className }: RemindersProps) => {
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState(7);
  const [lateDays, setLateDays] = useState(1);
  const [followUpDays, setFollowUpDays] = useState(3);
  const [smartReminders, setSmartReminders] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch reminders from the backend
  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/reminders"); // Update API URL if needed
        console.log("Fetched reminders:", response.data);
        setReminders(response.data); // Update state with fetched reminders
      } catch (error) {
        console.error("Error fetching reminders:", error);
        toast({
          title: "Error",
          description: "Failed to load reminders",
        });
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchReminders();
  }, []);

  const handleSendReminders = async () => {
    try {
      // Update lastSent timestamp in the local state
      const updatedReminders = reminders.map(reminder => ({
        ...reminder,
        lastSent: new Date().toLocaleDateString(),
      }));
  
      // Send the updated reminders to the backend
      await axios.put("http://localhost:5000/api/reminders/update", updatedReminders);
  
      // After successful update, update the state with the new lastSent field
      setReminders(updatedReminders);
  
      // Show success toast
      toast({
        title: "Reminders Sent",
        description: `Successfully sent reminders to ${reminders.length} tenants`,
      });
    } catch (error) {
      console.error("Error sending reminders:", error);
      toast({
        title: "Error",
        description: "Failed to send reminders",
      });
    }
  };  

  const handleAddReminder = () => {
    setFollowUpDays(followUpDays + 3);
    toast({
      title: "Reminder Added",
      description: "Added a new follow-up reminder",
    });
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Return in format MM/DD/YYYY
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Smart Reminders</h2>
        <Button onClick={handleSendReminders}>
          <Send className="h-4 w-4 mr-2" />
          Send Reminders
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reminder Settings</CardTitle>
            <CardDescription>
              Configure automated payment reminders for your tenants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Reminders</h4>
                    <p className="text-sm text-muted-foreground">Send reminders via email</p>
                  </div>
                  <Switch 
                    id="email-reminders" 
                    checked={emailReminders} 
                    onCheckedChange={setEmailReminders}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Reminders</h4>
                    <p className="text-sm text-muted-foreground">Send reminders via text message</p>
                  </div>
                  <Switch 
                    id="sms-reminders" 
                    checked={smsReminders} 
                    onCheckedChange={setSmsReminders}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Reminder Schedule</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reminder-days">Days Before Due</Label>
                      <Input 
                        type="number" 
                        id="reminder-days" 
                        value={reminderDays}
                        onChange={(e) => setReminderDays(parseInt(e.target.value))} 
                        min="1" 
                        max="30" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="late-days">Days After Due</Label>
                      <Input 
                        type="number" 
                        id="late-days" 
                        value={lateDays} 
                        onChange={(e) => setLateDays(parseInt(e.target.value))}
                        min="1" 
                        max="30" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="follow-up">Follow Up (days)</Label>
                    <div className="flex space-x-2">
                      <Input 
                        type="number" 
                        id="follow-up" 
                        value={followUpDays} 
                        onChange={(e) => setFollowUpDays(parseInt(e.target.value))}
                        min="1" 
                        max="30" 
                      />
                      <Button variant="outline" onClick={handleAddReminder}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reminders</CardTitle>
            <CardDescription>
              Reminders scheduled to be sent in the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p className="text-muted-foreground">Loading reminders...</p>
              ) : reminders.length > 0 ? (
                reminders.map((reminder, i) => (
                  <div key={i} className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`rounded-full p-2 mr-3 ${
                      reminder.type === "Overdue" 
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" 
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                    }`}>
                      {reminder.type === "Overdue" ? (
                        <BellRing className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{reminder.tenant}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Due: {formatDate(reminder.due)}</span>
                        <span className="mx-2">•</span>
                        <span>{reminder.type}</span>
                      </div>
                      {reminder.lastSent && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Last Sent: {formatDate(reminder.lastSent)}
                        </div>
                      )}
                    </div>
                    <div className="text-sm">
                      {reminder.channel.includes("Email") && (
                        <Mail className="h-4 w-4 inline-block mr-1 text-brand-blue" />
                      )}
                      {reminder.channel.includes("SMS") && (
                        <MessageSquare className="h-4 w-4 inline-block text-brand-blue" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No reminders found.</p>
              )}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center">
                <div className="rounded-full p-2 mr-3 bg-brand-lightBlue text-brand-blue dark:bg-blue-900 dark:text-blue-300">
                  <BellRing className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Smart Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes payment history to optimize reminder timing
                  </p>
                </div>
                <Switch 
                  id="smart-reminders" 
                  checked={smartReminders}
                  onCheckedChange={setSmartReminders}
                  className="ml-auto" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reminders;
