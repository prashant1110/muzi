import { Button } from "@/components/ui/button";
import { House, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Title = ({
  currentURL,
  spaceId,
}: {
  currentURL: string;
  spaceId: string | string[];
}) => {
  const router = useRouter();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      toast.success("URL Copied!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Copy failed");
    }
  };

  return (
    <div className="flex justify-between flex-wrap gap-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-black">
        Song Voting
      </h1>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            router.push("/");
          }}
          aria-label="Share this page"
          className="flex items-center space-x-2"
        >
          <House className="h-4 w-4" />
        </Button>
        <Button
          onClick={copyToClipboard}
          aria-label="Share this page"
          className="flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
          <ToastContainer />
        </Button>
      </div>
      <h1 className="text-black">Room Id: {spaceId}</h1>
    </div>
  );
};

export default Title;
