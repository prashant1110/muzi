"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);

  return (
    <div>
      {session.data?.user ? (
        <button onClick={()=>signOut()}>logout</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
}
