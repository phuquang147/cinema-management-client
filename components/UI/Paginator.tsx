import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { FC } from "react";

type PaginatorProps = {
  itemCount: number;
  currentPage: number;
  itemsPerPage: number;
  onChangePage: (selectedPage: number) => void;
};

const Paginator: FC<PaginatorProps> = ({
  itemCount,
  currentPage,
  itemsPerPage,
  onChangePage,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onChangePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(itemCount / itemsPerPage))
      onChangePage(currentPage + 1);
  };

  const handleChangePage = (page: number) => {
    onChangePage(page);
  };

  return (
    <div className="w-full flex items-center justify-end gap-2">
      <button
        className={`flex justify-center rounded-lg p-2 bg-gray-200 dark:bg-gray-600 text-gray-text dark:text-light-text ${
          currentPage === 1
            ? "opacity-50"
            : "cursor-pointer hover:bg-gray-300 active:bg-gray-400 hover:dark:bg-gray-700 active:dark:bg-dark-bg-primary"
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <IconChevronLeft />
      </button>
      <ul className="flex items-center gap-2">
        {itemCount > 0 &&
          Array.from(Array(Math.ceil(itemCount / itemsPerPage)).keys()).map(
            (page: number) => {
              return (
                <li
                  key={`${Math.random()}${page}`}
                  className={`w-10 h-10 flex justify-center items-center text-lg rounded-lg cursor-pointer text-gray-text dark:text-light-text ${
                    page + 1 === currentPage
                      ? "bg-gray-200 dark:bg-gray-600 cursor-pointer hover:bg-gray-300 active:bg-gray-400 hover:dark:bg-gray-700 active:dark:bg-dark-bg-primary"
                      : "hover:bg-gray-200 active:bg-gray-400 hover:dark:bg-gray-700 active:dark:bg-dark-bg-primary"
                  }`}
                  onClick={() => {
                    handleChangePage(page + 1);
                  }}
                >
                  {page + 1}
                </li>
              );
            }
          )}
      </ul>
      <button
        className={`flex justify-center rounded-lg p-2 bg-gray-200 dark:bg-gray-600 text-gray-text dark:text-light-text ${
          currentPage === Math.ceil(itemCount / itemsPerPage) ||
          itemCount < itemsPerPage
            ? "opacity-50"
            : "cursor-pointer hover:bg-gray-300 active:bg-gray-400 hover:dark:bg-gray-700 active:dark:bg-dark-bg-primary"
        }`}
        onClick={handleNext}
        disabled={
          currentPage === Math.ceil(itemCount / itemsPerPage) ||
          itemCount < itemsPerPage
        }
      >
        <IconChevronRight />
      </button>
    </div>
  );
};

export default Paginator;
