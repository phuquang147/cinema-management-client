import { IconLogout } from "@tabler/icons";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Info from "~/components/Profile/Info";
import Password from "~/components/Profile/Password";
import Transactions from "~/components/Profile/Transactions";
import Button from "~/components/UI/Button";
import IUser from "~/interfaces/user.interface";

const Profile: NextPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/dang-nhap");
    },
  });

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tài khoản</title>
      </Head>
      <div className="bg-light-bg-primary dark:bg-dark-bg-primary">
        <div className="shadow-xl">
          <div className="container mx-auto flex justify-between">
            <div className="flex items-center gap-x-4">
              <div className="h-12 w-12 relative">
                <Image src="/assets/images/user.png" alt="" fill />
              </div>
              <div>
                <p className="font-bold text-gray-100">
                  {(session?.user as any)?.user?.name}
                </p>
                <p className="text-sm text-gray-100">
                  {(session?.user as any)?.user?.email}
                </p>
              </div>
            </div>
            <Button onClick={signOut}>
              <IconLogout />
            </Button>
          </div>
        </div>
        <div className="container mx-auto gap-8 py-10 grid grid-cols-1 xl:grid-cols-2">
          <div className="h-fit col-span-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8">
            <div className="max-fit pt-[2px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
              <Info user={session?.user as IUser} />
            </div>
            <div className="h-fit pt-[2px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
              <Password />
            </div>
          </div>
          <div className="h-fit pt-[2px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
            <Transactions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
