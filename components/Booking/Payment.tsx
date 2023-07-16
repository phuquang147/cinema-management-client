import { IconChevronLeft } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { createTransaction } from "~/redux/slices/BookingSlice";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import Button from "../UI/Button";

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
  const router = useRouter();
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

  const handlePaymentSuccess = () => {
    Swal.fire({
      icon: "success",
      text: "Đặt vé thành công",
      color: localStorage.getItem("theme") === "dark" ? "#ccc" : "#333",
      background:
        localStorage.getItem("theme") === "dark" ? "#222831" : "#f1ece5",
      confirmButtonText: "Đặt vé mới",
      confirmButtonColor: "#f45e61",
      allowOutsideClick: false,
    }).then(function () {
      router.replace("/lich-chieu");
    });
  };

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
        handlePaymentSuccess,
      })
    );
  };

  return (
    <div className="w-full flex flex-col items-start bg-white dark:bg-dark-bg-secondary p-8 text-gray-text dark:text-light-text rounded-lg">
      <h2 className="text-xl font-bold text-primary">Thông tin đặt vé</h2>
      <p className="mt-2">
        <b>Họ và tên:</b> {(data?.user as any).user?.name}
      </p>
      <p className="mt-2">
        <b>Số điện thoại:</b> {(data?.user as any).user?.phone}
      </p>
      <p className="mt-2">
        <b>Tên phim:</b> {showTime?.movie.name}
      </p>
      <p className="mt-2">
        <b>Suất chiếu:</b> {ISOToDateTimeFormat(showTime?.startTime || "")}
      </p>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold text-primary mt-6">Danh sách ghế</h2>
          <div className="w-full flex flex-col gap-2 mt-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="w-full flex justify-between bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded"
              >
                <p>{ticket.ticketId.seat.name}</p>
                <p className="font-bold text-primary">
                  {printNumberWithCommas(ticket.ticketId.price)} VNĐ
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary mt-6">
            Danh sách bắp nước
          </h2>
          <div className="w-full flex flex-col gap-2 mt-4">
            {snacks
              .filter((snack) => snack.count > 0)
              .map((snack) => (
                <div
                  key={snack._id}
                  className="w-full flex justify-between bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded"
                >
                  <p>{`${snack.name} (${printNumberWithCommas(
                    snack.price
                  )} VNĐ) x ${snack.count}`}</p>
                  <p className="font-bold text-primary">
                    {printNumberWithCommas(snack.price * snack.count)} VNĐ
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-6">
        <span className="text-gray-text dark:text-light-text">Tổng tiền:</span>{" "}
        <span className="text-primary">{printNumberWithCommas(total)} VNĐ</span>
      </h2>
      <div className="w-full flex justify-between mt-4">
        <Button variant="outlined" onClick={handleBack}>
          <div className="flex items-center gap-1">
            <IconChevronLeft /> Chọn bắp nước
          </div>
        </Button>
        <Button onClick={handleCreateTransaction}>Xác nhận thanh toán</Button>
      </div>
    </div>
  );
};

export default Payment;
