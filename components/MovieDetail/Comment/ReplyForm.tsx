import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "~/components/UI/Button";
import TextField from "~/components/UI/TextField";
import { IComment } from "~/interfaces/movie.interface";
import { useAppDispatch } from "~/redux/hooks";
import { createComment } from "~/redux/slices/MovieSlice";
import { CommentFormData } from "../MovieComments";

const schema = yup
  .object({
    comment: yup.string().required("Vui lòng nội dung bình luận"),
  })
  .required();

type ReplyFormProps = {
  comment: IComment;
  movieId: string;
  handleUpdateComments: (comments: IComment[]) => void;
};

const ReplyForm: FC<ReplyFormProps> = ({
  comment,
  movieId,
  handleUpdateComments,
}) => {
  const dispatch = useAppDispatch();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    dispatch(
      createComment({
        comment: {
          comment: data.comment,
          movie: movieId,
          parentComment: comment._id,
        },
        jwt: (session as any).data?.user.token,
        reset,
        handleUpdateComments,
      })
    );
  };

  return (
    <div className="bg-light-gray-bg dark:bg-dark-bg-secondary p-4 rounded mt-4">
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
        <Button type="submit" className="uppercase">
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default ReplyForm;
