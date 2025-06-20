import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../lib/store";

function TransferAmount() {
  const [amount, setAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();
  const accountType = state?.accountType || "savings";

  const transferMutation = useMutation({
    mutationFn: async ({ amount, recipientEmail }) => {
      const { data: recipient, error: recipientError } = await supabase
        .from("users")
        .select("id")
        .eq("email", recipientEmail)
        .single();
      if (recipientError || !recipient) throw new Error("Recipient not found");

      const { error } = await supabase.rpc("update_balance", {
        p_user_id: user.id,
        p_amount: amount,
        p_type: "transfer",
        p_account_type: accountType,
        p_recipient_id: recipient.id,
      });
      if (error) throw error;

      return recipient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance", user.id]);
      queryClient.invalidateQueries(["transactions", user.id]);
      navigate("/transfer/result", {
        state: { success: true, message: "Transfer successful!" },
      });
    },
    onError: (error) => {
      navigate("/transfer/result", {
        state: { success: false, message: error.message },
      });
    },
  });

  const handleTransfer = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      navigate("/transfer/result", {
        state: { success: false, message: "Please enter a valid amount" },
      });
      return;
    }
    transferMutation.mutate({ amount: Number(amount), recipientEmail });
  };

  if (!user) return null;

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Transfer from{" "}
        {accountType.charAt(0).toUpperCase() + accountType.slice(1)} Account
      </h2>
      <form onSubmit={handleTransfer} className="space-y-4">
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="Recipient Email"
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
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
          disabled={transferMutation.isPending}
        >
          {transferMutation.isPending ? "Processing..." : "Proceed"}
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

export default TransferAmount;
