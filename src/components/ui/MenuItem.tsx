export type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  active?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  active = false,
  className = "",
  ...rest
}: ButtonProps) => (
  <button
    disabled={active}
    className={`transition py-2 px-6 rounded-md ${
      active ? "text-rose-500" : "hover:bg-rose-50 active:bg-rose-100"
    } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
