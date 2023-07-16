import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Heading from "~/components/Heading";
import ShowTime from "~/components/ShowTimes/ShowTime";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getShowTimesByDate, setShowTimes } from "~/redux/slices/ShowTimeSlice";
import { getSevenDatesFromToday } from "~/utils/formatDateTime";

const ShowTimes: NextPage = () => {
  const dispatch = useAppDispatch();
  const sevenDatesFromToday = getSevenDatesFromToday();
  const [date, setDate] = useState<string>(sevenDatesFromToday[0].date);
  const { mappedShowTimes } = useAppSelector((state) => state.showTime);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeDate = (year: number, newDate: string, index: number) => {
    setActiveTab(index);
    setDate(newDate);

    dispatch(setShowTimes([]));

    const date = newDate.split("/")[0];
    const month = newDate.split("/")[1];

    dispatch(
      getShowTimesByDate({
        date: `${year}-${month.length === 1 ? "0" + month : month}-${
          date.length === 1 ? "0" + date : date
        }`,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getShowTimesByDate({ date: new Date().toISOString().slice(0, 10) })
    );
  }, []);

  return (
    <>
      <Head>
        <title>Lịch chiếu</title>
      </Head>
      <div className="min-h-fit bg-light-bg-primary dark:bg-dark-bg-primary">
        <Heading content="Lịch chiếu" />
        <div className="container mx-auto py-10">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <ul className="flex rounded w-fit overflow-hidden">
              {sevenDatesFromToday.map((day, index) => (
                <li
                  key={day.id}
                  className={`min-w-[100px] pb-[3px] bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-gradient-to-r from-light-pink to-light-red group cursor-pointer ${
                    activeTab === index &&
                    "bg-gradient-to-r from-light-pink to-light-red"
                  } `}
                  onClick={() => handleChangeDate(day.year, day.date, index)}
                >
                  <div className="bg-gray-100 dark:bg-dark-bg-secondary w-full h-full px-6 lg:px-8 py-2 lg:py-4 flex flex-col items-center">
                    <p className=" text-gray-text dark:text-light-text">
                      {day.day}
                    </p>
                    <p className="text-sm text-gray-400">{day.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {mappedShowTimes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-4">
              {mappedShowTimes.map((showTime) => (
                <ShowTime showTime={showTime} key={showTime.name} />
              ))}
            </div>
          ) : (
            <div className="w-full h-96 flex justify-center items-center">
              <p className="text-gray-text dark:text-light-text">
                Chưa có lịch chiếu
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowTimes;
