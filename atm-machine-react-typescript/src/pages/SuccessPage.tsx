import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "../components/common/Button";

const SuccessPage: React.FC = () => {
  const { action } = useParams<{ action?: string }>();
  const { state } = useLocation();
  const { accountType, amount, toAccount } =
    (state as {
      accountType?: string;
      amount?: number;
      toAccount?: string;
    }) || {};
  const navigate = useNavigate();

  if (!action || !accountType || amount === undefined) {
    return (
      <div className="text-primary text-center">Invalid transaction state</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-6xl font-extrabold text-primary pb-8 mb-10 text-center font-serif tracking-widest drop-shadow-2xl lg:text-7xl"
        style={{ letterSpacing: "0.15em" }}
      >
        Transaction Successful
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-lg min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <p className="text-primary mb-10 text-xl font-mono text-center lg:text-2xl m-4">
          {action.charAt(0).toUpperCase() + action.slice(1)} of ${amount} to{" "}
          {accountType} account
          {toAccount ? ` transferred to ${toAccount} account` : ""}.
        </p>
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

export default SuccessPage;
