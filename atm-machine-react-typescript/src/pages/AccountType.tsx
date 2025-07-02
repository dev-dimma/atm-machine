import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";

const AccountType: React.FC = () => {
  const { action } = useParams<{ action: string }>();
  const navigate = useNavigate();

  const handleSelect = (accountType: "savings" | "current") => {
    navigate(`/${action}/amount`, { state: { accountType } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-6xl font-extrabold text-primary pb-8 mb-10 text-center font-serif tracking-widest drop-shadow-2xl lg:text-7xl"
        style={{ letterSpacing: "0.15em" }}
      >
        Select Account Type
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-lg min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col gap-8 w-full h-full justify-center">
          <Button
            onClick={() => handleSelect("savings")}
            className="w-full h-16 py-4 text-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200 lg:text-2xl m-2 flex items-center justify-center"
          >
            Savings Account
          </Button>
          <Button
            onClick={() => handleSelect("current")}
            className="w-full h-16 py-4 text-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200 lg:text-2xl m-2 flex items-center justify-center"
          >
            Current Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountType;
