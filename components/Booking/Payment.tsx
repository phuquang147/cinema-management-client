import { useSession } from "next-auth/react";
import IUser from "~/interfaces/user.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import Button from "../UI/Button";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import { useEffect, useState } from "react";
import { createTransaction } from "~/redux/slices/BookingSlice";

export interface TransactionData {
  tickets: string[];
  items: { id: string; quantity: number }[];
}

interface PaymentProps {
  handleBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ handleBack }) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const { data } = useSession();
  const { showTime, tickets, snacks } = useAppSelector(
    (state) => state.booking
  );

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      tickets.reduce((prev, current) => {
        return prev + current.ticketId.price;
      }, 0) +
        snacks.reduce((prev, current) => {
          return prev + current.price * current.count;
        }, 0)
    );
  }, [tickets, snacks]);

  const handleCreateTransaction = () => {
    dispatch(
      createTransaction({
        transaction: {
          tickets: tickets.map((ticket) => ticket.ticketId._id),
          items: snacks
            .filter((snack) => snack.count > 0)
            .map((snack) => ({ id: snack._id, quantity: snack.count })),
        },
        jwt: (session as any).data?.user.token,
      })
    );
  };

  return (
    <div className="w-full flex flex-col items-start bg-white dark:bg-dark-bg-primary p-8 text-gray-text dark:text-light-text">
      <h2 className="text-2xl font-bold text-primary">Thông tin người mua</h2>
      <p className="mt-2">
        <b>Họ và tên:</b> {(data?.user as any).user?.name}
      </p>
      <p className="mt-1">
        <b>Email:</b> {(data?.user as any).user?.email}
      </p>
      <p className="mt-1">
        <b>Số điện thoại:</b> {(data?.user as any).user?.phone}
      </p>
      <h2 className="text-2xl font-bold text-primary mt-6">Thông tin vé</h2>
      <p className="mt-2">
        <b>Tên phim:</b> {showTime?.movie.name}
      </p>
      <p className="mt-1">
        <b>Xuất chiếu:</b> {ISOToDateTimeFormat(showTime?.startTime || "")}
      </p>
      <div className="my-2 flex flex-row items-center">
        <b className="min-w-fit">Danh sách ghế đã chọn:</b>
        <div className="flex flex-row gap-2 ml-2 flex-wrap">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-gray-100 dark:bg-gray-700 py-1 px-4 rounded"
            >
              {`${ticket.ticketId.seat.name} (${printNumberWithCommas(
                ticket.ticketId.price
              )} VNĐ)`}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-primary mt-6">
        Thông tin bắp nước
      </h2>
      <div className="w-full flex flex-col gap-2 mt-4">
        {snacks
          .filter((snack) => snack.count > 0)
          .map((snack) => (
            <div
              key={snack._id}
              className="w-full flex justify-between bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded"
            >
              <p>{`${snack.name} (${snack.price} VNĐ) x ${snack.count}`}</p>
              <p className="font-bold text-primary">
                {printNumberWithCommas(snack.price * snack.count)} VNĐ
              </p>
            </div>
          ))}
      </div>
      <h2 className="text-2xl font-bold mt-6">
        <span className="text-gray-text dark:text-light-text">Tổng tiền:</span>{" "}
        <span className="text-primary">{printNumberWithCommas(total)} VNĐ</span>
      </h2>
      <div className="w-full flex justify-end mt-4">
        <Button onClick={handleCreateTransaction}>Xác nhận thanh toán</Button>
      </div>
    </div>
  );
};

export default Payment;
