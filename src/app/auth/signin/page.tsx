"use client";

import { Input, Button } from "@/components/ui";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setPending(true);
    await signIn("email", {
      email: formData.get("email"),
      callbackUrl: window.location.origin,
    });
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h1 className="text-3xl text-center">
        Welcome To <span className="text-rose-500 tracking-widest">PITA!</span>
      </h1>
      <label className="flex flex-col">
        <Input name="email" type="email" placeholder="Email" required />
        <span className="text-sm">
          The confirmation link will be sent to this address.
        </span>
      </label>
      <Button type="submit" disabled={pending} className="self-center">
        Sign In
      </Button>
    </form>
  );
};

export default SignIn;
