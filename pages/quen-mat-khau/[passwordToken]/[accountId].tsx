import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter as useNavigationRouter } from "next/navigation";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import logo from "~/assets/images/logo-red.svg";
import Button from "~/components/UI/Button";
import TextField from "~/components/UI/TextField";
import { useAppDispatch } from "~/redux/hooks";
import { changePassword } from "~/redux/slices/AuthSlice";

export interface ChangePasswordFormData {
  password: string;
  confirmPassword: string;
  passwordToken: string;
  accountId: string;
}

const schema = yup
  .object({
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .test("isEqual", "Mật khẩu không trùng khớp", (value, testContext) => {
        if (testContext.parent.password !== value) return false;
        return true;
      }),
  })
  .required();

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const navigationRouter = useNavigationRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
    dispatch(
      changePassword({
        data: {
          ...data,
          accountId: router.query.accountId as string,
          passwordToken: router.query.passwordToken as string,
        },
        router: navigationRouter,
      })
    );
  };

  return (
    <>
      <Head>
        <title>Tạo mật khẩu mới</title>
      </Head>
      <div className="bg-auth bg-cover bg-bottom">
        <div className="min-h-fit container mx-auto py-10 flex justify-center items-center">
          <div className="pt-[3px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
            <div className="w-[500px] max-w-full bg-dark-bg-secondary p-16 flex flex-col items-center gap-y-8 shadow-lg">
              <Image src={logo} alt="" />
              <h1 className="text-2xl font-bold uppercase text-gray-100">
                Tạo mật khẩu mới
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full grid grid-cols-12 gap-4"
              >
                <TextField
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  register={register}
                  error={errors.password}
                  inputClassName="bg-dark-bg-primary text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  register={register}
                  error={errors.confirmPassword}
                  inputClassName="bg-dark-bg-primary text-white"
                  containerClassName="col-span-12"
                />

                <Button type="submit" className="col-span-12 mt-2">
                  Xác nhận
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
