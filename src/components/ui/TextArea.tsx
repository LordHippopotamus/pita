const TextArea = ({
  className = "",
  ...rest
}: { className?: string } & React.ComponentPropsWithoutRef<"textarea">) => (
  <textarea
    className={
      "border border-slate-300 rounded-md p-2 focus:outline outline-rose-500 " +
      className
    }
    {...rest}
  />
);

export default TextArea;
