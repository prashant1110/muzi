"use client"
import { useParams, useRouter } from "next/navigation";
import StreamView from "../../components/StreamView";
import { useSession } from "next-auth/react";

export default function Component() {
const session=useSession();
  const params=useParams();
  const router=useRouter();

  if(session.status === "unauthenticated") {
    router.push('/')
  }

  return <StreamView  spaceId={params.spaceId}/>;
}
