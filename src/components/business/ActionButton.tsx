"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps, default as Button } from "../ui/Button";

const SumbitButton = ({
  children,
  disabled = false,
  ...rest
}: {
  children: React.ReactNode;
} & ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} {...rest}>
      {children}
    </Button>
  );
};

export default SumbitButton;
