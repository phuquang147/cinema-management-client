import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "~/redux/hooks";
import { changeUserPassword } from "~/redux/slices/AuthSlice";
import Button from "../UI/Button";
import TextField from "../UI/TextField";
import { useSession } from "next-auth/react";

export interface ChangeUserPasswordFormData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    password: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    confirmPassword: yup.string().required("Vui lòng xác nhận mật khẩu mới"),
  })
  .required();

const Password: React.FC = () => {
  const dispatch = useAppDispatch();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUserPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangeUserPasswordFormData> = (data) => {
    dispatch(
      changeUserPassword({ data, jwt: (session as any).data?.user.token })
    );
  };

  return (
    <div className="w-full p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary shadow-sm">
      <h1 className="font-bold text-lg text-gray-text dark:text-light-text">
        Mật khẩu
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-12 gap-4 mt-4"
      >
        <TextField
          type="password"
          name="password"
          placeholder="Mật khẩu cũ"
          register={register}
          error={errors.password}
          containerClassName="col-span-6"
          inputClassName="bg-dark-bg-primary text-white"
        />
        <TextField
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới"
          register={register}
          error={errors.newPassword}
          containerClassName="col-span-6"
          inputClassName="bg-dark-bg-primary text-white"
        />
        <TextField
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          register={register}
          error={errors.confirmPassword}
          containerClassName="col-span-6"
          inputClassName="bg-dark-bg-primary text-white"
        />
        <div className="col-span-12 flex justify-end">
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </div>
  );
};

export default Password;
