import { SplideSlide } from "@splidejs/react-splide";
import { IconPlayerPlay } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "~/components/UI/Button";
import Movie from "~/interfaces/movie.interface";

interface HeroSliderItemProps {
  sliderItemData: Movie;
}

const HeroSliderItem: React.FC<HeroSliderItemProps> = ({ sliderItemData }) => {
  const router = useRouter();

  return (
    <SplideSlide>
      <div className="relative min-h-[800px]">
        <Image src={sliderItemData.thumbnail} alt="" fill objectFit="cover" />
        <div className="absolute top-0 w-full h-full flex items-center bg-gradient-to-r from-[rgba(0,0,0,0.8)]">
          <div className="container mx-auto grid grid-cols-2">
            <h1 className="col-span-2 text-5xl lg:text-[80px] lg:leading-[100px] uppercase font-black text-white animate-float-top drop-shadow-text animate-fade-in">
              {sliderItemData.name}
            </h1>
            <div className="col-span-2 lg:col-span-1 text-slate-300 mt-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-8 animate-float-top py-3 border-y border-slate-500">
                <div className="flex gap-x-8">
                  <p>{sliderItemData.premiereDay.slice(0, 4)}</p>
                  <p>{`${sliderItemData.duration} phút`}</p>
                </div>
                <div className="flex gap-x-1">
                  {sliderItemData.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/the-loai-phim?genre=${genre.name}`}
                      as={"/the-loai-phim"}
                      className="border-2 px-3 py-1 rounded-full font-medium hover:border-primary hover:text-primary"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Button
                className="mt-6 flex items-center gap-x-2"
                onClick={() => router.push("/lich-chieu")}
              >
                <IconPlayerPlay />
                Đặt vé ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SplideSlide>
  );
};

export default HeroSliderItem;
