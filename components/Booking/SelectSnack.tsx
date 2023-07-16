import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getSnacks } from "~/redux/slices/SnackSlice";
import Button from "../UI/Button";
import Snack from "./Snack";

type SelectSnackProps = {
  handleNextStep: () => void;
  handlePrevStep: () => void;
};

const SelectSnack: React.FC<SelectSnackProps> = ({
  handleNextStep,
  handlePrevStep,
}) => {
  const dispatch = useAppDispatch();
  const { snacks } = useAppSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getSnacks());
  }, [dispatch]);

  return (
    <div className="w-full bg-light-bg-primary dark:bg-dark-bg-primary">
      <div className="w-full grid grid-cols-4 gap-8">
        {snacks.map((snack) => (
          <div key={snack._id} className="col-span-1">
            <Snack snack={snack} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between mt-10">
        <Button variant="outlined" onClick={handlePrevStep}>
          <div className="flex items-center gap-1">
            <IconChevronLeft /> Chọn ghế
          </div>
        </Button>
        <Button
          className="flex items-center gap-1"
          onClick={() => {
            handleNextStep();
          }}
        >
          Thanh toán <IconChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default SelectSnack;
