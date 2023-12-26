const Button = ({
  children,
  disabled = false,
  className = "",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<"button">) => (
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

export default Button;
