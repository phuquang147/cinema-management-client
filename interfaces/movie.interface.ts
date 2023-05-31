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
  premiereDate: Date;
  endDay: Date;
  language: string;
  trailer: string;
  slug: string;
}
