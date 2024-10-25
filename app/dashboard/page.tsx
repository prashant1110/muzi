
import StreamView from "../components/StreamView";

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

const creatorId = "01e5c52b-94d1-4c53-90d0-e084234a37c9";

export default function Component() {
  return <StreamView creatorId={creatorId} />;
}
