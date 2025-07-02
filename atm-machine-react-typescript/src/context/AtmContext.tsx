import { createContext, type ReactNode, useState } from "react";
import { type Transaction, type AtmState } from "../types/atm";

interface AtmContextType extends AtmState {
  setPin: (newPin: string) => void;
  deposit: (amount: number, accountType: "savings" | "current") => void;
  withdraw: (amount: number, accountType: "savings" | "current") => boolean;
  transfer: (
    amount: number,
    from: "savings" | "current",
    to: string
  ) => boolean;
}

const AtmContext = createContext<AtmContextType | undefined>(undefined);

export const AtmProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [savingsBalance, setSavingsBalance] = useState(1000);
  const [currentBalance, setCurrentBalance] = useState(500);
  const [pin, setPinState] = useState("1234");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const setPin = (newPin: string) => {
    setPinState(newPin);
  };

  const deposit = (amount: number, accountType: "savings" | "current") => {
    if (accountType === "savings") {
      setSavingsBalance((prev) => prev + amount);
    } else {
      setCurrentBalance((prev) => prev + amount);
    }
    setTransactions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "deposit",
        accountType,
        amount,
        date: new Date().toISOString(),
      },
    ]);
  };

  const withdraw = (amount: number, accountType: "savings" | "current") => {
    if (accountType === "savings" && savingsBalance >= amount) {
      setSavingsBalance((prev) => prev - amount);
      setTransactions((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "withdrawal",
          accountType,
          amount,
          date: new Date().toISOString(),
        },
      ]);
      return true;
    } else if (accountType === "current" && currentBalance >= amount) {
      setCurrentBalance((prev) => prev - amount);
      setTransactions((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "withdrawal",
          accountType,
          amount,
          date: new Date().toISOString(),
        },
      ]);
      return true;
    }
    return false;
  };

  const transfer = (
    amount: number,
    from: "savings" | "current",
    to: string
  ) => {
    const toAccount = to as "savings" | "current";
    if (from === "savings" && savingsBalance >= amount) {
      setSavingsBalance((prev) => prev - amount);
      if (toAccount === "current") {
        setCurrentBalance((prev) => prev + amount);
      }
      setTransactions((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "transfer",
          accountType: from,
          amount,
          date: new Date().toISOString(),
        },
      ]);
      return true;
    } else if (from === "current" && currentBalance >= amount) {
      setCurrentBalance((prev) => prev - amount);
      if (toAccount === "savings") {
        setSavingsBalance((prev) => prev + amount);
      }
      setTransactions((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "transfer",
          accountType: from,
          amount,
          date: new Date().toISOString(),
        },
      ]);
      return true;
    }
    return false;
  };

  return (
    <AtmContext.Provider
      value={{
        savingsBalance,
        currentBalance,
        pin,
        transactions,
        setPin,
        deposit,
        withdraw,
        transfer,
      }}
    >
      {children}
    </AtmContext.Provider>
  );
};

export { AtmContext };
