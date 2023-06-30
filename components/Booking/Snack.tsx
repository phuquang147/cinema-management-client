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
    <div className="w-full rounded overflow-hidden">
      <div className="w-full pt-[100%] relative rounded overflow-hidden">
        <Image src={snack.image} fill alt="" objectFit="cover" />
      </div>
      <p className="mt-2 font-bold text-primary">{snack.name}</p>
      <div className="flex justify-center items-center gap-x-4 mt-2">
        <button
          className="border rounded-full p-2 text-gray-100 active:border-primary active:text-primary"
          disabled={snack.count < 1}
          onClick={() => {
            dispatch(decreaseSnackQuantity(snack));
          }}
        >
          <IconMinus />
        </button>
        <span className="text-gray-100">{snack.count}</span>
        <button
          className="border rounded-full p-2 text-gray-100 active:border-primary active:text-primary"
          onClick={() => dispatch(increaseSnackQuantity(snack))}
        >
          <IconPlus />
        </button>
      </div>
    </div>
  );
};

export default Snack;
