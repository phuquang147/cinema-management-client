import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import IMovie, { IComment } from "~/interfaces/movie.interface";
import { useAppDispatch } from "~/redux/hooks";
import { createComment } from "~/redux/slices/MovieSlice";
import Button from "../UI/Button";
import TextField from "../UI/TextField";
import Comment from "./Comment";
import Paginator from "../UI/Paginator";

export interface CommentFormData {
  comment: string;
  movie: string;
  parentComment?: string;
}

const schema = yup
  .object({
    comment: yup.string().required("Vui lòng nội dung bình luận"),
  })
  .required();

type MovieCommentsProps = {
  movie: IMovie;
};

const MovieComments: FC<MovieCommentsProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const session = useSession();

  const [comments, setComments] = useState<IComment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentItems = comments.slice(currentPage * 5 - 5, currentPage * 5);

  const handleChangePage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    setComments(movie.comments);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: yupResolver(schema),
  });

  const handleUpdateComments = (comments: IComment[]) => {
    setComments(comments);
  };

  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    dispatch(
      createComment({
        comment: { comment: data.comment, movie: movie._id },
        jwt: (session as any).data?.user.token,
        reset,
        handleUpdateComments,
      })
    );
  };

  return (
    <div>
      {session.data && (
        <div className="bg-light-gray-bg dark:bg-dark-bg-secondary p-6 rounded">
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
      )}
      <div className="flex flex-col gap-8 mt-8 pb-10">
        {currentItems.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            movieId={movie._id}
            handleUpdateComments={handleUpdateComments}
          />
        ))}
      </div>
      <Paginator
        itemCount={comments.length}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        itemsPerPage={5}
      />
    </div>
  );
};

export default MovieComments;
