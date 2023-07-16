import "@splidejs/react-splide/css/core";
import { IconStar } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import IMovie from "~/interfaces/movie.interface";

interface MovieProps {
  movie: IMovie;
  className?: string;
}

const Movie: React.FC<MovieProps> = ({ movie, className }) => {
  return (
    <div className={className}>
      <Link href={`/phim/${movie.slug}`}>
        <div className="group rounded-xl relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={movie.thumbnail}
            alt=""
            fill
            objectFit="cover"
            className="rounded group-hover:scale-105 transition-transform duration-500"
          />
          <div className="scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 flex items-center absolute top-4 right-4 px-2 py-1 rounded bg-black bg-opacity-80">
            <IconStar className="h-4 w-4 text-primary" />
            <span className="text-gray-200 ml-1 font-bold text-sm">
              {movie.totalScore > 0
                ? (movie.totalScore / movie.reviews.length).toFixed(1)
                : 0}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 w-full group-hover:h-full flex items-end bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent transition-all duration-500">
            <p className="w-full py-4 px-6 font-semibold text-white text-xl group-hover:text-primary transition-colors duration-200 line-clamp-1">
              {movie.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
