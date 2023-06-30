import { useState } from "react";
import ComboBox from "./UI/ComboBox";
import Button from "./UI/Button";

const MOVIE_OPTIONS = [{ label: "Chọn phim", value: "none" }];
const DATE_OPTIONS = [{ label: "Chọn ngày", value: "none" }];
const SHOWTIME_OPTIONS = [{ label: "Chọn suất chiếu", value: "none" }];

const QuickBooking: React.FC = () => {
  const [movie, setMovie] = useState();

  const handleChangeMovie = () => {};

  return (
    <div className="w-full bg-light-gray-bg dark:bg-dark-bg-secondary rounded p-6 flex flex-col gap-4">
      <h2 className="text-gray-text dark:text-light-text text-xl font-bold">
        Đặt vé nhanh
      </h2>
      <ComboBox
        options={MOVIE_OPTIONS}
        containerClassName="col-span-4"
        className="bg-dark-bg-primary text-white"
        value={movie}
        onChange={handleChangeMovie}
      />
      <ComboBox
        options={DATE_OPTIONS}
        containerClassName="col-span-4"
        className="bg-dark-bg-primary text-white"
        value={movie}
        onChange={handleChangeMovie}
      />
      <ComboBox
        options={SHOWTIME_OPTIONS}
        containerClassName="col-span-4"
        className="bg-dark-bg-primary text-white"
        value={movie}
        onChange={handleChangeMovie}
      />
      <Button>Đặt vé</Button>
    </div>
  );
};

export default QuickBooking;
