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
    <>
      <h1 className="text-3xl text-center">
        Welcome To <span className="text-rose-500 tracking-widest">PITA!</span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
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
      <hr className="my-4" />
      <div className="flex justify-center">
        <button
          onClick={() => signIn("yandex", { callbackUrl: "/dashboard" })}
          disabled={pending}
        >
          <svg
            className="w-6 h-6 scale-150 bg-[#FC3F1D] rounded-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SignIn;
