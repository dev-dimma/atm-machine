import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../lib/store";

function TransactionHistory() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("id, type, account_type, amount, recipient_id, timestamp")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) return null;
  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Transaction History
      </h2>
      {transactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3">Type</th>
                <th className="p-3">Account</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700">
                  <td className="p-3">{tx.type}</td>
                  <td className="p-3">{tx.account_type}</td>
                  <td className="p-3">{tx.amount}</td>
                  <td className="p-3">{tx.recipient_id || "-"}</td>
                  <td className="p-3">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => navigate("/menu")}
        className="w-full mt-6 bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
      >
        Back to Menu
      </button>
    </div>
  );
}

export default TransactionHistory;
