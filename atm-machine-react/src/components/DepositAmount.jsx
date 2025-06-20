import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../lib/store";

function DepositAmount() {
  const [amount, setAmount] = useState("");
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();
  const accountType = state?.accountType || "savings";

  const depositMutation = useMutation({
    mutationFn: async (amount) => {
      const { error } = await supabase.rpc("update_balance", {
        p_user_id: user.id,
        p_amount: amount,
        p_type: "deposit",
        p_account_type: accountType,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance", user.id]);
      queryClient.invalidateQueries(["transactions", user.id]);
      navigate("/deposit/result", {
        state: { success: true, message: "Deposit successful!" },
      });
    },
    onError: (error) => {
      navigate("/deposit/result", {
        state: { success: false, message: error.message },
      });
    },
  });

  const handleDeposit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      navigate("/deposit/result", {
        state: { success: false, message: "Please enter a valid amount" },
      });
      return;
    }
    depositMutation.mutate(Number(amount));
  };

  if (!user) return null;

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Deposit to {accountType.charAt(0).toUpperCase() + accountType.slice(1)}{" "}
        Account
      </h2>
      <form onSubmit={handleDeposit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <button
          type="submit"
          className="w-full bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
          disabled={depositMutation.isPending}
        >
          {depositMutation.isPending ? "Processing..." : "Proceed"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default DepositAmount;
