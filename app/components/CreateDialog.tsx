"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUser } from "../utils/fetchUser";

export function CreateDialog({ title, type }: { title: string; type: string }) {
  const router = useRouter();
  const [spaceId, setSpaceId] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState<any>();
  const session = useSession();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUser(session.data?.user?.email);

        setUser(data);
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    };

    getUser();
  }, [session]);

  const handleCreateChange = (e: any) => {
    setName(e.target.value);
  };

  const handleJoinGroupChange = (e: any) => {
    setSpaceId(e.target.value);
  };

  const joinGroup = () => {
    router.push(`/dashboard/${spaceId}`);
  };

  console.log(user?.user?.id);

  const createGroup = async () => {
    if (!user) {
      return;
    }
    const res = await fetch("/api/space", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        creatorId: user?.user?.id,
      }),
    });

    const data = await res.json();
    router.push(`/dashboard/${data?.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          {type === "join" ? "Join Group" : "Create Group"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "join" ? "Join Group" : "Create Group"}
          </DialogTitle>
          <DialogDescription>
            {type === "join"
              ? "Join group to listen to music together with friends."
              : "Create Group and share group with your friend to listen together"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id=""
              placeholder={
                type === "join" ? "Enter the group code" : "Enter the Name"
              }
              className="col-span-3"
              onChange={
                type === "join" ? handleJoinGroupChange : handleCreateChange
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={type === "join" ? joinGroup : createGroup}
          >
            {type === "join" ? "Join Group" : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
