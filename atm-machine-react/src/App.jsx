import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./lib/store";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import MainMenu from "./components/MainMenu";
import AccountTypeSelection from "./components/AccountTypeSelection";
import DepositAmount from "./components/DepositAmount";
import DepositResult from "./components/DepositResult";
import WithdrawalAmount from "./components/WithdrawalAmount";
import WithdrawalResult from "./components/WithdrawalResult";
import TransferAmount from "./components/TransferAmount";
import TransferResult from "./components/TransferResult";
import PinChange from "./components/PinChange";
import PinChangeResult from "./components/PinChangeResult";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        clearUser();
      } else if (authUser) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
        if (userError) {
          clearUser();
        } else {
          setUser(userData);
        }
      }
    };
    fetchUser();
  }, [setUser, clearUser]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/menu" /> : <Auth />} />
        <Route
          path="/menu"
          element={user ? <MainMenu /> : <Navigate to="/" />}
        />
        <Route
          path="/account-type/:feature"
          element={user ? <AccountTypeSelection /> : <Navigate to="/" />}
        />
        <Route
          path="/deposit/amount"
          element={user ? <DepositAmount /> : <Navigate to="/" />}
        />
        <Route
          path="/deposit/result"
          element={user ? <DepositResult /> : <Navigate to="/" />}
        />
        <Route
          path="/withdrawal/amount"
          element={user ? <WithdrawalAmount /> : <Navigate to="/" />}
        />
        <Route
          path="/withdrawal/result"
          element={user ? <WithdrawalResult /> : <Navigate to="/" />}
        />
        <Route
          path="/transfer/amount"
          element={user ? <TransferAmount /> : <Navigate to="/" />}
        />
        <Route
          path="/transfer/result"
          element={user ? <TransferResult /> : <Navigate to="/" />}
        />
        <Route
          path="/pin-change"
          element={user ? <PinChange /> : <Navigate to="/" />}
        />
        <Route
          path="/pin-change/result"
          element={user ? <PinChangeResult /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction-history"
          element={user ? <TransactionHistory /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
