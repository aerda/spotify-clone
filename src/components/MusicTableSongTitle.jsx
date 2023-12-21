import { useState } from "react";
import { usePlayerStore } from "@/store/playerStore";

export function MusicTableSongTitle({ playlistId, song, title }) {
  const { isPlaying, currentMusic } = usePlayerStore((state) => state);

  const isPlayingSong =
    isPlaying &&
    currentMusic?.playlist?.id === playlistId &&
    currentMusic?.song.id == song.id;

  debugger;

  return (
    <h3
      className={`text-sm ${isPlayingSong ? " text-green-400" : " text-white"}`}
    >
      {title}
    </h3>
  );
}
