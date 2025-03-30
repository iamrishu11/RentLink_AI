
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Check, X, AlertTriangle, Eye, Filter, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { paymanService } from '@/lib/payman';

interface PaymentMatchingProps {
  className?: string;
}

const PaymentMatching = ({ className }: PaymentMatchingProps) => {
  const [filterOptions, setFilterOptions] = useState({
    matched: true,
    review: true,
    failed: true,
  });

  const [isRunningMatching, setIsRunningMatching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const [transactions, setTransactions] = useState([
    { date: "2023-11-01", amount: "$1,200.00", description: "PAYMENT REF: RENT OCT JAMES", tenant: "James Wilson", confidence: "High", status: "Matched", payeeId: "pd-sample-001" },
    { date: "2023-11-01", amount: "$950.00", description: "BANK TRANSFER - S JOHNSON", tenant: "Sarah Johnson", confidence: "High", status: "Matched", payeeId: "pd-sample-002" },
    { date: "2023-10-30", amount: "$1,047.50", description: "PAYMENT FROM MICHAEL B", tenant: "Michael Brown", confidence: "Medium", status: "Review", payeeId: "pd-sample-003" },
    { date: "2023-10-29", amount: "$875.00", description: "RENT PAYMENT E DAVIS", tenant: "Emma Davis", confidence: "High", status: "Matched", payeeId: "pd-sample-004" },
    { date: "2023-10-29", amount: "$1,100.00", description: "PYMNT FROM UNKN SRC", tenant: "Unmatched", confidence: "Low", status: "Failed", payeeId: "" },
  ]);

  useEffect(() => {
    // Fetch balance on component mount
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const balanceAmount = await paymanService.getBalance();
      setBalance(balanceAmount);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunMatching = async () => {
    setIsRunningMatching(true);
    
    toast({
      title: "Payment Matching Started",
      description: "AI is processing transactions to match payments",
    });
    
    try {
      // Simulate AI processing (in real app, this would call an API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get payees from Payman
      const payees = await paymanService.searchPayees();
      console.log("Available payees:", payees);
      
      // Update transactions with AI matching
      setTransactions(
        transactions.map(tx => {
          if (tx.status === "Review") {
            return { ...tx, status: "Matched", confidence: "High" };
          } else if (tx.status === "Failed" && tx.description.includes("UNKN")) {
            // Simulate an AI match on the previously unmatched payment
            return { 
              ...tx, 
              status: "Matched", 
              confidence: "Medium", 
              tenant: "Lisa Thompson",
              payeeId: "pd-auto-matched"
            };
          }
          return tx;
        })
      );
      
      toast({
        title: "Payment Matching Complete",
        description: "Successfully processed all transactions",
      });
      
      // Update balance after processing
      fetchBalance();
      
    } catch (error) {
      console.error("Error running matching:", error);
      toast({
        title: "Matching Error",
        description: "An error occurred while matching payments",
        variant: "destructive"
      });
    } finally {
      setIsRunningMatching(false);
    }
  };

  const handleProcessPayment = async (transaction: any) => {
    if (!transaction.payeeId) {
      toast({
        title: "Cannot process payment",
        description: "No payee ID associated with this transaction",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Parse amount from string (removing "$" and "," characters)
      const amountStr = transaction.amount.replace('$', '').replace(',', '');
      const amount = parseFloat(amountStr);
      
      if (isNaN(amount)) {
        throw new Error("Invalid amount format");
      }
      
      // Process payment through Payman
      const payment = await paymanService.sendPayment({
        amountDecimal: amount,
        payeeId: transaction.payeeId,
        memo: `Rent payment for ${transaction.tenant}`
      });
      
      toast({
        title: "Payment Processed",
        description: `Successfully processed ${transaction.amount} payment to ${transaction.tenant}`,
      });
      
      // Update balance
      fetchBalance();
      
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Processing Failed",
        description: "There was an error processing this payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (tx.status === "Matched" && filterOptions.matched) return true;
    if (tx.status === "Review" && filterOptions.review) return true;
    if (tx.status === "Failed" && filterOptions.failed) return true;
    return false;
  });

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">AI Payment Matching</h2>
        <div className="flex space-x-2">
          <Button variant="outline" disabled={isLoading} onClick={fetchBalance}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <span>Balance: ${balance !== null ? balance.toFixed(2) : '...'}</span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
              <DropdownMenuCheckboxItem
                checked={filterOptions.matched}
                onCheckedChange={(checked) => setFilterOptions({...filterOptions, matched: checked})}
              >
                Show Matched
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.review}
                onCheckedChange={(checked) => setFilterOptions({...filterOptions, review: checked})}
              >
                Show For Review
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.failed}
                onCheckedChange={(checked) => setFilterOptions({...filterOptions, failed: checked})}
              >
                Show Failed
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleRunMatching} disabled={isRunningMatching}>
            {isRunningMatching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Run Matching
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="mb-6 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg">How AI Payment Matching Works</CardTitle>
          <CardDescription>
            Our AI system automatically matches incoming bank transactions to your tenants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 p-4 bg-card dark:bg-card text-card-foreground rounded-lg text-center">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <ArrowLeftRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Incoming Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Bank deposits are automatically monitored
              </p>
            </div>
            
            <div className="w-8 h-8 rounded-full border-2 border-muted flex items-center justify-center">
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex-1 p-4 bg-card dark:bg-card text-card-foreground rounded-lg text-center animate-pulse-slow">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 4a1 1 0 011 1v.25A4.75 4.75 0 117.81 14l.19.02a1 1 0 01-1.996.131L6 14.15A4.75 4.75 0 0114 11v-.25a1 1 0 011-1 1 1 0 01.117 1.993L15 11.75v.09l.087.09a2.751 2.751 0 11-4.175-.09L11 11.75v-4A1 1 0 0112 6z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1">AI Processing</h3>
              <p className="text-sm text-muted-foreground">
                Payman AI analyzes transaction details
              </p>
            </div>
            
            <div className="w-8 h-8 rounded-full border-2 border-muted flex items-center justify-center">
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex-1 p-4 bg-card dark:bg-card text-card-foreground rounded-lg text-center">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Matched Payments</h3>
              <p className="text-sm text-muted-foreground">
                Payments are correctly assigned to tenants
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Badge variant="outline" className="bg-card dark:bg-card text-card-foreground">
            Last 7 days
          </Badge>
        </div>
        
        <div className="overflow-x-auto">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-3 text-sm font-medium text-muted-foreground">Transaction Date</th>
                  <th className="p-3 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="p-3 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="p-3 text-sm font-medium text-muted-foreground">Matched Tenant</th>
                  <th className="p-3 text-sm font-medium text-muted-foreground">Confidence</th>
                  <th className="p-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="p-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, i) => (
                  <tr key={i} className="border-t hover:bg-muted/50">
                    <td className="p-3 text-sm">{tx.date}</td>
                    <td className="p-3 text-sm font-medium">{tx.amount}</td>
                    <td className="p-3 text-sm">{tx.description}</td>
                    <td className="p-3 text-sm">{tx.tenant}</td>
                    <td className="p-3 text-sm">
                      <Badge className={
                        tx.confidence === "High" 
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300" 
                          : tx.confidence === "Medium" 
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300" 
                            : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                      }>
                        {tx.confidence}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">
                      {tx.status === "Matched" ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4 mr-1" />
                          Matched
                        </span>
                      ) : tx.status === "Review" ? (
                        <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Review
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 dark:text-red-400">
                          <X className="h-4 w-4 mr-1" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {tx.status === "Matched" && tx.payeeId && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8" 
                            disabled={isLoading}
                            onClick={() => handleProcessPayment(tx)}
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <span>Process</span>
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMatching;
