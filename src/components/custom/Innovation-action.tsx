"use client";

import { Typography } from "@/components/ui/typography";
import { INNOVATION_VIDEO, TrophyIcon } from "@/components/icons/icons";
import { Volume2, VolumeX, PlayCircle, PauseCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function InnovationInAction() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };
  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <section className="w-full bg-brand-100 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-8 items-center">
        <div className="flex-1 flex flex-col items-center md:items-center">
          <div className="flex justify-center md:justify-center w-full mb-8">
            <div className="px-10 py-3 border border-brand-300 rounded-4xl flex items-center justify-center">
              <TrophyIcon className="text-brand-300 w-7 h-7" />
            </div>
          </div>
          <Typography
            as="h2"
            variant="h2"
            className="mb-5 text-center md:text-left text-gray-700 leading-tight"
          >
            Innovation in Action
          </Typography>
          <Typography
            as="span"
            variant="muted"
            className="max-w-sm text-center md:text-center text-gray-500"
          >
            Who knew yesterday’s plastic could become the most comfortable shoes
            of the future?{" "}
            <Typography as="span" variant="muted" className="font-semibold">
              We did.
            </Typography>
          </Typography>
        </div>
        <div className="flex-2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-xl md:-mr-20">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-2xl"
              muted={muted}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              controls={false}
              preload="metadata"
              src={INNOVATION_VIDEO}
            />
            <div className="absolute top-6 left-6 flex gap-4 z-10">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="bg-white/80 rounded-full p-2 shadow hover:bg-white"
              >
                {muted ? (
                  <VolumeX className="w-7 h-7 text-gray-700" />
                ) : (
                  <Volume2 className="w-7 h-7 text-gray-700" />
                )}
              </Button>
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="icon"
                className="bg-white/80 rounded-full p-2 shadow hover:bg-white"
              >
                {playing ? (
                  <PauseCircle className="w-7 h-7 text-gray-700" />
                ) : (
                  <PlayCircle className="w-7 h-7 text-gray-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
