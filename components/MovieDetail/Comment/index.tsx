import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconEdit,
  IconMessagePlus,
  IconThumbDown,
  IconThumbUp,
  IconTrashX,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import Swal from "sweetalert2";
import Divider from "~/components/UI/Divider";
import useClickOutside from "~/hooks/useClickOutside";
import { IComment } from "~/interfaces/movie.interface";
import IUser from "~/interfaces/user.interface";
import { useAppDispatch } from "~/redux/hooks";
import {
  deleteComment,
  reactComment,
  updateComment,
} from "~/redux/slices/MovieSlice";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import Replies from "./Replies";
import ReplyForm from "./ReplyForm";

type CommentProps = {
  comment: IComment;
  movieId: string;
  handleUpdateComments: (comments: IComment[]) => void;
};

const Comment: FC<CommentProps> = ({
  comment,
  movieId,
  handleUpdateComments,
}) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);

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

  const handleUpdateComment = () => {
    Swal.fire({
      title: "Chỉnh sửa bình luận",
      input: "text",
      inputValue: comment.comment,
      inputAttributes: {
        autocapitalize: "off",
      },
      color: localStorage.getItem("theme") === "dark" ? "#ccc" : "#333",
      background:
        localStorage.getItem("theme") === "dark" ? "#222831" : "#f1ece5",
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      confirmButtonColor: "#f45e61",
      cancelButtonText: "Hủy",
      preConfirm: (comment) => {
        if (comment.length === 0)
          Swal.showValidationMessage(`Vui lòng nhập bình luận`);
      },
    }).then((result) => {
      dispatch(
        updateComment({
          commentId: comment._id,
          comment: {
            comment: result.value as unknown as string,
            movie: movieId,
          },
          jwt: (session as any).data?.user.token,
          handleUpdateComments,
        })
      );
    });
  };

  const handleDeleteComment = () => {
    Swal.fire({
      icon: "question",
      text: "Xác nhận xóa bình luận",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "#f45e61",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteComment({
            commentId: comment._id,
            jwt: (session as any).data?.user.token,
            parentComment: null,
            movie: movieId,
            handleUpdateComments,
          })
        );
      }
    });
  };

  const handleToggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
  };

  const handleToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const handleToggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleCloseOptions = () => {
    setShowOptions(false);
  };

  useClickOutside(optionsRef, handleCloseOptions);

  return (
    <div className="flex flex-col items-end gap-4">
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src="/assets/images/user.png"
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
      <div className="w-full flex flex-col bg-light-gray-bg dark:bg-dark-bg-secondary text-gray-text dark:text-light-text p-6 rounded divide-y divide-gray-300 dark:divide-gray-600">
        <p className="mb-2">{comment.comment}</p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex justify-start gap-1">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                session.data &&
                comment.likes.includes(
                  ((session.data?.user as any).user as IUser)._id
                ) &&
                "bg-gray-200 dark:bg-gray-700"
              } ${session.data && "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              disabled={!session.data}
              onClick={handleLikeComment}
            >
              <IconThumbUp className="text-green-400" /> {comment.likes.length}
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                session.data &&
                comment.dislikes.includes(
                  ((session.data?.user as any).user as IUser)._id
                ) &&
                "bg-gray-200 dark:bg-gray-700"
              } ${session.data && "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              disabled={!session.data}
              onClick={handleDisLikeComment}
            >
              <IconThumbDown className="text-red-400" />{" "}
              {comment.dislikes.length}
            </button>
            {session.data && (
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
            )}
          </div>
          <div className="flex items-center gap-1">
            {comment.replies.length > 0 && (
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded ${
                  showReplies
                    ? "bg-gray-300 dark:bg-gray-700"
                    : "hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={handleToggleReplies}
              >
                {showReplies ? (
                  <IconChevronUp className="text-blue-400" />
                ) : (
                  <IconChevronDown className="text-blue-400" />
                )}
              </button>
            )}
            {session.data &&
              comment.author._id ===
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
                    <div
                      ref={optionsRef}
                      className="absolute top-[40px] bg-white dark:bg-dark-bg-primary rounded overflow-hidden shadow z-40"
                    >
                      <Divider />
                      <button
                        className={`w-full flex items-center gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 `}
                        onClick={handleUpdateComment}
                      >
                        <IconEdit className="text-blue-400" />{" "}
                        <span className="w-20">Chỉnh sửa</span>
                      </button>
                      <button
                        className={`w-full flex items-center gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 `}
                        onClick={handleDeleteComment}
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
      <div className="w-5/6">
        {showReplies && (
          <Replies
            comment={comment}
            movieId={movieId}
            handleUpdateComments={handleUpdateComments}
          />
        )}
        {showReplyForm && (
          <ReplyForm
            comment={comment}
            movieId={movieId}
            handleUpdateComments={handleUpdateComments}
          />
        )}
      </div>
    </div>
  );
};
export default Comment;
