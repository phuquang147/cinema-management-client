import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import TextField from "~/components/UI/TextField";
import { CommentFormData } from "../MovieComments";
import { useAppDispatch } from "~/redux/hooks";
import Button from "~/components/UI/Button";

const schema = yup
  .object({
    comment: yup.string().required("Vui lòng nội dung bình luận"),
  })
  .required();

const EditComment: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    // dispatch(
    //   createComment({
    //     comment: {
    //       comment: data.comment,
    //       movie: movieId,
    //       parentComment: comment._id,
    //     },
    //     jwt: (session as any).data?.user.token,
    //     reset,
    //     handleUpdateComments,
    //   })
    // );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-start gap-4"
    >
      <TextField
        name="comment"
        placeholder="Nhập bình luận"
        register={register}
        error={errors.comment}
        inputClassName="py-3"
        multiple
      />
      <div className="flex items-center gap-2">
        <Button className="uppercase">Hủy</Button>
        <Button type="submit" className="uppercase">
          Xác nhận
        </Button>
      </div>
    </form>
  );
};
export default EditComment;
