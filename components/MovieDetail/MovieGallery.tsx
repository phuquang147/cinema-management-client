import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { FC, useState } from "react";

type MovieGalleryProps = {
  images: string[];
};

const MovieGallery: FC<MovieGalleryProps> = ({ images }) => {
  const [toggler, setToggler] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(1);

  return (
    <div>
      <div className="w-full columns-3">
        {images.map((image, index) => (
          <div
            key={image}
            className="relative w-full aspect-[5/3] rounded-xl overflow-hidden"
            onClick={() => {
              setSlideIndex(index + 1);
              setToggler(true);
            }}
          >
            <Image src={image} alt="" fill objectFit="cover" />
          </div>
        ))}
      </div>
      <FsLightbox
        toggler={toggler}
        sources={images}
        slide={slideIndex}
        onClose={() => {
          setToggler(false);
        }}
      />
    </div>
  );
};

export default MovieGallery;
