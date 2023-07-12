import Image from "next/image";
import { FC, useState } from "react";
import LightBox from "../LightBox";

type MovieGalleryProps = {
  images: string[];
};

const MovieGallery: FC<MovieGalleryProps> = ({ images }) => {
  const [showLightBox, setShowLightBox] = useState<boolean>(false);
  const [slideNumber, setSlideNumber] = useState<number>(1);

  return (
    <div>
      <div className="w-full columns-3">
        {images.map((image, index) => (
          <div
            key={image}
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden"
            onClick={() => {
              setSlideNumber(index + 1);
              setShowLightBox(true);
            }}
          >
            <Image src={image} alt="" fill objectFit="cover" />
          </div>
        ))}
      </div>
      <LightBox
        showLightBox={showLightBox}
        slideNumber={slideNumber}
        sources={images}
        onClose={() => {
          setShowLightBox(false);
        }}
      />
    </div>
  );
};

export default MovieGallery;
