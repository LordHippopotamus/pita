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
      <div className="flex justify-center gap-2">
        <button
          onClick={() => signIn("yandex", { callbackUrl: "/dashboard" })}
          disabled={pending}
        >
          <svg
            className="w-8 h-8 bg-[#FC3F1D] rounded-md"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
              fill="#fff"
            />
          </svg>
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          disabled={pending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 rounded-md"
            viewBox="0 0 24 24"
          >
            <path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SignIn;
