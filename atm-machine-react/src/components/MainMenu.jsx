import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../lib/store";

function MainMenu() {
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: balances,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["balance", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("savings_balance, current_balance")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleFeatureClick = (feature) => {
    navigate(`/account-type/${feature}`);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      clearUser();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  if (!user) return null;
  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ATM Main Menu</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Account Balances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
            <span className="text-lg font-medium text-gray-300">
              Savings Account
            </span>
            <span className="text-2xl font-bold text-secondary mt-2">
              ${balances.savings_balance.toFixed(2)}
            </span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
            <span className="text-lg font-medium text-gray-300">
              Current Account
            </span>
            <span className="text-2xl font-bold text-secondary mt-2">
              ${balances.current_balance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleFeatureClick("deposit")}
          className="bg-secondary text-white p-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
        >
          Deposit
        </button>
        <button
          onClick={() => handleFeatureClick("withdrawal")}
          className="bg-secondary text-white p-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
        >
          Withdrawal
        </button>
        <button
          onClick={() => handleFeatureClick("transfer")}
          className="bg-secondary text-white p-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
        >
          Transfer
        </button>
        <button
          onClick={() => navigate("/pin-change")}
          className="bg-secondary text-white p-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
        >
          Change PIN
        </button>
        <button
          onClick={() => navigate("/transaction-history")}
          className="bg-secondary text-white p-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
        >
          Transaction History
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
