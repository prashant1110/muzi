import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { debounce } from "lodash";

const SubmissionForm = ({
  handleSubmit,
  videoLink,
  setVideoLink,
  loading,
}: {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  videoLink: string;
  setVideoLink: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchYouTubeSuggestions = async (searchTerm: any) => {
    if (searchTerm) {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 10,
              q: searchTerm,
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        );
        setSuggestions(response.data.items); // Set the video suggestions
      } catch (error) {
        console.error("Error fetching YouTube suggestions:", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions when search term is empty
    }
  };

  const handleChange = (e: any) => {
    const searchTerm = e.target.value;
    setVideoLink(searchTerm);
    debouncedFetch(searchTerm);
  };

  const debouncedFetch = useCallback(
    debounce((searchTerm: string) => {
      fetchYouTubeSuggestions(searchTerm);
    }, 300), // 300 ms delay
    []
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter YouTube video link"
          value={videoLink}
          onChange={handleChange}
          className="bg-black/10 border-black/20 text-black placeholder-white/50"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 shadow-lg max-w-screen-2xl max-h-72 overflow-y-auto p-0 m-0 list-none z-10">
            {suggestions.map((item: any) => (
              <li
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                key={item.id.videoId}
                onClick={() => {
                  setVideoLink(
                    `https://www.youtube.com/watch?v=${item?.id.videoId}`
                  );
                  setSuggestions([]);
                }}
              >
                <img
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                  className="w-10 h-10 mr-3 rounded"
                />
                <span className="text-sm text-gray-700">
                  {item.snippet.title}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Add to Queue"}
        </Button>
      </form>
    </div>
  );
};

export default SubmissionForm;
