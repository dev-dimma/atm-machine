import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAtm } from "../hooks/useAtm";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const AmountInput: React.FC = () => {
  const { action } = useParams<{ action?: string }>();
  const { state } = useLocation();
  const { accountType } =
    (state as { accountType?: "savings" | "current" }) || {};
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [error, setError] = useState("");
  const { deposit, withdraw, transfer, savingsBalance, currentBalance } =
    useAtm();
  const navigate = useNavigate();

  if (!action || !accountType) {
    return (
      <div className="text-primary text-center">Invalid navigation state</div>
    );
  }

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    let success = false;
    if (action === "deposit") {
      deposit(numAmount, accountType);
      success = true;
    } else if (action === "withdrawal") {
      const balance =
        accountType === "savings" ? savingsBalance : currentBalance;
      if (numAmount > balance) {
        setError("Insufficient balance");
        return;
      }
      success = withdraw(numAmount, accountType);
    } else if (action === "transfer") {
      if (!toAccount) {
        setError("Please select a destination account");
        return;
      }
      const balance =
        accountType === "savings" ? savingsBalance : currentBalance;
      if (numAmount > balance) {
        setError("Insufficient balance");
        return;
      }
      success = transfer(numAmount, accountType, toAccount);
    }

    if (success) {
      navigate(`/${action}/success`, {
        state: { accountType, amount: numAmount, toAccount },
      });
    } else {
      setError("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-6xl font-extrabold text-primary pb-8 mb-10 text-center font-serif tracking-widest drop-shadow-2xl lg:text-7xl"
        style={{ letterSpacing: "0.15em" }}
      >
        {action.charAt(0).toUpperCase() + action.slice(1)} Amount
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-lg min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          className="mb-10 text-center text-2xl tracking-widest font-mono bg-white/80 shadow-inner lg:text-3xl m-4"
        />
        {action === "transfer" && (
          <div className="mb-10 w-full m-4">
            <label className="mb-2 text-primary font-semibold tracking-wider uppercase text-lg drop-shadow-md">
              To Account
            </label>
            <select
              value={toAccount}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setToAccount(e.target.value)
              }
              className="p-4 rounded-xl border-2 border-primary bg-white bg-opacity-40 text-primary font-mono text-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:bg-opacity-70 transition-all duration-200 w-full mt-2 lg:text-3xl"
            >
              <option value="">Select account</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </div>
        )}
        {error && (
          <p className="text-red-500 mb-6 font-semibold text-lg m-4">{error}</p>
        )}
        <Button
          onClick={handleSubmit}
          className="w-full py-4 text-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200 lg:text-2xl m-2"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AmountInput;
