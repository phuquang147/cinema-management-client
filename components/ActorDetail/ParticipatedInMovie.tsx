import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MovieOfActor } from "~/interfaces/actor.interface";

type ParticipatedInMovieProps = {
  movie: MovieOfActor;
};

const ParticipatedInMovie: FC<ParticipatedInMovieProps> = ({ movie }) => {
  return (
    <Link href={`/phim/${movie.slug}`}>
      <div className="bg-light-gray-bg dark:bg-dark-bg-secondary flex items-center gap-4 p-2 rounded">
        <div className="relative h-10 w-10 rounded overflow-hidden">
          <Image src={movie.thumbnail} alt="" fill objectFit="cover" />
        </div>
        <p className="text-base font-semibold text-gray-text dark:text-light-text">
          {movie.name}
        </p>
      </div>
    </Link>
  );
};

export default ParticipatedInMovie;
