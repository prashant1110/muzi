import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
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

const UpcomingSongs = ({
  queue,
  handleVote,
}: {
  queue: Video[];
  handleVote: (id: string, isUpVoted: Boolean) => void;
}) => {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-2xl font-semibold">Upcoming Songs</h2>
      {queue.map((item) => (
        <Card key={item.id} className="bg-white/10 border-white/20">
          <CardContent className="p-4 flex items-center space-x-4 text-white flex-wrap gap-2">
            <img
              src={item.smallImg}
              alt={item.title}
              className="w-24 h-16 object-cover rounded"
            />
            <div className="flex-grow"  style={{marginLeft:0}}>
              <h3 className="font-semibold">{item.title}</h3>
            </div>
            <div className="flex items-center space-x-2" style={{marginLeft:0}}>
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
            {/* <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentVideo(item)}
                >
                  <Play className="h-4 w-4" />
                </Button> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UpcomingSongs;
