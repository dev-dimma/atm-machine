// import { type InputHTMLAttributes } from "react";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label: string;
// }

// const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
//   return (
//     <div className="flex flex-col">
//       <label className="mb-2 text-primary font-medium">{label}</label>
//       <input
//         className={`p-3 rounded-lg border border-primary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
//         {...props}
//       />
//     </div>
//   );
// };

// export default Input;

import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAtm } from "../hooks/useAtm";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const PinInput: React.FC = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { pin: correctPin } = useAtm();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError("PIN must be 4 digits");
      return;
    }
    if (pin === correctPin) {
      navigate("/menu");
    } else {
      setError("Incorrect PIN");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-4">
      <div className="backdrop-blur-xl bg-white/60 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-primary mb-8 text-center font-mono tracking-widest drop-shadow-lg">
          Enter Your PIN
        </h1>
        <Input
          label="PIN"
          type="password"
          value={pin}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPin(e.target.value)
          }
          maxLength={4}
          className="mb-6 text-center text-2xl tracking-widest font-mono bg-white/80 shadow-inner"
        />
        {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
        <Button
          onClick={handleSubmit}
          className="w-full py-4 text-lg shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PinInput;
