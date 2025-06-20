import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../lib/store";

function PinChange() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const FIXED_AUTH_PASSWORD = "default_password_123456"; // Fixed password for Supabase auth

  const pinChangeMutation = useMutation({
    mutationFn: async (pin) => {
      // Update PIN in users table
      const { error: dbError } = await supabase
        .from("users")
        .update({ pin })
        .eq("id", user.id);
      if (dbError)
        throw new Error(`Database update failed: ${dbError.message}`);

      // Update Supabase auth password to fixed value
      const { error: authError } = await supabase.auth.updateUser({
        password: FIXED_AUTH_PASSWORD,
      });
      if (authError)
        throw new Error(`Auth update failed: ${authError.message}`);
    },
    onSuccess: () => {
      navigate("/pin-change/result", {
        state: { success: true, message: "PIN changed successfully!" },
      });
    },
    onError: (error) => {
      navigate("/pin-change/result", {
        state: { success: false, message: error.message },
      });
    },
  });

  const handlePinChange = (e) => {
    e.preventDefault();

    // Check if PINs match
    if (newPin !== confirmPin) {
      navigate("/pin-change/result", {
        state: { success: false, message: "PINs do not match" },
      });
      return;
    }

    // Check if PIN is exactly 4 digits
    if (newPin.length !== 4) {
      navigate("/pin-change/result", {
        state: { success: false, message: "PIN must be exactly 4 digits" },
      });
      return;
    }

    // Check if PIN contains only numbers
    if (!/^\d{4}$/.test(newPin)) {
      navigate("/pin-change/result", {
        state: { success: false, message: "PIN must contain only numbers" },
      });
      return;
    }

    pinChangeMutation.mutate(newPin);
  };

  if (!user) return null;

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Change PIN</h2>
      <form onSubmit={handlePinChange} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          placeholder="New PIN (4 digits)"
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          maxLength={4}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          placeholder="Confirm PIN (4 digits)"
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          maxLength={4}
        />
        <button
          type="submit"
          className="w-full bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
          disabled={pinChangeMutation.isPending}
        >
          {pinChangeMutation.isPending ? "Processing..." : "Proceed"}
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

export default PinChange;
