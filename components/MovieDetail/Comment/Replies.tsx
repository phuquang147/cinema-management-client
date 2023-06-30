import { FC } from "react";
import { IComment } from "~/interfaces/movie.interface";
import SubComment from "../SubComment";

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
        <SubComment
          key={reply._id}
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
