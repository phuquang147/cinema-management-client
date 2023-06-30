import { IconInfoCircle } from "@tabler/icons";
import Image from "next/image";
import Swal from "sweetalert2";

const Transactions: React.FC = () => {
  return (
    <div className="p-4 bg-dark-bg-secondary">
      <h1 className="font-bold text-lg text-gray-100">Lịch sử giao dịch</h1>
      <ul className="mt-4">
        <li>
          <div className="flex items-center p-4 bg-dark-bg-primary rounded gap-4">
            <div className="h-12 w-12 relative rounded overflow-hidden">
              <Image
                src="/assets/images/background.jpg"
                alt=""
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-100">Fast And Furious</p>
              <p className="text-gray-400 text-sm mt-1">
                Tổng tiền <span className="text-primary">100.000 VNĐ</span>
              </p>
            </div>
            <button
              className="dark:bg-dark-bg-secondary p-2 rounded-full"
              onClick={() => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Chỗ này hiện chi tiết giao dịch với ô text để review",
                });
              }}
            >
              <IconInfoCircle className="text-blue-400" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Transactions;
