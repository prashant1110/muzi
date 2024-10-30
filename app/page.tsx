import Link from "next/link";
import { Button } from "@/components/ui/button";
//@ts-ignore
import { Users, Radio, Headphones } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Redirect from "./components/Redirect";
import { CreateDialog } from "./components/CreateDialog";
import Spaces from "./components/Spaces";

export default async function Home() {
  return (
    <div className="grid h-screen w-full md:grid-cols-2">
      {/* <Redirect/> */}
      <main className="py-12 md:py-24 lg:py-32 flex h-full w-full items-center justify-center bg-black">
        <div className=" px-4 md:px-6 basis-1/2 ">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tighter text-white sm:text-4xl md:text-2xl lg:text-4xl/none">
                Let Your Fans Choose the Beat
              </h1>
              <p className="mx-auto max-w-[500px] text-gray-400 md:text-lg">
                Empower your audience to curate your music stream. Connect with
                fans like never before.
              </p>
            </div>
            <div className="space-x-4">
              <CreateDialog title={"Create Group"} type={"create"} />
              <CreateDialog title={"Join Group"} type={"join"} />
            </div>
          </div>
        </div>
      </main>
      <div className="flex h-full w-full items-center justify-center">
        <Spaces />
      </div>
    </div>
  );
}
