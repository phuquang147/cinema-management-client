import {
  IconDots,
  IconEdit,
  IconMessagePlus,
  IconThumbDown,
  IconThumbUp,
  IconTrashX,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { IComment } from "~/interfaces/movie.interface";
import IUser from "~/interfaces/user.interface";
import { useAppDispatch } from "~/redux/hooks";
import { deleteComment, reactComment } from "~/redux/slices/MovieSlice";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import Divider from "../UI/Divider";

type SubCommentProps = {
  comment: IComment;
  movieId: string;
  parentComment: string;
  handleUpdateComments: (comments: IComment[]) => void;
};

const SubComment: React.FC<SubCommentProps> = ({
  comment,
  movieId,
  parentComment,
  handleUpdateComments,
}) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

  const handleToggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
  };

  const handleToggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleLikeComment = () => {
    dispatch(
      reactComment({
        react: {
          action: "like",
          comment: comment._id,
          movie: movieId,
        },
        jwt: (session as any).data?.user.token,
        handleUpdateComments,
      })
    );
  };

  const handleDisLikeComment = () => {
    dispatch(
      reactComment({
        react: {
          action: "dislike",
          comment: comment._id,
          movie: movieId,
        },
        jwt: (session as any).data?.user.token,
        handleUpdateComments,
      })
    );
  };

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({
        commentId: comment._id,
        jwt: (session as any).data?.user.token,
        parentComment,
        movie: movieId,
        handleUpdateComments,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4 ">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt=""
              fill
              objectFit="cover"
            />
          </div>
          <div>
            <p className="text-gray-text dark:text-light-text font-bold">
              {comment.author.name}
            </p>
            <p className="text-gray-text dark:text-light-text text-sm">
              {ISOToDateTimeFormat(comment.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-light-gray-bg dark:bg-dark-bg-secondary text-gray-text dark:text-light-text p-4 rounded divide-y divide-gray-300 dark:divide-gray-600">
        <p className="mb-2">{comment.comment}</p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex justify-start gap-1">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                comment.likes.includes(
                  ((session.data?.user as any).user as IUser)._id
                )
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={handleLikeComment}
            >
              <IconThumbUp className="text-green-400" /> {comment.likes.length}
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                comment.dislikes.includes(
                  ((session.data?.user as any).user as IUser)._id
                )
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={handleDisLikeComment}
            >
              <IconThumbDown className="text-red-400" />{" "}
              {comment.dislikes.length}
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                showReplyForm
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={handleToggleReplyForm}
            >
              <IconMessagePlus className="text-blue-400" /> Trả lời
            </button>
          </div>
          <div>
            {comment.author._id ===
              ((session.data?.user as any).user as IUser)._id && (
              <div className="relative">
                <button
                  className={`flex items-center gap-1 px-4 py-2 rounded ${
                    showOptions
                      ? "bg-gray-300 dark:bg-gray-700"
                      : "hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={handleToggleOptions}
                >
                  <IconDots className="text-blue-400" />
                </button>
                {showOptions && (
                  <div className="absolute top-[40px] bg-white dark:bg-dark-bg-primary rounded overflow-hidden shadow">
                    <Divider />
                    <button
                      className={`w-full flex items-center gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 `}
                    >
                      <IconEdit className="text-blue-400" />{" "}
                      <span className="w-20">Chỉnh sửa</span>
                    </button>
                    <button
                      className={`w-full flex items-center gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 `}
                      onClick={() => {
                        // setShowDeleteModal(true);
                        // console.log("s");
                        handleDeleteComment();
                      }}
                    >
                      <IconTrashX className="text-red-400" /> Xóa
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubComment;
