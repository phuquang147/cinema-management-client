import { FC } from "react";
import { IComment } from "~/interfaces/movie.interface";
import Comment from "./index";

type RepliesProps = {
  comment: IComment;
  movieId: string;
  handleUpdateComments: (comments: IComment[]) => void;
};

const Replies: FC<RepliesProps> = ({
  comment,
  movieId,
  handleUpdateComments,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {comment.replies.map((reply) => (
        <Comment
          key={reply._id}
          type="child"
          parentComment={comment._id}
          comment={reply}
          handleUpdateComments={handleUpdateComments}
          movieId={movieId}
        />
      ))}
    </div>
  );
};

export default Replies;
