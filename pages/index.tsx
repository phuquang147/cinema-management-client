import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import HeroSlider from "~/components/Home/HeroSlider";
import Movies from "~/components/Movies";
import Post from "~/components/Post";
import Button from "~/components/UI/Button";
import SectionHeading from "~/components/UI/SectionHeading";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getMovies } from "~/redux/slices/MovieSlice";
import { getPosts } from "~/redux/slices/PostSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Cinemate - Đặt vé phim ngay!</title>
      </Head>
      <div className="min-h-screen bg-white dark:bg-bgColor">
        <HeroSlider />
        <div className="container mx-auto">
          <SectionHeading text="Danh sách phim" />
          <Movies type="slide" />
          <SectionHeading text="Danh sách bài viết" className="mb-7" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button to="/bai-viet">Xem tất cả</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
