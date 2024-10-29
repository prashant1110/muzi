"use client"
import { useParams } from "next/navigation";
import StreamView from "../../components/StreamView";

export default function Component() {

  const params=useParams()

  return <StreamView  spaceId={params.spaceId}/>;
}
