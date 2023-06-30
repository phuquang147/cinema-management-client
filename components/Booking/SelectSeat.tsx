import { IconChevronRight } from "@tabler/icons";
import { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { SEAT_TYPES } from "~/constants";
import { ITicket } from "~/interfaces/ticket.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectTickets, setSnacks } from "~/redux/slices/BookingSlice";
import { getSnacks } from "~/redux/slices/SnackSlice";
import ShowTimeServices from "~/services/showTimeServices";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import showToast from "~/utils/showToast";
import Button from "../UI/Button";
import Ticket from "./Ticket";

type SelectSeatProps = {
  handleNextStep: () => void;
};

const SelectSeat: React.FC<SelectSeatProps> = ({ handleNextStep }) => {
  const dispatch = useAppDispatch();
  const [tickets, setTickets] = useState<ITicket[][]>([]);
  const [selectedTickets, setSelectedTickets] = useState<ITicket[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { showTime } = useAppSelector((state) => state.booking);
  const { snacks } = useAppSelector((state) => state.snack);

  useEffect(() => {
    const getShowTime = async () => {
      try {
        let { data, status } = await ShowTimeServices.getShowTimesById(
          showTime?._id || ""
        );

        if (status === 200) {
          setTickets(data.showTime.tickets);
        }
      } catch (err: any) {
        showToast("error", err.response.data.message);
      }
    };

    if (showTime) {
      getShowTime();
    }
  }, [showTime]);

  useEffect(() => {
    dispatch(getSnacks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSnacks(snacks));
  }, [snacks, dispatch]);

  const selectTicket = (ticket: ITicket) => {
    if (ticket.ticketId.seat.type === SEAT_TYPES.SINGLE) {
      setSelectedTickets((prevSelectedTickets) => [
        ...prevSelectedTickets,
        ticket,
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + ticket.ticketId.price);
    } else {
      setSelectedTickets((prevSelectedTickets) => [
        ...prevSelectedTickets,
        ticket,
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + ticket.ticketId.price);
    }
  };

  const unSelectTicket = (ticket: ITicket) => {
    if (ticket.ticketId.seat.type === SEAT_TYPES.SINGLE) {
      setSelectedTickets((prevSelectedTickets) =>
        prevSelectedTickets.filter(
          (selectTicket) => selectTicket._id !== ticket._id
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - ticket.ticketId.price);
    } else {
      setSelectedTickets((prevSelectedTickets) =>
        prevSelectedTickets.filter(
          (selectTicket) => selectTicket._id !== ticket._id
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - ticket.ticketId.price);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex gap-4 mb-10">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-[#ccc]"></div>
          <p className="text-gray-text dark:text-light-text">Ghế trống</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-[#eee] dark:bg-gray-700"></div>
          <p className="text-gray-text dark:text-light-text">Đường đi</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-primary"></div>
          <p className="text-gray-text dark:text-light-text">Ghế đã chọn</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded booked-seat"></div>
          <p className="text-gray-text dark:text-light-text">Ghế trống</p>
        </div>
      </div>
      <TransformWrapper minScale={0.5}>
        <TransformComponent>
          <div className="w-full bg-gray-700 text-white text-center font-bold py-2 rounded mb-2">
            Màn Hình
          </div>
          <div>
            {tickets.map((row, rowIndex) => (
              <div
                key={`${rowIndex}${row[0] && row[0]._id}`}
                className="flex w-fit"
              >
                {row.map((col, colIndex) => {
                  return (
                    <Ticket
                      key={col ? col._id : `${rowIndex}${colIndex}`}
                      ticket={col}
                      selectedTickets={selectedTickets}
                      selectTicket={selectTicket}
                      unSelectTicket={unSelectTicket}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <hr className="w-full mt-10"></hr>
        </TransformComponent>
      </TransformWrapper>
      <div className="w-full flex justify-start items-center flex-wrap mt-6 gap-2">
        <p className="text-gray-text dark:text-light-text">
          Danh sách ghế đã chọn:
        </p>
        {selectedTickets.map((selectedTicket) => (
          <p
            key={selectedTicket._id}
            className="px-2 py-1 border border-gray-600 rounded text-gray-text dark:text-light-text"
          >
            {selectedTicket.ticketId.seat.name} (
            {printNumberWithCommas(selectedTicket.ticketId.price)} VNĐ)
          </p>
        ))}
      </div>
      <p className="w-full mt-4 text-start text-gray-text dark:text-light-text">
        Tổng tiền:{" "}
        <span className="text-primary font-bold text-base">
          {printNumberWithCommas(totalPrice)} VNĐ
        </span>
      </p>
      <div className="w-full flex justify-end mt-10">
        <Button
          className="flex items-center"
          disabled={selectedTickets.length === 0}
          onClick={() => {
            dispatch(selectTickets(selectedTickets));
            handleNextStep();
          }}
        >
          Chọn bắp nước <IconChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default SelectSeat;
