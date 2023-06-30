import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { GENDERS } from "~/constants";
import Button from "../UI/Button";
import ComboBox from "../UI/ComboBox";
import TextField from "../UI/TextField";
import IUser from "~/interfaces/user.interface";

const schema = yup
  .object({
    name: yup.string().required("Vui lòng nhập tên đăng nhập"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    gender: yup.string().required("Vui lòng nhập giới tính"),
    email: yup.string().required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    confirmPassword: yup.string().required("Vui lòng xác nhận mật khẩu"),
    dateOfBirth: yup.string().required("Vui lòng nhập ngày tháng năm sinh"),
  })
  .required();

type InfoProps = {
  user: IUser;
};

const Info: React.FC<InfoProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<IUser> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full p-4 bg-dark-bg-secondary">
      <h1 className="font-bold text-lg text-gray-100">Thông tin</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-12 gap-4 mt-4"
      >
        <TextField
          name="name"
          placeholder="Họ và tên"
          register={register}
          error={errors.name}
          containerClassName="col-span-8"
          inputClassName="bg-dark-bg-primary text-white"
        />
        <ComboBox
          name="gender"
          register={register}
          placeholder="Giới tính"
          options={GENDERS}
          containerClassName="col-span-4"
          className="bg-dark-bg-primary text-white"
          error={errors.gender}
        />

        <TextField
          type="email"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email}
          containerClassName="col-span-12"
          inputClassName="bg-dark-bg-primary text-white"
        />
        <TextField
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          register={register}
          error={errors.phone}
          containerClassName="col-span-6"
          inputClassName="bg-dark-bg-primary text-white"
        />
        <TextField
          type="date"
          name="dateOfBirth"
          placeholder="Ngày sinh"
          register={register}
          error={errors.birthday}
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

export default Info;
