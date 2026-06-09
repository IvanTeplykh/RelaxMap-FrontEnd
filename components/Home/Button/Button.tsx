import css from "./Button.module.css";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  className,
  text,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${css.button} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
