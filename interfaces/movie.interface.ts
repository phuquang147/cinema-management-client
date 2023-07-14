export interface IComment {
  author: { _id: string; name: string };
  comment: string;
  createdAt: string;
  dislikes: string[];
  isReply: true;
  likes: string[];
  replies: IComment[];
  updatedAt: string;
  _id: string;
}
export default interface IMovie {
  _id: string;
  name: string;
  description: string;
  genres: { id: string; name: string }[];
  actors: { id: string; name: string }[];
  director: string;
  thumbnail: string;
  images: string[];
  duration: number;
  premiereDay: string;
  endDay: string;
  language: string;
  trailer: string;
  slug: string;
  comments: IComment[];
  totalScore: number;
}
