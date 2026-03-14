import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "success";

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {

  const baseStyles = "py-1 rounded rounded-lg font-bold transition-colors cursor-pointer disabled:cursor-not-allowed w-30";

  const variants = {
    primary:
      "bg-primary text-white enabled:hover:opacity-90 disabled:bg-disabled",
    secondary:
      "bg-white text-black enabled:hover:bg-lightgray/20 border border-darkgray disabled:bg-disabled disabled:text-white disabled:border-disabled",
    danger: "bg-danger text-white enabled:hover:opacity-90",
    success: "bg-success text-white enabled:hover:opacity-90",
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
