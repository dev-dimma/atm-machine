import { useLocation, useNavigate } from "react-router-dom";

function WithdrawalResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { success, message } = state || {
    success: false,
    message: "No result available",
  };

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {success ? "Success" : "Error"}
      </h2>
      <p className="text-center mb-6">{message}</p>
      <button
        onClick={() => navigate("/menu")}
        className="w-full bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
      >
        Back to Menu
      </button>
    </div>
  );
}

export default WithdrawalResult;
