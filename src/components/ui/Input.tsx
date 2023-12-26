const Input = ({
  className = "",
  ...rest
}: { className?: string } & React.ComponentPropsWithoutRef<"input">) => (
  <input
    className={`border border-slate-300 rounded-md p-2 focus:outline outline-rose-500 bg-transparent ${className}`}
    {...rest}
  />
);

export default Input;
