import { useNavigate } from "react-router-dom";
import { useAtm } from "../hooks/useAtm";
import Button from "../components/common/Button";
import { type Transaction } from "../types/atm";

const TransactionHistory: React.FC = () => {
  const { transactions } = useAtm();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-6xl font-extrabold text-primary pb-8 mb-10 text-center font-serif tracking-widest drop-shadow-2xl lg:text-7xl"
        style={{ letterSpacing: "0.15em" }}
      >
        Transaction History
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-2xl min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        {transactions.length === 0 ? (
          <p className="text-primary font-mono text-xl">
            No transactions found.
          </p>
        ) : (
          <ul className="space-y-8 w-full h-full justify-center">
            {transactions.map((tx: Transaction) => (
              <li
                key={tx.id}
                className="border-b border-primary/30 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center m-4 h-16 items-center justify-center"
              >
                <span className="text-primary font-mono text-xl lg:text-2xl">
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} of $
                  {tx.amount} on {tx.accountType} account
                </span>
                <span className="text-primary/70 text-lg font-mono">
                  {new Date(tx.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Button
          onClick={() => navigate("/menu")}
          className="w-full py-4 text-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200 lg:text-2xl m-2"
        >
          Back to Menu
        </Button>
      </div>
    </div>
  );
};

export default TransactionHistory;
