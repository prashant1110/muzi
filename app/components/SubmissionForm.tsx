import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

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
  return (
    <div>
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
    </div>
  );
};

export default SubmissionForm;
