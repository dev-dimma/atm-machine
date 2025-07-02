import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAtm } from "../hooks/useAtm";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const PinChange: React.FC = () => {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const { setPin } = useAtm();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setError("PIN must be 4 digits");
      return;
    }
    if (newPin !== confirmPin) {
      setError("PINs do not match");
      return;
    }
    setPin(newPin);
    navigate("/menu");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-white to-primary p-2 sm:p-6 lg:p-12">
      <h1
        className="text-6xl font-extrabold text-primary pb-8 mb-10 text-center font-serif tracking-widest drop-shadow-2xl lg:text-7xl"
        style={{ letterSpacing: "0.15em" }}
      >
        Change PIN
      </h1>
      <div className="backdrop-blur-xl bg-white/70 border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-lg min-h-[30vh] min-w-[30vw] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <Input
          label="New PIN"
          type="password"
          value={newPin}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPin(e.target.value)
          }
          maxLength={4}
          className="mb-8 text-center text-2xl tracking-widest font-mono bg-white/80 shadow-inner lg:text-3xl m-4"
        />
        <Input
          label="Confirm PIN"
          type="password"
          value={confirmPin}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPin(e.target.value)
          }
          maxLength={4}
          className="mb-8 text-center text-2xl tracking-widest font-mono bg-white/80 shadow-inner lg:text-3xl m-4"
        />
        {error && (
          <p className="text-red-500 mb-6 font-semibold text-lg m-4">{error}</p>
        )}
        <Button
          onClick={handleSubmit}
          className="w-full py-4 text-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200 lg:text-2xl m-2"
        >
          Change PIN
        </Button>
      </div>
    </div>
  );
};

export default PinChange;
