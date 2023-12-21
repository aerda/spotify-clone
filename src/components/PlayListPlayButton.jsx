import { useState } from "react";
import { Play, Pause } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function PlayListPlayButton({ trackNumber, playlistId, song }) {
  const [isHover, setIsHover] = useState(false);
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingSong =
    isPlaying &&
    currentMusic?.playlist?.id === playlistId &&
    currentMusic?.song.id == song.id;

  const handleClick = async () => {
    if (isPlayingSong) {
      setIsPlaying(false);
      return;
    }

    const res = await fetch(`/api/get-info-playlist.json?id=${playlistId}`);
    const data = await res.json();

    const { songs, playlist } = data;

    setCurrentMusic({
      playlist,
      songs,
      song: songs[trackNumber],
    });
    setIsPlaying(true);
  };

  return (
    <button
      className="text-white w-8 h-8 flex justify-center items-center"
      onClick={handleClick}
      onMouseEnter={() => setIsHover(!isHover)}
      onMouseLeave={() => setIsHover(!isHover)}
    >
      {!isPlayingSong ? (
        isHover ? (
          <Play />
        ) : (
          trackNumber
        )
      ) : isHover ? (
        <Pause />
      ) : (
        <Play />
      )}
    </button>
  );
}
