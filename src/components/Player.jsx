import React, { useEffect, useRef, useState } from "react";
import SideMenuCard from "./SideMenuCard.astro";
// import { Song } from "@/lib/data";

import {
  PlayCircle,
  PauseCircle,
  ChevronRight,
  ChevronLeft,
  Repeat,
  Shuffle,
  Youtube,
  Mic,
  Layers,
  Cast,
  Volume1,
  Maximize2,
} from "react-feather";

const Player = (song) => {
  // { id, title, image, artists }
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef();

  // wil be change
  useEffect(() => {
    audioRef.current.src = `/music/1/01.mp3`;
  }, []);

  const handleClick = () => {
    // trigger async
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }
    audioRef.current.play();
    audioRef.current.volume = 0.8;
  };

  return (
    <div className="flex flex-1 justify-between h-full w-full px-4 z-30 text-red-300">
      <div>{/* <SideMenuCard playlist={{}} /> */}</div>
      <div className="flex flex-col items-center justify-around bg-black">
        <div className="flex gap-4">
          <Shuffle />
          <ChevronLeft />
          <div onClick={handleClick}>
            {isPlaying ? <PauseCircle /> : <PlayCircle />}
          </div>
          <ChevronRight />
          <Repeat />
        </div>
        <div>
          <span>0:00</span>
          <span></span>
          <span>0:00</span>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <Youtube />
        <Mic />
        <Layers />
        <Cast />
        <Volume1 />
        <Maximize2 />
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
