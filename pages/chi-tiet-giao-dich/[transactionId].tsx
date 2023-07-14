import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/UI/Button";
import TextField from "~/components/UI/TextField";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
  createRating,
  deleteRating,
  getTransactionById,
  updateRating,
} from "~/redux/slices/TransactionSlice";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import Swal from "sweetalert2";

export type RatingFormData = {
  transactionId: string;
  score: number;
  description: string;
};

const TransactionDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const session = useSession();
  const { transaction } = useAppSelector((state) => state.transaction);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState(5);

  useEffect(() => {
    dispatch(
      getTransactionById({
        id: router.query.transactionId as string,
        jwt: (session as any).data?.user.token,
      })
    );
  }, []);

  useEffect(() => {
    setDescription(transaction?.review?.description || "");
    setScore(transaction?.review?.score || 0);
  }, [transaction]);

  const handleCreateRating = () => {
    dispatch(
      createRating({
        rating: {
          transactionId: transaction?._id || "",
          score,
          description,
        },
        jwt: (session as any).data?.user.token,
      })
    );
  };

  const handleUpdateRating = () => {
    dispatch(
      updateRating({
        rating: {
          transactionId: transaction?._id || "",
          score,
          description,
        },
        ratingId: transaction?.review?._id || "",
        jwt: (session as any).data?.user.token,
      })
    );
  };

  const handleDeleteRating = () => {
    Swal.fire({
      icon: "question",
      text: "Xác nhận xóa đánh giá",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "#f45e61",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteRating({
            jwt: (session as any).data?.user.token,
            ratingId: transaction?.review?._id || "",
            movie: transaction?.showTime.movieId || "",
          })
        );
      }
    });
  };

  return (
    <>
      <Head>
        <title>Chi tiết giao dịch</title>
      </Head>
      <div className="bg-light-bg-primary dark:bg-dark-bg-primary">
        <div className="container mx-auto py-10 flex flex-col items-start text-gray-text dark:text-light-text">
          <h2 className="text-xl font-bold text-primary">Thông tin đặt vé</h2>
          <p className="mt-2">
            <b>Họ và tên:</b> {transaction?.customer?.name}
          </p>
          <p className="mt-2">
            <b>Tên phim:</b> {transaction?.showTime.movieName}
          </p>
          <p className="mt-2">
            <b>Suất chiếu:</b>{" "}
            {ISOToDateTimeFormat(transaction?.showTime.startTime || "")}
          </p>
          <p className="mt-2">
            <b>Tổng tiền:</b>{" "}
            <b className="text-primary">
              {printNumberWithCommas((transaction?.totalPrice as number) || 0)}{" "}
              VNĐ
            </b>
          </p>

          <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1 xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-2 bg-light-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg">
                <h2 className="text-xl font-bold text-primary">
                  Danh sách ghế
                </h2>
                {transaction?.tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="w-full flex justify-between bg-gray-100 dark:bg-dark-bg-primary py-2 px-4 rounded shadow-sm"
                  >
                    <p>{ticket.seat.name}</p>
                    <p className="font-bold text-primary">
                      {printNumberWithCommas(ticket.price || 0)} VNĐ
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col gap-2 bg-light-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg">
                <h2 className="text-xl font-bold text-primary">
                  Danh sách bắp nước
                </h2>
                {transaction?.items.map((item) => (
                  <div
                    key={item._id}
                    className="w-full flex justify-between bg-gray-100 dark:bg-dark-bg-primary py-2 px-4 rounded shadow-sm"
                  >
                    <p>{`${item.id.name} (${item.id.price} VNĐ) x ${item.quantity}`}</p>
                    <p className="font-bold text-primary">
                      {printNumberWithCommas(
                        item.id.price * item.quantity || 0
                      )}{" "}
                      VNĐ
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 bg-light-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg">
              <h2 className="text-xl font-bold text-primary">Đánh giá</h2>
              <TextField
                placeholder="Nhập đánh giá"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <Rating
                style={{ maxWidth: 200 }}
                value={score}
                onChange={setScore}
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: "#ffb700",
                  activeStrokeColor: "#ffb700",
                  inactiveStrokeColor: "#ffb700",
                  itemStrokeWidth: 2,
                }}
                transition="zoom"
                halfFillMode="svg"
              />
              <div className="w-full flex items-center gap-2 mt-4">
                {transaction?.review ? (
                  <>
                    <Button
                      variant="outlined"
                      className="flex-1 xl:flex-initial"
                      onClick={handleDeleteRating}
                    >
                      Xóa đánh giá
                    </Button>
                    <Button className="flex-1" onClick={handleUpdateRating}>
                      Cập nhật đánh giá
                    </Button>
                  </>
                ) : (
                  <Button className="flex-1" onClick={handleCreateRating}>
                    Gửi đánh giá
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetail;
