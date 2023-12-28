"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Button } from "@/components/ui";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md flex justify-between items-center p-4">
      <Link href="/">
        <h4 className="text-2xl tracking-widest hover:text-rose-500 active:text-rose-700 transition">
          PITA
        </h4>
      </Link>

      {session ? (
        <div className="leading-3 relative">
          <Menu>
            <Menu.Button className="transition rounded-full hover:text-rose-500 active:text-rose-700">
              <UserCircleIcon className="w-8" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-75 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-75 opacity-0"
            >
              <Menu.Items className="absolute w-max right-0 bg-white shadow-md p-1 rounded-md flex flex-col gap-1">
                <Menu.Item>
                  <button
                    onClick={() => signOut({ redirect: false })}
                    className="px-6 py-4 hover:bg-rose-50 active:bg-rose-100 rounded-md transition"
                  >
                    Sign Out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <Link href="/auth/signin">
          <Button>Sign In</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
