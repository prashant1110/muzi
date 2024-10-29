import { Button } from "@/components/ui/button";
import { House, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
      // toast({
      //   title: "URL Copied!",
      //   description: "The page URL has been copied to your clipboard.",
      //   duration: 3000,
      // })
    } catch (err) {
      console.error("Failed to copy: ", err);
      // toast({
      //   title: "Copy failed",
      //   description: "Unable to copy the URL. Please try again.",
      //   variant: "destructive",
      //   duration: 3000,
      // })
    }
  };

  return (
    <div className="flex justify-between flex-wrap gap-4">
      <h1 className="text-4xl font-bold text-center mb-4">Song Voting</h1>
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
        </Button>
      </div>
      <h1>Room Id: {spaceId}</h1>
    </div>
  );
};

export default Title;
