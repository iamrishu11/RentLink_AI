
import Payman from "paymanai";

// Initialize Payman with the API secret
const payman = new Payman({
  xPaymanAPISecret: "YWd0LTFmMDBkOTJhLWU4ODQtNmZhMC04MDNlLWUzYjg0ODA4MTU2ZDpIMGJ5TllYM0NjSmRpZXJFMHB4T1Z2bzIzQw==",
});

// Define interfaces for payee creation
interface PayeeContact {
  email: string;
}

interface CreatePayeeParams {
  type: "US_ACH";
  name: string;
  accountHolderName: string;
  accountHolderType: "individual" | "business";
  accountNumber: string;
  routingNumber: string;
  accountType: "checking" | "savings";
  contactDetails: PayeeContact;
}

// Define interface for payment sending
interface SendPaymentParams {
  amountDecimal: number;
  payeeId: string;
  memo: string;
  metadata?: Record<string, any>;
}

// Export Payman service with methods
export const paymanService = {
  // Create a new payee
  createPayee: async (params: CreatePayeeParams) => {
    try {
      const payee = await payman.payments.createPayee(params);
      return payee;
    } catch (error) {
      console.error("Error creating payee:", error);
      throw error;
    }
  },
  
  // Send a payment to a payee
  sendPayment: async (params: SendPaymentParams) => {
    try {
      const payment = await payman.payments.sendPayment(params);
      return payment;
    } catch (error) {
      console.error("Error sending payment:", error);
      throw error;
    }
  },
  
  // Search for payees
  searchPayees: async (filters?: { name?: string; type?: string }) => {
    try {
      const payees = await payman.payments.searchPayees(filters);
      return payees;
    } catch (error) {
      console.error("Error searching payees:", error);
      throw error;
    }
  },
  
  // Get spendable balance
  getBalance: async (currency: string = "USD") => {
    try {
      const balance = await payman.balances.getSpendableBalance(currency);
      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }
};

export default paymanService;
