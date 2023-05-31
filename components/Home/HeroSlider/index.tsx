import { Splide, SplideTrack } from "@splidejs/react-splide";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import React from "react";
import { useAppSelector } from "~/redux/hooks";
import HeroSliderItem from "./HeroSliderItem";

const HeroSlider: React.FC = () => {
  const { movies } = useAppSelector((state) => state.movie);

  return (
    <Splide
      options={{
        rewind: true,
        perPage: 1,
        type: "fade",
        pagination: false,
        autoplay: true,
        pauseOnHover: true,
      }}
      hasTrack={false}
    >
      <div className="splide__arrows w-full h-full flex justify-between items-center absolute bg-transparent top-0">
        <button className="splide__arrow splide__arrow--prev h-44 w-10 text-primary hover:bg-black hover:bg-opacity-40 p-2 transition-colors duration-200 z-10">
          <IconChevronLeft />
        </button>
        <button className="splide__arrow splide__arrow--next h-44 w-10 text-primary hover:bg-black hover:bg-opacity-40 p-2 transition-colors duration-200 z-10">
          <IconChevronRight />
        </button>
      </div>

      <SplideTrack>
        {movies.map((sliderItemData) => (
          <HeroSliderItem
            key={sliderItemData._id}
            sliderItemData={sliderItemData}
          />
        ))}
      </SplideTrack>
    </Splide>
  );
};

export default HeroSlider;
