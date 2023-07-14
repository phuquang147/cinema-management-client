import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import logo from "~/assets/images/logo-red.svg";
import Button from "~/components/UI/Button";
import TextField from "~/components/UI/TextField";
import { useAppDispatch } from "~/redux/hooks";
import { resetPassword } from "~/redux/slices/AuthSlice";

export interface ResetPasswordFormData {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  })
  .required();

const ResetPassword: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    dispatch(
      resetPassword({
        data: { ...data },
        router,
      })
    );
  };

  return (
    <>
      <Head>
        <title>Quên mật khẩu</title>
      </Head>
      <div className="bg-auth bg-cover bg-bottom">
        <div className="min-h-fit container mx-auto py-10 flex justify-center items-center">
          <div className="pt-[3px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
            <div className="w-[500px] max-w-full bg-dark-bg-secondary p-16 flex flex-col items-center gap-y-8 shadow-lg">
              <div className="relative w-52 h-16">
                <Image
                  src="/assets/images/logo-text-red.png"
                  alt=""
                  fill
                  objectFit="contain"
                />
              </div>
              <h1 className="text-2xl font-bold uppercase text-gray-100">
                Quên mật khẩu
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-y-4"
              >
                <TextField
                  name="email"
                  type="email"
                  placeholder="Email"
                  register={register}
                  error={errors.email}
                  inputClassName="bg-dark-bg-primary text-white"
                />

                <Button type="submit">Xác nhận</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
