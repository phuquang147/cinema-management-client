import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import dayjs from "dayjs";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MovieComments from "~/components/MovieDetail/MovieComments";
import MovieContent from "~/components/MovieDetail/MovieContent";
import MovieGallery from "~/components/MovieDetail/MovieGallery";
import MovieReviews from "~/components/MovieDetail/MovieReviews";
import MovieTrailer from "~/components/MovieDetail/MovieTrailer";
import Movies from "~/components/Movies";
import QuickBooking from "~/components/QuickBooking";
import Tabs from "~/components/Tabs";
import Divider from "~/components/UI/Divider";
import IActor from "~/interfaces/actor.interface";
import IMovie from "~/interfaces/movie.interface";
import MovieServices from "~/services/movieServices";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await MovieServices.getMovieBySlug(
    context.query.slug as string
  );

  return {
    props: data,
  };
};

const tabs = ["Thông tin", "Bộ ảnh", "Review", "Bình luận"];

const Movie: NextPage = ({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <Head>
        <title>{movie.name}</title>
      </Head>
      <div className="bg-light-bg-primary dark:bg-dark-bg-primary relative">
        <div className="relative w-full">
          <Image
            src={movie.thumbnail}
            alt=""
            fill
            objectFit="cover"
            className="hidden dark:block"
          />
          <div className="hidden dark:block absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.8)] z-10"></div>
          <div className="container mx-auto py-20 flex flex-col lg:flex-row gap-10">
            <div className="relative w-full md:w-[300px] h-[400px] mx-auto z-20 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={movie.thumbnail}
                alt=""
                sizes=""
                fill
                objectFit="cover"
                className="z-20"
              />
            </div>
            <div className="flex-1 z-20">
              <h1 className="text-gray-text dark:text-white text-5xl font-bold leading-[60px] break-words">
                {movie.name}
              </h1>
              <p className="mt-4">
                <span className="font-bold text-gray-text dark:text-white">
                  Năm sản xuất:
                </span>
                <span className="ml-2 text-gray-text dark:text-white">
                  2023
                </span>
              </p>
              <p className="mt-2">
                <span className="font-bold text-gray-text dark:text-white">
                  Thời lượng:
                </span>
                <span className="ml-2 text-gray-text dark:text-white">
                  {movie.duration} phút
                </span>
              </p>
              <p className="mt-2">
                <span className="font-bold text-gray-text dark:text-white">
                  Ngày khởi chiếu:
                </span>
                <span className="ml-2 text-gray-text dark:text-white">
                  {dayjs(movie.premiereDay).format("DD/MM/YYYY")}
                </span>
              </p>
              <div className="flex gap-4 flex-wrap mt-8">
                {(movie as IMovie).genres.map((genre) => (
                  <Link
                    href={`/the-loai-phim?genre=${genre.name}`}
                    as={"/the-loai-phim"}
                    key={genre.id}
                    className="px-4 py-1 text-gray-text dark:text-white border-2 border-gray-500 dark:border-gray-200 rounded-full hover:text-primary hover:border-primary transition-colors duration-200"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
              <Splide
                options={{
                  rewind: false,
                  pagination: false,
                  gap: 16,
                  perPage: 6,
                  breakpoints: {
                    640: {
                      perPage: 3,
                    },
                    1024: {
                      perPage: 4,
                    },
                  },
                }}
                hasTrack={false}
                className="w-full z-10 mt-8"
              >
                <div className="splide__arrows w-full h-full flex justify-between items-center absolute bg-transparent top-0">
                  <button className="splide__arrow splide__arrow--prev h-10 w-10 text-primary hover:bg-black hover:bg-opacity-40 p-2 transition-colors duration-200 z-10">
                    <IconChevronLeft />
                  </button>
                  <button className="splide__arrow splide__arrow--next h-10 w-10 text-primary hover:bg-black hover:bg-opacity-40 p-2 transition-colors duration-200 z-10">
                    <IconChevronRight />
                  </button>
                </div>

                <SplideTrack>
                  {movie.actors.map((actor: IActor) => (
                    <SplideSlide key={actor._id}>
                      <div className="w-full relative">
                        <div className="relative aspect-[3/4] w-full rounded overflow-hidden">
                          <Image
                            src={actor.avatar}
                            alt=""
                            fill
                            objectFit="cover"
                          />
                        </div>
                        <Link
                          href={`/dien-vien/${actor.slug}`}
                          className="absolute bottom-0 w-full bg-black py-1 px-2 bg-opacity-50 line-clamp-1 text-white hover:text-primary transition-colors duration-200 rounded-b"
                        >
                          {actor.name}
                        </Link>
                      </div>
                    </SplideSlide>
                  ))}
                </SplideTrack>
              </Splide>
            </div>
          </div>
        </div>
        <Divider />
        <div className="container mx-auto grid grid-cols-12 gap-10">
          <div className="col-span-8">
            <Tabs
              tabs={tabs}
              activeIndex={activeTab}
              setActiveTab={handleChangeTab}
            />
            <div className="mt-8">
              {activeTab === 0 ? (
                <div>
                  <MovieContent content={movie.description} />
                  <MovieTrailer id={(movie as IMovie).trailer} />
                </div>
              ) : null}
              {activeTab === 1 && (
                <MovieGallery images={(movie as IMovie).images} />
              )}
              {activeTab === 2 && (
                <MovieReviews reviews={(movie as IMovie).reviews} />
              )}
              {activeTab === 3 && <MovieComments movie={movie} />}
            </div>
          </div>
          <div className="col-span-4">
            <QuickBooking />
          </div>
        </div>
        <div className="container mx-auto">
          <Movies type="slide" />
        </div>
      </div>
    </>
  );
};

export default Movie;
