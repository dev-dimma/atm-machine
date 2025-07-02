import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AtmProvider } from "./context/AtmContext";
import MainMenu from "./pages/MainMenu";
import AccountType from "./pages/AccountType";
import AmountInput from "./pages/AmountInput";
import SuccessPage from "./pages/SuccessPage";
import Balance from "./pages/Balance";
import TransactionHistory from "./pages/TransactionHistory";
import PinChange from "./pages/PinChange";
import PinInput from "./pages/PinInput";

function App() {
  return (
    <AtmProvider>
      <Router>
        <div className="min-h-screen bg-secondary font-sans">
          <Routes>
            <Route path="/" element={<PinInput />} />
            <Route path="/menu" element={<MainMenu />} />
            <Route path="/:action/account-type" element={<AccountType />} />
            <Route path="/:action/amount" element={<AmountInput />} />
            <Route path="/:action/success" element={<SuccessPage />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/history" element={<TransactionHistory />} />
            <Route path="/pin-change" element={<PinChange />} />
          </Routes>
        </div>
      </Router>
    </AtmProvider>
  );
}

export default App;
