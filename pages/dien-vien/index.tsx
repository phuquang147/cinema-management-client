import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import Actor from "~/components/Actor/Actor";
import Heading from "~/components/Heading";
import QuickBooking from "~/components/QuickBooking";
import ComboBox from "~/components/UI/ComboBox";
import TextField from "~/components/UI/TextField";
import useDebounce from "~/hooks/useDebounce";
import IActor from "~/interfaces/actor.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { applyFilter, getActors } from "~/redux/slices/ActorSlice";
import { getNations } from "~/redux/slices/CommonSlice";

const NATIONS = ["Tất cả"];

const Actors: NextPage = () => {
  const dispatch = useAppDispatch();
  const { filteredActors } = useAppSelector((state) => state.actor);
  const [searchValue, setSearchValue] = useState<string>("");
  const [nation, setNation] = useState<string>("");
  const [loadedActors, setLoadedActors] = useState<IActor[]>([]);
  const { nations } = useAppSelector((state) => state.common);

  useEffect(() => {
    dispatch(getActors());
    dispatch(getNations());
  }, [dispatch]);

  useEffect(() => {
    setLoadedActors(filteredActors);
  }, [filteredActors]);

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedActors(filteredActors);
    }

    if (debouncedValue !== "") {
      const relevantMovies = filteredActors.filter((actor) =>
        actor.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setLoadedActors(relevantMovies);
    }
  }, [debouncedValue, filteredActors]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  const handleChangeNation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNation(e.target.value);
    dispatch(applyFilter(e.target.value));
  };

  return (
    <>
      <Head>
        <title>Diễn viên</title>
      </Head>
      <div className="bg-white dark:bg-dark-bg-primary">
        <Heading content="Diễn viên" />
        <div className="container mx-auto py-10 grid grid-cols-3 gap-6">
          <div className="col-span-3 lg:col-span-2">
            <div className="w-full p-4 bg-light-gray-bg dark:bg-dark-bg-secondary flex gap-4">
              <div className="flex-1 flex flex-col gap-1 max-w-[300px]">
                <p className="text-gray-text dark:text-light-text">Tìm kiếm</p>
                <TextField
                  placeholder="Tìm kiếm"
                  containerClassName="col-span-8"
                  inputClassName="bg-dark-bg-primary text-white"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 max-w-[300px]">
                <p className="text-gray-text dark:text-light-text">Quốc tịch</p>
                <ComboBox
                  options={NATIONS.concat(nations)}
                  containerClassName="col-span-4"
                  className="bg-dark-bg-primary text-white"
                  value={nation}
                  onChange={handleChangeNation}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-10">
              {loadedActors.map((actor) => (
                <Actor key={actor._id} actor={actor} />
              ))}
            </div>
          </div>
          <div className="col-span-0 lg:col-span-1">
            <QuickBooking />
          </div>
        </div>
      </div>
    </>
  );
};

export default Actors;
