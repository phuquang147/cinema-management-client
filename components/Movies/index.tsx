import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import Button from "~/components/UI/Button";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getIncomingMovies, getShowingMovies } from "~/redux/slices/MovieSlice";
import Tabs from "../Tabs";
import Movie from "./Movie";

type MoviesProps = {
  type: "slide" | "grid";
};

const tabs = ["Phim đang chiếu", "Phim sắp chiếu"];

const Movies: React.FC<MoviesProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { incomingMovies, showingMovies } = useAppSelector(
    (state) => state.movie
  );
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
    if (index === 0) dispatch(getShowingMovies());
    else dispatch(getIncomingMovies());
  };

  useEffect(() => {
    dispatch(getShowingMovies());
  }, []);

  return (
    <div className="bg-light-bg-primary dark:bg-dark-bg-primary">
      <div className="mx-auto">
        {type === "slide" ? (
          <div>
            <Splide
              options={{
                rewind: true,
                type: "loop",
                pagination: false,
                gap: 40,
                perPage: 3,
                breakpoints: {
                  640: {
                    perPage: 2,
                  },
                  1024: {
                    perPage: 3,
                  },
                },
              }}
              hasTrack={false}
              onMoved={(splide, index, prev, dest) => {
                console.log(splide, index, prev, dest);
              }}
            >
              <div className="flex justify-between items-center my-6">
                <Tabs
                  tabs={tabs}
                  activeIndex={activeTab}
                  setActiveTab={handleChangeTab}
                />
                <div className="splide__arrows flex justify-end items-center gap-2">
                  <button className="splide__arrow splide__arrow--prev text-primary hover:bg-primary hover:text-white border border-primary rounded p-2 transition-colors duration-200 hover:scale-110">
                    <IconChevronLeft />
                  </button>
                  <button className="splide__arrow splide__arrow--next text-primary hover:bg-primary hover:text-white border border-primary rounded p-2 transition-colors duration-200 hover:scale-110">
                    <IconChevronRight />
                  </button>
                </div>
              </div>

              <SplideTrack>
                {(activeTab === 0 ? showingMovies : incomingMovies).map(
                  (movie) => (
                    <SplideSlide key={movie._id}>
                      <Movie movie={movie} />
                    </SplideSlide>
                  )
                )}
              </SplideTrack>
            </Splide>
            <div className="flex justify-center mt-6">
              <Button to="/phim">Xem tất cả</Button>
            </div>
          </div>
        ) : (
          <div className="py-10">
            <Tabs
              tabs={tabs}
              activeIndex={activeTab}
              setActiveTab={handleChangeTab}
            />
            <div className="grid grid-cols-12 gap-x-8 gap-y-10 mt-10">
              {(activeTab === 0 ? showingMovies : incomingMovies).map(
                (movie) => (
                  <Movie
                    key={movie._id}
                    movie={movie}
                    className="col-span-12 md:col-span-6 lg:col-span-4"
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
