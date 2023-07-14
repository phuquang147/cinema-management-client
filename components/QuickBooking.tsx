import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectShowTime } from "~/redux/slices/BookingSlice";
import {
  MappedShowTime,
  getShowTimesByDate,
  setShowTimes,
} from "~/redux/slices/ShowTimeSlice";
import { getSevenDatesFromToday } from "~/utils/formatDateTime";
import Button from "./UI/Button";
import ComboBox from "./UI/ComboBox";

const MOVIE_OPTIONS = [{ label: "Chọn phim", value: "none" }];
const DATE_OPTIONS = [{ label: "Chọn ngày", value: "none" }];
const SHOWTIME_OPTIONS = [{ label: "Chọn suất chiếu", value: "none" }];

const QuickBooking: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sevenDatesFromToday = getSevenDatesFromToday();
  const { mappedShowTimes } = useAppSelector((state) => state.showTime);
  const [movie, setMovie] = useState<MappedShowTime | undefined>(undefined);
  const [showTime, setShowTime] = useState<string>("none");

  const handleChangeDate = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setShowTimes([]));
    setMovie(undefined);

    if (e.target.value !== "none") {
      const date = e.target.value.split("/")[0];
      const month = e.target.value.split("/")[1];
      const year = e.target.value.split("/")[2];

      dispatch(
        getShowTimesByDate({
          date: `${year}-${month.length === 1 ? "0" + month : month}-${
            date.length === 1 ? "0" + date : date
          }`,
        })
      );
    }
  };

  const handleChangeMovie = (e: ChangeEvent<HTMLSelectElement>) => {
    setMovie(
      mappedShowTimes.filter(
        (movieShowtimes) => movieShowtimes.name === e.target.value
      )[0]
    );
  };

  const handleChangeShowTime = (e: ChangeEvent<HTMLSelectElement>) => {
    setShowTime(e.target.value);
    const index = movie?.showTimes.findIndex(
      (showTime) => showTime._id === e.target.value
    );

    dispatch(
      selectShowTime(index && index >= 0 ? movie?.showTimes[index] : undefined)
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setShowTimes([]));
      setMovie(undefined);
      setShowTime("none");
    };
  }, []);

  return (
    <div className="w-full bg-light-gray-bg dark:bg-dark-bg-secondary p-6 flex flex-col gap-4 rounded-lg">
      <h2 className="text-gray-text dark:text-light-text text-xl font-bold">
        Đặt vé nhanh
      </h2>
      <ComboBox
        options={DATE_OPTIONS.concat(
          sevenDatesFromToday.map((date) => ({
            label: `${date.day} - ${date.date}/${date.year}`,
            value: `${date.date}/${date.year}`,
          }))
        )}
        containerClassName="col-span-4"
        className="bg-dark-bg-primary text-white"
        onChange={handleChangeDate}
      />
      <ComboBox
        options={MOVIE_OPTIONS.concat(
          mappedShowTimes.map((movieShowTimes) => ({
            label: movieShowTimes.name,
            value: movieShowTimes.name,
          }))
        )}
        containerClassName="col-span-4"
        className="bg-dark-bg-primary text-white"
        onChange={handleChangeMovie}
      />
      <ComboBox
        options={SHOWTIME_OPTIONS.concat(
          movie
            ? movie.showTimes.map((showTime) => ({
                label: showTime.startTime.slice(11, 16),
                value: showTime._id,
              }))
            : []
        )}
        containerClassName="col-span-4"
        className="bg-dark-bg-primary text-white"
        onChange={handleChangeShowTime}
      />
      <Button
        disabled={showTime === "none"}
        onClick={() => {
          router.push("/dat-ve");
        }}
      >
        Đặt vé
      </Button>
    </div>
  );
};

export default QuickBooking;
