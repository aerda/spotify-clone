import React, { useEffect, useRef, useState } from "react";
import { Slider } from "./Slider";
import { usePlayerStore } from "@/store/playerStore";

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
  VolumeX,
  Maximize2,
} from "react-feather";

export const Play = ({ classes }) => (
  <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z"></path>
  </svg>
);

export const Pause = ({ classes }) => (
  <svg viewBox="0 0 16 16" height="20" width="20" fill="currentColor">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

const CurrentSong = ({ song: { title, artists, image } }) => (
  <div className="flex items-center gap-5 relative overflow-hidden ">
    <picture className="h-16 w-16 flex-none">
      <img
        src={image}
        alt="cover"
        className="object-cover rounded-md w-full h-full"
      />
    </picture>
    <div
      className="flex flex-auto 
       flex-col"
    >
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className="text-xs text-gray-400">{artists.join(",")}</div>
    </div>
  </div>
);

const formatSongTime = (currentTime) => {
  let duration = "0:00";
  if (currentTime !== 0) {
    let seconds = Math.floor(currentTime % 60);
    duration = `${Math.floor(currentTime / 60)}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return duration;
};

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState("0:00");

  const handleTimeUpdate = () => {
    const newTime = formatSongTime(audio.currentTime);
    setCurrentTime(newTime);
  };

  useEffect(() => {
    let audioEvent;
    if (audio)
      audioEvent = audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex flex-1 gap-2 justify-between">
      <div className="text-xs text-gray-400">{audio && currentTime}</div>
      <Slider
        defaultValue={[0]}
        max={audio.duration}
        min={0}
        className="w-64"
        step={1}
        value={[currentTime]}
        onValueChange={(value) => {
          const [newTime] = value;
          audio.currentTime = newTime;
          setCurrentTime(newTime);
        }}
      />
      <div className="text-xs text-gray-400">
        {audio.duration ? formatSongTime(audio.duration) : null}
      </div>
    </div>
  );
};

const VolumeController = () => {
  const { volume, setVolume } = usePlayerStore((state) => state);
  const previousVolumeRef = useRef(volume);

  const isMuted = volume < 0.1;

  const handleClick = () => {
    if (isMuted) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <>
      <button
        className="opacity-70 hover:opacity-100 transition-all"
        onClick={handleClick}
      >
        {isMuted ? <VolumeX /> : <Volume1 />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className="w-[95px]"
        step={1}
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </>
  );
};

const Player = () => {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state,
  );
  let volumeRef = useRef(1);
  const audioRef = useRef();

  const { song, playlist } = currentMusic;

  // Start Stops
  useEffect(() => {
    if (song) {
      setTimeout(() => {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      }, 10);
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (song) {
      const musicUrl = `/music/${playlist?.id}/0${song?.id}.mp3`;
      audioRef.current.src = musicUrl;
      audioRef.current.volume = volumeRef.current;
      audioRef.current.play();
    }
  }, [song]);

  const handleClick = () => {
    if (song) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-1 justify-between h-full w-full px-4 z-30 ">
      <div className="w-56">{song && <CurrentSong song={song} />}</div>
      <div className="flex flex-col items-center justify-around">
        <div className="flex gap-1 justify-evenly w-56">
          <Shuffle className="text-gray-700" />
          <ChevronLeft className="text-gray-700" />
          <button
            onClick={handleClick}
            className="text-gray-300 hover:text-white transition-allR"
          >
            {isPlaying ? <PauseCircle /> : <PlayCircle />}
          </button>
          <ChevronRight className="text-gray-700" />
          <Repeat className="text-gray-700" />
        </div>
        <div className=" w-72  ">
          {song && <SongControl audio={audioRef?.current} />}
        </div>
      </div>
      <div className="flex items-center justify-around gap-3">
        <Youtube className="text-gray-700" />
        <Mic className="text-gray-700" />
        <Layers className="text-gray-700" />
        <Cast className="text-gray-700" />
        <VolumeController />
        <Maximize2 className="text-gray-700" />
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
