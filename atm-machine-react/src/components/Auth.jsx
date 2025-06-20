import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../lib/store";

function Auth() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const FIXED_AUTH_PASSWORD = "default_password_123456"; // Fixed password for Supabase auth

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      // Validate PIN
      if (pin.length !== 4) {
        throw new Error("PIN must be exactly 4 digits");
      }
      if (!/^\d{4}$/.test(pin)) {
        throw new Error("PIN must contain only numbers");
      }

      console.log("Auth attempt:", { email, pin, isLogin });

      if (isLogin) {
        // Login: Verify PIN against users table
        console.log("Querying users table for:", { email, pin });
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .eq("pin", pin)
          .single();
        if (userError) {
          console.error("User query error:", {
            message: userError.message,
            details: userError.details,
            code: userError.code,
          });
          throw new Error("Invalid email or PIN");
        }
        if (!userData) {
          console.error("No user found for:", { email, pin });
          throw new Error("Invalid email or PIN");
        }

        console.log("Attempting sign-in with:", { email });
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password: FIXED_AUTH_PASSWORD,
          });
        if (loginError) {
          console.error("Sign-in error:", {
            message: loginError.message,
            details: loginError.details,
            code: loginError.code,
          });
          throw new Error(`Authentication failed: ${loginError.message}`);
        }
        if (!loginData.user) {
          console.error("No user data returned from sign-in");
          throw new Error("No user data returned from authentication");
        }

        console.log("Login successful:", { user_id: loginData.user.id, email });
        setUser(userData);
        navigate("/menu");
      } else {
        // Sign-up: Create user and insert into users table
        console.log("Attempting sign-up with:", { email, pin });
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email,
            password: FIXED_AUTH_PASSWORD,
          }
        );
        if (authError) {
          console.error("Sign-up error:", {
            message: authError.message,
            details: authError.details,
            code: authError.code,
          });
          throw new Error(`Sign-up failed: ${authError.message}`);
        }
        if (!authData.user) {
          console.error("No user data returned from sign-up");
          throw new Error("No user data returned from sign-up");
        }

        console.log("Inserting user into users table:", {
          user_id: authData.user.id,
          email,
          pin,
        });
        const { error: insertError } = await supabase.from("users").insert({
          id: authData.user.id,
          email,
          pin,
          savings_balance: 0,
          current_balance: 0,
        });
        if (insertError) {
          console.error("Insert error:", {
            message: insertError.message,
            details: insertError.details,
            code: insertError.code,
          });
          throw new Error(`User insertion failed: ${insertError.message}`);
        }

        // Auto-login after sign-up
        console.log("Attempting auto-login after sign-up");
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password: FIXED_AUTH_PASSWORD,
          });
        if (loginError) {
          console.error("Auto-login error:", {
            message: loginError.message,
            details: loginError.details,
            code: loginError.code,
          });
          throw new Error(`Auto-login failed: ${loginError.message}`);
        }
        if (!loginData.user) {
          console.error("No user data returned from auto-login");
          throw new Error("No user data returned from auto-login");
        }

        console.log("Sign-up and auto-login successful:", {
          user_id: authData.user.id,
          email,
          pin,
        });
        setUser({
          id: authData.user.id,
          email,
          pin,
          savings_balance: 0,
          current_balance: 0,
        });
        navigate("/menu");
      }
    } catch (error) {
      console.error("Auth error:", {
        message: error.message,
        stack: error.stack,
      });
      alert(error.message);
    }
  };

  return (
    <div className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form onSubmit={handleAuth} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN (4 digits)"
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          maxLength={4}
        />
        <button
          type="submit"
          className="w-full bg-secondary text-white p-3 rounded hover:bg-blue-600 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-secondary hover:underline ml-1"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
