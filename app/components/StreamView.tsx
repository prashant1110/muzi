"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
//@ts-ignore
import YouTubePlayer from "youtube-player";
import { useRouter } from "next/navigation";
import { fetchSpace } from "../utils/fetchSpace";
import { fetchUser } from "../utils/fetchUser";
import { useSession } from "next-auth/react";
import Title from "./Title";
import SubmissionForm from "./SubmissionForm";
import VideoPreview from "./VideoPreview";
import CurrentVideoPlayer from "./CurrentVideoPlayer";
import UpcomingSongs from "./UpcomingSongs";
import Skeleton from "./Skeleton";

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

const StreamView = ({ spaceId }: { spaceId: string | string[] }) => {
  const [videoLink, setVideoLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [playNextLoading, setPlayNextLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState<string>("");
  const [space, setSpace] = useState<any>();
  const [user, setUser] = useState<any>();
  const videoPlayerRef = useRef<HTMLDivElement>();
  const [test, setTest] = useState(false);

  const session = useSession();
  const email = session.data?.user?.email;

  useEffect(() => {
    const getData = async () => {
      if (spaceId) {
        try {
          const data = await fetchSpace(spaceId);
          setSpace(data);
        } catch (error) {
          console.error("Error in fetching data:", error);
        }
      }
    };

    getData();
  }, [spaceId]);

  useEffect(() => {
    const getUser = async () => {
      if (spaceId) {
        try {
          const data = await fetchUser(email);

          setUser(data);
        } catch (error) {
          console.error("Error in fetching data:", error);
        }
      }
    };

    getUser();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink) return;
    setLoading(true);
    const res = await fetch("/api/stream", {
      method: "POST",
      body: JSON.stringify({
        creatorId: user?.user?.id,
        url: videoLink,
        spaceId: spaceId,
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
    setTest(true);
    const res = await axios.get(`/api/stream/?spaceId=${spaceId}`, {
      withCredentials: true,
    });
    setTest(false);
    setQueue(
      res?.data?.stream.sort((a: any, b: any) =>
        a.upvotes < b.upvotes ? 1 : -1
      )
    );
    setCurrentVideo((video) => {
      if (video?.id === res.data.activeStream?.stream?.id) {
        return video;
      }
      return res.data.activeStream?.stream;
    });
  }

  useEffect(() => {
    fetchStream();

    // setInterval(() => {
    //   fetchStream();
    // }, 10000);
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

  const playNext = async () => {
    try {
      setPlayNextLoading(true);
      const data = await fetch(`/api/stream/next?spaceId=${spaceId}`, {
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

  const isAdmin = user?.user?.id === space?.space?.creatorId;

  return (
    <div className="text-black p-8">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <Title currentURL={currentURL} spaceId={spaceId} />
        <div className="flex flex-col-reverse md:flex-row gap-4 ">
          <div className="basis-2/3">
            {/* Video submission form */}
            <SubmissionForm
              handleSubmit={handleSubmit}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
              loading={loading}
            />
            {/* Video preview */}
            <VideoPreview videoLink={videoLink} loading={loading} />
            {/* Queue */}
            {test ? (
              <div className="mt-4">
                <Skeleton />
              </div>
            ) : (
              <UpcomingSongs queue={queue} handleVote={handleVote} />
            )}
          </div>
          <div className="flex-1">
            {/* Current video player */}
            <CurrentVideoPlayer
              currentVideo={currentVideo}
              isAdmin={isAdmin}
              videoPlayerRef={videoPlayerRef}
              playNextLoading={playNextLoading}
              playNext={playNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamView;
