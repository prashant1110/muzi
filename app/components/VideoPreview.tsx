import { Card, CardContent } from "@/components/ui/card";
import { YT_REGEX } from "@/lib/util";
import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

const VideoPreview = ({
  videoLink,
  loading,
}: {
  videoLink: string;
  loading: boolean;
}) => {
  return (
    <>
      {videoLink && videoLink.match(YT_REGEX) && !loading && (
        <Card className="bg-white/10 border-white/20 mt-4">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Preview:</h2>
            <LiteYouTubeEmbed title="" id={videoLink.split("?v=")[1]} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default VideoPreview;
