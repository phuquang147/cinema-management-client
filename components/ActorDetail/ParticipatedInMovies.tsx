import { FC } from "react";
import ParticipatedInMovie from "./ParticipatedInMovie";
import { MovieOfActor } from "~/interfaces/actor.interface";

type ParticipatedInMoviesProps = {
  movies: MovieOfActor[];
};

const ParticipatedInMovies: FC<ParticipatedInMoviesProps> = ({ movies }) => {
  return (
    <div className="flex flex-col gap-2">
      {movies.map((movie) => (
        <ParticipatedInMovie key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default ParticipatedInMovies;
