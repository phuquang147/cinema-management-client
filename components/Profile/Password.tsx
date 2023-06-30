import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { genders } from "~/constants";
import Button from "../UI/Button";
import ComboBox from "../UI/ComboBox";
import TextField from "../UI/TextField";

interface IFormInput {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const schema = yup
  .object({
    oldPassword: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    confirmNewPassword: yup.string().required("Vui lòng xác nhận mật khẩu mới"),
  })
  .required();

const Password: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full p-4 bg-dark-bg-secondary">
      <h1 className="font-bold text-lg text-gray-100">Mật khẩu</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-12 gap-4 mt-4"
      >
        <TextField
          type="password"
          name="oldPassword"
          placeholder="Mật khẩu cũ"
          register={register}
          error={errors.oldPassword}
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
          name="confirmNewPassword"
          placeholder="Xác nhận mật khẩu mới"
          register={register}
          error={errors.confirmNewPassword}
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
