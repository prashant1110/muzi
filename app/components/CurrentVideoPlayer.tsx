import { Button } from "@/components/ui/button";
import React from "react";

interface Video {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: string;
  userId: string;
  upvotes: number;
  isUpVoted: boolean;
}

const CurrentVideoPlayer = ({
  currentVideo,
  isAdmin,
  videoPlayerRef,
  playNextLoading,
  playNext
}: {
  isAdmin: boolean;
  currentVideo: Video | null;
  videoPlayerRef: React.MutableRefObject<HTMLDivElement | undefined>;
  playNextLoading:boolean,
  playNext:()=>void
}) => {
  return (
    <div className="aspect-video">
      <h2 className="text-2xl font-bold text-white mb-2">Now Playing</h2>
      {currentVideo ? (
        isAdmin ? (
          <>
            {/*@ts-ignore*/}
            <div ref={videoPlayerRef} className="w-full" />
          </>
        ) : (
          <>
            <img
              style={{ height: "100%" }}
              alt={currentVideo.bigImg}
              src={currentVideo.bigImg}
              className="h-72 w-full rounded object-cover"
            />
            <p className="mt-2 text-center font-semibold">
              {currentVideo.title}
            </p>
          </>
        )
      ) : (
        <p className="">No Video playing</p>
      )}

      {isAdmin && (
        <Button onClick={playNext} className="mt-4" disabled={playNextLoading}>
          {playNextLoading ? "Loading" : "Play next song"}
        </Button>
      )}
    </div>
  );
};

export default CurrentVideoPlayer;
