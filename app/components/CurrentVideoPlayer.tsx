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
  playNext,
}: {
  isAdmin: boolean;
  currentVideo: Video | null;
  videoPlayerRef: React.MutableRefObject<HTMLDivElement | undefined>;
  playNextLoading: boolean;
  playNext: () => void;
}) => {

  return (
    <div className="aspect-video">
      <h2 className="text-2xl font-bold text-black mb-2">Now Playing</h2>
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
        <>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAACUCAMAAAB4Mk+VAAAAHlBMVEX09PTa2tr39/fx8fHs7Ozk5OTh4eHd3d3o6OjX19fYd+IaAAADMElEQVR4nO2a67LqIAxGgUCg7//COwFa2ypezlE7jd/6se0edYZlIISLcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGCQoRzfia4QuHBzFwvHo5nwPjTGVlP3kvbfuHeY/FBP7SZV9ztmXg9v1eUi6dRLTC/pPOrpZn0I7dYwyktlLx87+Ys4sj0xHN/DtaOaSGJfUlHvHbq+civwY+kiGMnpL1lGNq+i6c3MS4R5kfSva8G6pazFuQe6PWYJMq34dWL0Pa+ob0SDzJnfdNm6EJG+ZSOgx18y1mE+1X5PrZdnOPOgATxb6OfEynMWfC7l7pah4ZyMTWWrZWpNXdb7/aaoJ/Tst+yzqnci559YbQQeFhYQeymbEhkdw9Z45suX/R/XmnsTSQ0quE/rCabt8kITuc3um6Wo6e8R5azdN6L30/ClvpxNZK8F+y/tSgql3fjzGZ/KpvTWxZa6P6s2PU3qHTu6tpefi3X+BJ75WE+KJvWsJ1vYSqjeFmGRtJvSXmyQ6vbeTNUkrwWZvr8uTmuMGiU7eteHt994KX69OZ7IFb576JunGW1ddcWRuwVsSel9brr1TPS0YiZvwjnNiu3hnT3X/KfCVcV2rW/B2brrprYS02WHMie3EW9fUbbNw7d03Dzfx1qzPhrznCn3tzWE3vnP/bVh7gA3vIvNxCft8Lj09rsKdcy/isyXvmtC383fenYzN24nRjDf1xLarW7bwbNjqOQPeLkxtk/SeN68ESzYRbxd8S2xj7ylvPp9MxDvMCX3svd8yZwverVItd7yvjwJlKj+/t6unXtfe01DbkYV4O9JCZeutFxuKXneYRge/BrydztW0jbeWKa1uGRwLWfDmWpGvvbndZ4rjezwWvJMM5RK6dxHrOcaBhqf8FrzrEjws8eaVzlDMmLfUoWUsu/6OAe96nB9e2T834d3OPuLl5OQZDHi3Wy51Yf1b3q407RfOiax45xbxp2+fWqhTtdMK9f7e+ExsjwVv0tuJdGvD4T5n91bCb913uPAv3ke3+S3Elzm6xe/BQqcFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Hv8Aa6uGaPiKDUOAAAAAElFTkSuQmCC"
            style={{ height: "100%" }}
            className="h-60 w-full rounded object-cover"
          />
          <p className="mt-2 text-center font-semibold">No Video Playing</p>
        </>
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
