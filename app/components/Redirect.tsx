"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
      return;
    }
    if (session.status === "authenticated") {
      router.push("/");
      return;
    }
  }, [session]);

  return null;
};

export default Redirect;
