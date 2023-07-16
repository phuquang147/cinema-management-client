import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IShowTime from "~/interfaces/showTime.interface";
import { useAppDispatch } from "~/redux/hooks";
import { selectShowTime } from "~/redux/slices/BookingSlice";
import { MappedShowTime } from "~/redux/slices/ShowTimeSlice";

type ShowTimeProps = {
  showTime: MappedShowTime;
};

const ShowTime: React.FC<ShowTimeProps> = ({ showTime }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelectShowTime = (showTime: IShowTime) => {
    dispatch(selectShowTime(showTime));
    router.push("/dat-ve");
  };

  return (
    <div className="bg-light-gray-bg dark:bg-dark-bg-secondary rounded-xl overflow-hidden p-6 flex flex-col gap-4 shadow-sm">
      <div className="w-full aspect-[5/3] relative bg-slate-100 rounded-lg overflow-hidden">
        <Image src={showTime.thumbnail} alt="" fill objectFit="cover" />
      </div>
      <div className="flex-1">
        <Link
          href="/"
          className="font-bold line-clamp-1 text-gray-text dark:text-light-text hover:text-primary transition-colors duration-200"
        >
          {showTime.name}
        </Link>
        <div className="flex gap-3 flex-wrap mt-4">
          {showTime.showTimes.map((time: IShowTime) => (
            <div
              key={time._id}
              className="px-3 py-2 text-sm text-gray-text dark:text-light-text border border-gray-400 hover:border-primary hover:bg-primary hover:text-white dark:hover:text-white transition-colors duration-200 rounded-md cursor-pointer"
              onClick={() => handleSelectShowTime(time)}
            >
              {time.startTime.slice(11, 16)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowTime;
