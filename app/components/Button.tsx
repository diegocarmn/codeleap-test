import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {

  const baseStyles = "px-8 py-1 rounded rounded-lg font-bold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-gray";

  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
