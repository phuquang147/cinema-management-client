import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import logo from "~/assets/images/logo-red.svg";
import Button from "~/components/UI/Button";
import ComboBox from "~/components/UI/ComboBox";
import TextField from "~/components/UI/TextField";
import { GENDERS } from "~/constants";
import { useAppDispatch } from "~/redux/hooks";
import { signUp } from "~/redux/slices/AuthSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
}

const schema = yup
  .object({
    username: yup.string().required("Vui lòng nhập tên đăng nhập"),
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
    name: yup.string().required("Vui lòng nhập tên"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
    birthday: yup.string().required("Vui lòng nhập ngày sinh"),
    gender: yup.string().required("Vui lòng chọn giới tính"),
  })
  .required();

const Register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(
      signUp({
        ...data,
        birthday: new Date(data.birthday).toISOString(),
      })
    );
  };

  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="bg-auth bg-cover bg-bottom">
        <div className="min-h-fit container mx-auto py-10 flex justify-center items-center">
          <div className="pt-[3px] bg-gradient-to-r from-light-pink to-light-red rounded overflow-hidden">
            <div className="w-[500px] max-w-full bg-bg-color-secondary p-16 flex flex-col items-center gap-y-8 shadow-lg">
              <Image src={logo} alt="" />
              <h1 className="text-2xl font-bold uppercase text-gray-100">
                Đăng Ký
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full grid grid-cols-12 gap-4"
              >
                <TextField
                  name="username"
                  placeholder="Tên đăng nhập"
                  register={register}
                  error={errors.username}
                  inputClassName="bg-bgColor text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  register={register}
                  error={errors.password}
                  inputClassName="bg-bgColor text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  register={register}
                  error={errors.confirmPassword}
                  inputClassName="bg-bgColor text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  register={register}
                  error={errors.name}
                  inputClassName="bg-bgColor text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  register={register}
                  error={errors.phone}
                  inputClassName="bg-bgColor text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="email"
                  name="email"
                  placeholder="Email"
                  register={register}
                  error={errors.email}
                  inputClassName="bg-bgColor text-white"
                  containerClassName="col-span-12"
                />
                <TextField
                  type="date"
                  name="birthday"
                  placeholder="Ngày sinh"
                  register={register}
                  error={errors.birthday}
                  containerClassName="col-span-12 lg:col-span-8"
                  inputClassName="bg-bgColor text-white"
                />
                <ComboBox
                  name="gender"
                  register={register}
                  placeholder="Giới tính"
                  options={GENDERS}
                  containerClassName="col-span-12 lg:col-span-4"
                  className="bg-bgColor text-white"
                />

                <Button type="submit" className="col-span-12 mt-2">
                  Đăng Ký
                </Button>
              </form>
              <div className="text-gray-500">
                Đã có tài khoản?{"  "}
                <Link
                  href="/dang-nhap"
                  className="font-bold text-sm text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
