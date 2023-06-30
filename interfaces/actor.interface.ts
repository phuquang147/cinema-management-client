export type MovieOfActor = {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
};

export default interface IActor {
  _id: string;
  name: string;
  birthday: string;
  nation: string;
  story: string;
  images: string[];
  movies: MovieOfActor[];
  avatar: string;
  slug: string;
}
