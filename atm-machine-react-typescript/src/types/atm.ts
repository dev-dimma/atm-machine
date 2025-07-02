export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer";
  accountType: "savings" | "current";
  amount: number;
  date: string;
}

export interface AtmState {
  savingsBalance: number;
  currentBalance: number;
  pin: string;
  transactions: Transaction[];
}
