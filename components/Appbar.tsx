"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Link from "next/link";

export function Appbar({ showThemeSwitch = true, isSpectator = false }) {
  const session = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between px-5 py-4 md:px-10 xl:px-20">
      <div
        onClick={() => {
          router.push("/home");
        }}
        className={`flex flex-col justify-center text-lg font-bold hover:cursor-pointer text-white`}
      >
        Muzer
      </div>

      {session.data?.user ? (
        <Button
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => handleLogout()}
        >
          logout
        </Button>
      ) : (
        <Button
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => signIn()}
        >
          Sign in
        </Button>
      )}
    </div>
  );
}
