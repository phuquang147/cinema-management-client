import YouTube, { YouTubeProps } from "react-youtube";
import SectionHeading from "../UI/SectionHeading";

type MovieTrailerProps = {
  id: string;
};

const MovieTrailer: React.FC<MovieTrailerProps> = ({ id }) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="mt-10">
      <SectionHeading text="Trailer" />
      <div className="w-full mx-auto mt-6">
        <YouTube
          videoId={id}
          opts={opts}
          onReady={onPlayerReady}
          className="mx-auto h-full"
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
