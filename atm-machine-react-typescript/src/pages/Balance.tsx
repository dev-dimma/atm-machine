import { useNavigate } from "react-router-dom";
import { useAtm } from "../hooks/useAtm";
import Button from "../components/common/Button";

const Balance: React.FC = () => {
  const { savingsBalance = 0, currentBalance = 0 } = useAtm();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-6xl font-extrabold text-primary pb-8 mb-10 text-center font-serif tracking-widest drop-shadow-2xl lg:text-7xl"
        style={{ letterSpacing: "0.15em" }}
      >
        Account Balances
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-xl min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full flex flex-col gap-8 mb-10 h-full justify-center">
          <div className="flex justify-between items-center bg-primary/10 rounded-xl px-8 py-8 shadow-inner m-2 h-20">
            <span className="text-xl font-semibold text-primary font-mono lg:text-2xl">
              Savings Account
            </span>
            <span className="text-2xl font-bold text-primary font-mono lg:text-3xl">
              ${savingsBalance.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-primary/10 rounded-xl px-8 py-8 shadow-inner m-2 h-20">
            <span className="text-xl font-semibold text-primary font-mono lg:text-2xl">
              Current Account
            </span>
            <span className="text-2xl font-bold text-primary font-mono lg:text-3xl">
              ${currentBalance.toFixed(2)}
            </span>
          </div>
        </div>
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

export default Balance;
