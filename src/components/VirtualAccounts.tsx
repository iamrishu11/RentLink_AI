import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Copy, ExternalLink, CheckCircle, PlusCircle, RefreshCw, Loader2, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { paymanService } from '@/lib/payman';

interface VirtualAccountsProps {
  className?: string;
}

const VirtualAccounts = ({ className }: VirtualAccountsProps) => {
  const [selectedTenant, setSelectedTenant] = useState("");
  const [accountType, setAccountType] = useState("personal");
  const [rentAmount, setRentAmount] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [accounts, setAccounts] = useState([
    { tenant: "James Wilson", account: "VA-2023-001-JW", status: "Active", payeeId: "pd-sample-001" },
    { tenant: "Sarah Johnson", account: "VA-2023-002-SJ", status: "Active", payeeId: "pd-sample-002" },
    { tenant: "Michael Brown", account: "VA-2023-003-MB", status: "Active", payeeId: "pd-sample-003" },
  ]);
  const [tenants, setTenants] = useState<any[]>([]); // To store tenant data

  useEffect(() => {
    // Fetch tenant data from API
    const fetchTenants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tenants'); // Replace with your actual API endpoint
        const data = await response.json();
        setTenants(data); // Set tenant data from the backend
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
    // Fetch balance on component load
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const balanceAmount = await paymanService.getBalance();
      setBalance(balanceAmount);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast({
        title: "Error fetching balance",
        description: "Could not retrieve current balance information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: description,
    });
  };

  const handleGenerateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTenant || !rentAmount) {
      toast({
        title: "Missing information",
        description: "Please select a tenant and enter rent amount",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    try {
      // Generate tenant initials for the account number
      const tenantInitials = selectedTenant.split(" ")
        .map(name => name[0])
        .join("");
      
      const newAccountNumber = `VA-${new Date().getFullYear()}-${String(accounts.length + 1).padStart(3, '0')}-${tenantInitials}`;
      
      // Create a payee in Payman
      const email = selectedTenant.toLowerCase().replace(' ', '.') + '@example.com';
      const payee = await paymanService.createPayee({
        type: "US_ACH",
        name: selectedTenant,
        accountHolderName: selectedTenant,
        accountHolderType: accountType === "personal" ? "individual" : "business",
        accountNumber: "12345678",  // Normally would be collected securely
        routingNumber: "021000021", // Normally would be collected securely
        accountType: "checking",
        contactDetails: {
          email: email
        }
      });
      
      // Add the new account with Payman payee ID
      setAccounts([
        ...accounts,
        { 
          tenant: selectedTenant, 
          account: newAccountNumber, 
          status: "Active",
          payeeId: payee.id
        }
      ]);
      
      toast({
        title: "Virtual account created",
        description: `Successfully created account for ${selectedTenant}`,
      });
      
      // Reset form
      setSelectedTenant("");
      setRentAmount("");
      
    } catch (error) {
      console.error("Error creating virtual account:", error);
      toast({
        title: "Account creation failed",
        description: "There was an error creating the virtual account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleMakePayment = async (payeeId: string, tenant: string) => {
    try {
      setIsLoading(true);
      
      // Parse rent amount - in real app would use the tenant's actual rent amount
      const amount = parseFloat(rentAmount || "100.00");
      
      // Send payment via Payman
      const payment = await paymanService.sendPayment({
        amountDecimal: amount,
        payeeId: payeeId,
        memo: `Rent payment for ${tenant}`
      });
      
      toast({
        title: "Payment sent",
        description: `Successfully sent $${amount.toFixed(2)} to ${tenant}`,
      });
      
      // Update balance after payment
      fetchBalance();
      
    } catch (error) {
      console.error("Error sending payment:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing the payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAccount = () => {
    toast({
      title: "New account form ready",
      description: "Please fill in the details to generate a new account",
    });
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Virtual Accounts</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchBalance} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Balance: {balance !== null ? `$${balance.toFixed(2)}` : 'Loading...'}
          </Button>
          <Button onClick={handleNewAccount}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Generate New Account
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Create Virtual Accounts</CardTitle>
            <CardDescription>
              Generate virtual accounts for your tenants to receive payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleGenerateAccount}>
              <div className="space-y-2">
                <Label htmlFor="tenant">Select Tenant</Label>
                <select 
                  id="tenant" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedTenant}
                  onChange={(e) => setSelectedTenant(e.target.value)}
                  disabled={isCreating}
                >
                  <option value="">Select a tenant...</option>
                  {tenants.map((tenant) => (
                    <option key={tenant._id} value={tenant.name}>{tenant.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <select 
                  id="accountType" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  disabled={isCreating}
                >
                  <option value="personal">Personal Account</option>
                  <option value="business">Business Account</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentAmount">Monthly Rent Amount</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <Input 
                    id="rentAmount" 
                    type="text" 
                    placeholder="0.00" 
                    className="pl-8" 
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    disabled={isCreating}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Generate Virtual Account
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Virtual Accounts</CardTitle>
                <CardDescription>
                  Your tenants' payment accounts
                </CardDescription>
              </div>
              <CreditCard className="h-5 w-5 text-brand-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.map((account, i) => (
                <div key={i} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{account.tenant}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2">{account.account}</span>
                        <button 
                          onClick={() => handleCopy(account.account, `${account.tenant}'s account number copied`)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center text-sm text-green-600 mr-3">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {account.status}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8" 
                        onClick={() => handleMakePayment(account.payeeId, account.tenant)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <DollarSign className="h-4 w-4 mr-1" />
                            Pay
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VirtualAccounts;
