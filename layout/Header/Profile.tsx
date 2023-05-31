import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Button from "~/components/UI/Button";

const Profile: FC = () => {
  const { data: session } = useSession();

  return session ? (
    <Link href="/tai-khoan" className="min-w-fit flex items-center gap-2">
      <div className="relative w-8 h-8">
        <Image src="/assets/images/user.png" fill alt="" draggable={false} />
      </div>
      <p className="text-gray-text dark:text-light-text">
        {session.user?.name}
      </p>
    </Link>
  ) : (
    <div>
      <Button className="hidden lg:block" to="/dang-nhap">
        Đăng nhập
      </Button>
    </div>
  );
};

export default Profile;
