import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Deposit", path: "/deposit/account-type" },
    { label: "Withdrawal", path: "/withdrawal/account-type" },
    { label: "Transfer", path: "/transfer/account-type" },
    { label: "Balance", path: "/balance" },
    { label: "Transaction History", path: "/history" },
    { label: "Change PIN", path: "/pin-change" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-7xl font-extrabold text-primary pb-20 mb-20 text-center font-serif tracking-widest drop-shadow-2xl lg:text-9xl"
        style={{ letterSpacing: "0.15em" }}
      >
        ATM Menu
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-2xl min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full h-24 py-6 text-2xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200 lg:text-3xl m-2 flex items-center justify-center"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
