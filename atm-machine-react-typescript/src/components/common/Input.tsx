import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="mb-1 text-primary font-semibold tracking-wider uppercase text-sm drop-shadow-md">
        {label}
      </label>
      <input
        className={`p-3 rounded-xl border-2 border-primary bg-white bg-opacity-40 text-primary font-mono text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:bg-opacity-70 transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
