import { IconMinus, IconPlus } from "@tabler/icons";
import Image from "next/image";
import { useAppDispatch } from "~/redux/hooks";
import {
  IExtendedSnack,
  decreaseSnackQuantity,
  increaseSnackQuantity,
} from "~/redux/slices/BookingSlice";

interface SnackProps {
  snack: IExtendedSnack;
}

const Snack: React.FC<SnackProps> = ({ snack }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full overflow-hidden bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
      <div className="w-full aspect-square relative overflow-hidden">
        <Image src={snack.image} fill alt="" objectFit="cover" />
      </div>
      <div className="p-6 pt-4">
        <p className="font-bold text-primary">{snack.name}</p>
        <div className="flex justify-center items-center gap-x-4 mt-2">
          <button
            className="flex-1 flex justify-center rounded-lg p-2 bg-gray-200 dark:bg-gray-600 text-gray-text dark:text-light-text cursor-pointer hover:bg-gray-300 active:bg-gray-400 hover:dark:bg-gray-700 active:dark:bg-dark-bg-primary"
            disabled={snack.count < 1}
            onClick={() => {
              dispatch(decreaseSnackQuantity(snack));
            }}
          >
            <IconMinus />
          </button>
          <span className="text-gray-text dark:text-light-text text-lg font-bold">
            {snack.count}
          </span>
          <button
            className="flex-1 flex justify-center rounded-lg p-2 bg-gray-200 dark:bg-gray-600 text-gray-text dark:text-light-text cursor-pointer hover:bg-gray-300 active:bg-gray-400 hover:dark:bg-gray-700 active:dark:bg-dark-bg-primary"
            onClick={() => dispatch(increaseSnackQuantity(snack))}
          >
            <IconPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snack;
