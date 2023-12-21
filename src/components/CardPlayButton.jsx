import { Play, Pause } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id, size = "small" }) {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    const res = await fetch(`/api/get-info-playlist.json?id=${id}`);
    const data = await res.json();

    const { songs, playlist } = data;

    setCurrentMusic({
      playlist,
      songs,
      song: songs[0],
    });
    setIsPlaying(true);
  };

  return (
    <button
      className="bg-green-400 rounded-full w-10 w- h-10 flex justify-around items-center text-black transition hover:scale-110  "
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
