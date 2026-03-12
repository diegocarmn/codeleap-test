import { ButtonHTMLAttributes } from "react";

type IconButtonProps = {
  icon: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({
  icon,
  className = "",   
    ...props
}: IconButtonProps) {

  const baseStyles = "p-1 rounded transition-colors enabled:hover:bg-lightgray/20 disabled:cursor-not-allowed disabled:bg-transparent";
    return (
    <button
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}   

