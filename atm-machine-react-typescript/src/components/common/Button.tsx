import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200 tracking-widest text-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-primary uppercase";
  const variantStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-secondary text-primary bg-opacity-80 hover:from-secondary hover:to-primary hover:text-secondary"
      : "bg-white bg-opacity-30 text-primary border-primary hover:bg-opacity-60";
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
