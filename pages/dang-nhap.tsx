import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import logo from "~/assets/images/logo-red.svg";
import Button from "~/components/UI/Button";
import TextField from "~/components/UI/TextField";
import showToast from "~/utils/showToast";

export interface LoginFormData {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  })
  .required();

const Login: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push("/");
      } else {
        showToast("error", "Sai tên đăng nhập hoặc mật khẩu!");
      }
    });
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="bg-auth bg-cover bg-bottom">
        <div className="min-h-fit container mx-auto py-10 flex justify-center items-center">
          <div className="pt-[3px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
            <div className="w-[500px] max-w-full bg-bg-color-secondary p-16 flex flex-col items-center gap-y-8 shadow-lg">
              <Image src={logo} alt="" />
              <h1 className="text-2xl font-bold uppercase text-gray-100">
                Đăng Nhập
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-y-4"
              >
                <TextField
                  name="username"
                  placeholder="Tên đăng nhập"
                  register={register}
                  error={errors.username}
                  inputClassName="bg-bgColor text-white"
                />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  register={register}
                  error={errors.password}
                  inputClassName="bg-bgColor text-white"
                />
                <div className="flex justify-end">
                  <Link
                    href="/quen-mat-khau"
                    className="text-gray-500 text-sm hover:text-primary font-bold transition-colors duration-200"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Button type="submit">Đăng Nhập</Button>
              </form>
              <div className="text-gray-500">
                Chưa có tài khoản?{"  "}
                <Link
                  href="/dang-ky"
                  className="font-bold text-sm text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
