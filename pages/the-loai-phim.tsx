import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Heading from "~/components/Heading";
import Movie from "~/components/Movies/Movie";
import QuickBooking from "~/components/QuickBooking";
import ComboBox from "~/components/UI/ComboBox";
import TextField from "~/components/UI/TextField";
import useDebounce from "~/hooks/useDebounce";
import IMovie from "~/interfaces/movie.interface";
import IShowTime from "~/interfaces/showTime.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { applyFilter, getMovies } from "~/redux/slices/MovieSlice";

export type MappedShowTime = {
  name: string;
  thumbnail: string;
  showTimes: IShowTime[];
};

const GENRES = ["Tất cả"];
const YEARS = ["Tất cả"];

const AllMovies: NextPage = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { movieGenres, movieYears, filteredMovies } = useAppSelector(
    (state) => state.movie
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [loadedMovies, setLoadedMovies] = useState<IMovie[]>([]);
  const [genre, setGenre] = useState<string>("");
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  useEffect(() => {
    if (query.genre && movieGenres.includes(query.genre?.toString())) {
      setGenre(query.genre?.toString());
      dispatch(applyFilter({ genre: query.genre?.toString() }));
    }
  }, [query.genre, movieGenres, dispatch]);

  useEffect(() => {
    setLoadedMovies(filteredMovies);
  }, [filteredMovies]);

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedMovies(filteredMovies);
    }

    if (debouncedValue !== "") {
      const relevantMovies = filteredMovies.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setLoadedMovies(relevantMovies);
    }
  }, [debouncedValue, filteredMovies]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  const handleChangeGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
    dispatch(applyFilter({ genre: e.target.value, year }));
  };

  const handleChangeYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Thể loại phim</title>
      </Head>
      <div className="min-h-fit bg-white dark:bg-dark-bg-primary">
        <Heading content="Thể loại phim" />
        <div className="container mx-auto py-10 grid grid-cols-3 gap-4">
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
                <p className="text-gray-text dark:text-light-text">
                  Thể loại phim
                </p>
                <ComboBox
                  options={GENRES.concat(movieGenres)}
                  containerClassName="col-span-4"
                  className="bg-dark-bg-primary text-white"
                  value={genre}
                  onChange={handleChangeGenre}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 max-w-[300px]">
                <p className="text-gray-text dark:text-light-text">Năm</p>
                <ComboBox
                  options={YEARS.concat(movieYears)}
                  containerClassName="col-span-4"
                  className="bg-dark-bg-primary text-white"
                  value={year}
                  onChange={handleChangeYear}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-8 gap-y-8 mt-10">
              {loadedMovies.map((movie) => (
                <Movie
                  key={movie._id}
                  movie={movie}
                  className="col-span-12 md:col-span-6 lg:col-span-6"
                />
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

export default AllMovies;
