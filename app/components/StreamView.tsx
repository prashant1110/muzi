"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, ChevronDown, Play, Share2, House } from "lucide-react";
import axios from "axios";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { YT_REGEX } from "@/lib/util";
//@ts-ignore
import YouTubePlayer from "youtube-player";
import { useRouter } from "next/navigation";

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

const StreamView = ({
  creatorId,
  playVideo = false,
}: {
  creatorId: string;
  playVideo: boolean;
}) => {
  const [videoLink, setVideoLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [playNextLoading, setPlayNextLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState<string>("");
  const videoPlayerRef = useRef<HTMLDivElement>();
  const router=useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink) return;
    setLoading(true);
    const res = await fetch("/api/stream", {
      method: "POST",
      body: JSON.stringify({
        creatorId: creatorId,
        url: videoLink,
      }),
    });

    setQueue([...queue, await res.json()]);
    setLoading(false);
    setVideoLink("");
  };

  const handleVote = (id: string, isUpVoted: Boolean) => {
    setQueue(
      queue
        .map((item) =>
          item.id === id
            ? {
                ...item,
                upvotes: isUpVoted ? item.upvotes + 1 : item.upvotes - 1,
                isUpVoted: !item.isUpVoted,
              }
            : item
        )
        .sort((a, b) => b.upvotes - a.upvotes)
    );

    fetch(`/api/stream/${isUpVoted ? "upvote" : "downvote"}`, {
      method: "POST",
      body: JSON.stringify({
        streamId: id,
      }),
    });
  };

  async function fetchStream() {
    const res = await axios.get(`/api/stream/?creatorId=${creatorId}`, {
      withCredentials: true,
    });
    setQueue(
      res?.data?.stream.sort((a: any, b: any) =>
        a.upvotes < b.upvotes ? 1 : -1
      )
    );
    setCurrentVideo((video) => {
      if (video?.id === res.data.activeStream?.stream?.id) {
        return video;
      }
      return res.data.activeStream.stream;
    });
  }

  useEffect(() => {
    fetchStream();

    setInterval(() => {
      fetchStream();
    }, 10000);
  }, []);

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  useEffect(() => {
    if (!videoPlayerRef.current || !currentVideo) {
      return;
    }
    let player = YouTubePlayer(videoPlayerRef.current);

    // 'loadVideoById' is queued until the player is ready to receive API calls.
    player.loadVideoById(currentVideo.extractedId);

    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
    player.playVideo();
    function eventHandler(event: any) {
      if (event.data === 0) {
        playNext();
      }
    }
    player.on("stateChange", eventHandler);
    return () => {
      player.destroy();
    };
  }, [currentVideo, videoPlayerRef]);

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

  const playNext = async () => {
    try {
      setPlayNextLoading(true);
      const data = await fetch("/api/stream/next", {
        method: "GET",
      });
      const res = await data.json();
      setCurrentVideo(res.stream);
      setPlayNextLoading(false);
      setQueue((q) => q.filter((x) => x.id !== res.stream.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-center mb-8">Song Voting</h1>
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
        </div>

        {/* Video submission form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter YouTube video link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/50"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Add to Queue"}
          </Button>
        </form>

        {/* Video preview */}
        {videoLink && videoLink.match(YT_REGEX) && !loading && (
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Preview:</h2>
              <LiteYouTubeEmbed title="" id={videoLink.split("?v=")[1]} />
            </CardContent>
          </Card>
        )}
        {/* Current video player */}
        <div className="aspect-video">
          <h2 className="text-2xl font-bold text-white mb-2">Now Playing</h2>
          {currentVideo ? (
            <>
            {/*@ts-ignore*/}
              <div ref={videoPlayerRef} className="w-full" />
            </>
          ) : (
            <p className="">No Video playing</p>
          )}
        </div>

        {playVideo && (
          <Button
            onClick={playNext}
            className="mt-4"
            disabled={playNextLoading}
          >
            {playNextLoading ? "Loading" : "Play next song"}
          </Button>
        )}

        {/* Queue */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Upcoming Songs</h2>
          {queue.map((item) => (
            <Card key={item.id} className="bg-white/10 border-white/20">
              <CardContent className="p-4 flex items-center space-x-4 text-white">
                <img
                  src={item.smallImg}
                  alt={item.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleVote(item.id, item.isUpVoted ? false : true)
                    }
                  >
                    {item.isUpVoted ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>

                  <span>{item.upvotes}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentVideo(item)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamView;
