import { IconInfoCircle } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ITransaction from "~/interfaces/transaction.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getTransactions } from "~/redux/slices/TransactionSlice";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import Paginator from "../UI/Paginator";

function Items({
  currentTransactions,
}: {
  currentTransactions: ITransaction[];
}) {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {currentTransactions &&
        currentTransactions.map((transaction) => (
          <li key={transaction._id}>
            <div className="flex items-center p-4 bg-gray-100 dark:bg-dark-bg-primary rounded gap-4">
              <div className="h-12 w-12 relative rounded overflow-hidden">
                <Image
                  src={transaction.showTime.thumbnail}
                  alt=""
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-gray-text dark:text-light-text font-bold">
                    {transaction.showTime.movieName}
                  </p>
                  <p className="text-gray-text dark:text-light-text text-sm">
                    {ISOToDateTimeFormat(transaction.createdAt)}
                  </p>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Tổng tiền{" "}
                  <span className="text-primary">{`${printNumberWithCommas(
                    transaction.totalPrice
                  )} VNĐ`}</span>
                </p>
              </div>
              <Link
                href={`/chi-tiet-giao-dich/${transaction._id}`}
                className="dark:bg-dark-bg-secondary p-2 rounded-full"
              >
                <IconInfoCircle className="text-blue-400" />
              </Link>
            </div>
          </li>
        ))}
    </ul>
  );
}

const Transactions: React.FC = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transaction);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentItems = transactions.slice(currentPage * 5 - 5, currentPage * 5);

  const handleChangePage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    if ((session as any).data)
      dispatch(getTransactions({ jwt: (session as any).data?.user.token }));
  }, []);

  return (
    <div className="p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary shadow-sm">
      <h1 className="font-bold text-lg text-gray-text dark:text-light-text">
        Lịch sử giao dịch
      </h1>
      <ul className="mt-4 flex flex-col gap-4 mb-6">
        {currentItems &&
          currentItems.map((transaction) => (
            <li key={transaction._id}>
              <div className="flex items-center p-4 bg-gray-100 dark:bg-dark-bg-primary rounded gap-4">
                <div className="h-12 w-12 relative rounded overflow-hidden">
                  <Image
                    src={transaction.showTime.thumbnail}
                    alt=""
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-text dark:text-light-text font-bold">
                      {transaction.showTime.movieName}
                    </p>
                    <p className="text-gray-text dark:text-light-text text-sm">
                      {ISOToDateTimeFormat(transaction.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    Tổng tiền{" "}
                    <span className="text-primary">{`${printNumberWithCommas(
                      transaction.totalPrice
                    )} VNĐ`}</span>
                  </p>
                </div>
                <Link
                  href={`/chi-tiet-giao-dich/${transaction._id}`}
                  className="dark:bg-dark-bg-secondary p-2 rounded-full"
                >
                  <IconInfoCircle className="text-blue-400" />
                </Link>
              </div>
            </li>
          ))}
      </ul>
      <Paginator
        itemCount={transactions.length}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        itemsPerPage={5}
      />
    </div>
  );
};

export default Transactions;
