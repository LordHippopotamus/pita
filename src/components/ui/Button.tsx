export type ButtonProps = {
  className?: string;
  variant?: "contained" | "text";
  children: React.ReactNode;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  variant = "contained",
  disabled = false,
  className = "",
  ...rest
}: ButtonProps) => {
  if (variant === "text")
    return (
      <button
        disabled={disabled}
        className={`transition py-2 px-6 rounded-md ${
          disabled
            ? "text-rose-300"
            : "text-rose-500 hover:bg-rose-50 active:bg-rose-100"
        } ${className}`}
        {...rest}
      >
        {children}
      </button>
    );

  return (
    <button
      disabled={disabled}
      className={`transition py-2 px-6 rounded-md ${
        disabled
          ? "bg-rose-200 text-rose-700"
          : "text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
