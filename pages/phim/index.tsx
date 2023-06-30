import { NextPage } from "next";
import Head from "next/head";
import Heading from "~/components/Heading";
import MovieList from "~/components/Movies";

const Movies: NextPage = () => {
  return (
    <>
      <Head>
        <title>Phim</title>
      </Head>
      <div className="bg-light-bg-primary dark:bg-dark-bg-primary">
        <Heading content="Phim" />
        <div className="container mx-auto">
          <MovieList type="grid" />
        </div>
      </div>
    </>
  );
};

export default Movies;
