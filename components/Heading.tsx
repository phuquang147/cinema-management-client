import Image from "next/image";
import headingBg from "~/assets/images/heading-bg.jpg";
import Divider from "./UI/Divider";

interface HeadingProps {
  content: string;
}

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return (
    <div>
      <div className="w-full h-44 relative">
        <Image src={headingBg} alt="" fill objectFit="cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 dark:bg-opacity-70 z-10 flex justify-center items-center">
          <div className="container mx-auto">
            <p className="uppercase text-white text-3xl font-bold text-center">
              {content}
            </p>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Heading;
