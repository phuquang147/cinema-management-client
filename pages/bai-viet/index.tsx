import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import Heading from "~/components/Heading";
import Post from "~/components/Post";
import QuickBooking from "~/components/QuickBooking";
import TextField from "~/components/UI/TextField";
import useDebounce from "~/hooks/useDebounce";
import IPost from "~/interfaces/post.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getPosts } from "~/redux/slices/PostSlice";

const Posts: NextPage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loadedPosts, setLoadedPosts] = useState<IPost[]>([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setLoadedPosts(posts);
  }, [posts]);

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedPosts(posts);
    }

    if (debouncedValue !== "") {
      const relevantPosts = posts.filter((item) =>
        item.title.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setLoadedPosts(relevantPosts);
    }
  }, [debouncedValue, posts]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  return (
    <>
      <Head>
        <title>Bài viết</title>
      </Head>
      <div className="bg-light-bg-primary dark:bg-dark-bg-primary">
        <Heading content="Bài viết" />
        <div className="container mx-auto py-10 grid grid-cols-3 gap-10">
          <div className="col-span-3 lg:col-span-2">
            <div className="w-full p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary flex gap-4 rounded-lg">
              <div className="flex-1 flex flex-col gap-1 max-w-[300px]">
                <p className="text-gray-text dark:text-light-text">Tìm kiếm</p>
                <TextField
                  placeholder="Tìm kiếm"
                  containerClassName="col-span-8"
                  inputClassName="bg-dark-bg-primary text-white"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-10">
              {loadedPosts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </div>
          <div className="col-span-0 lg:col-span-1">
            <QuickBooking />
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
