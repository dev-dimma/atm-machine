import { useNavigate, useParams } from "react-router-dom";

function AccountTypeSelection() {
  const { feature } = useParams();
  const navigate = useNavigate();

  const handleAccountType = (accountType) => {
    navigate(`/${feature}/amount`, { state: { accountType } });
  };

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select Account Type
      </h2>
      <div className="space-y-4">
        <button
          onClick={() => handleAccountType("savings")}
          className="w-full bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Savings Account
        </button>
        <button
          onClick={() => handleAccountType("current")}
          className="w-full bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Current Account
        </button>
        <button
          onClick={() => navigate("/menu")}
          className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AccountTypeSelection;
