"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../utils/fetchUser";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const Spaces = () => {
  const session = useSession();
  const [user, setUser] = useState<any>();
  const [space, setSpace] = useState<any>([]);
  const router = useRouter();

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

  useEffect(() => {
    const fetchSpace = async () => {
      const res = await fetch(`/api/me/space?creatorId=${user?.user?.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setSpace(data.space);
    };

    fetchSpace();
  }, [user]);

  function formatDate(date: Date) {
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
    return formattedDate;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] md:w-[200px]">Name</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Cretaed At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {space?.map((s: any) => (
          <TableRow
            key={s.id}
            onClick={() => router.push(`/dashboard/${s.id}`)}
            style={{ cursor: "pointer" }}
          >
            <TableCell className="font-medium">{s.name}</TableCell>
            <TableCell>{s.id}</TableCell>
            <TableCell>{formatDate(s.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Spaces;
