import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import NewPosts from "~/components/Posts/NewPosts";
import QuickBooking from "~/components/QuickBooking";
import IPost from "~/interfaces/post.interface";
import PostServices from "~/services/postServices";
import { ISOToDateFormat } from "~/utils/formatDateTime";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await PostServices.getPostBySlug(
    context.query.slug as string
  );

  return {
    props: data,
  };
};

const Post: NextPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="bg-dark-bg-primary">
        <div className="container mx-auto py-10 grid grid-cols-3 gap-4">
          <div className="col-span-3 lg:col-span-2">
            <h1 className="text-gray-text dark:text-light-text text-4xl mb-4">
              {post.title}
            </h1>
            <p className="text-gray-text dark:text-light-text text-sm mb-10">
              {`Ngày đăng: ${ISOToDateFormat((post as IPost).createdAt)} - ${
                (post as IPost).view
              } lượt xem`}
            </p>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            ></div>
            {/* <NewPosts /> */}
          </div>
          <div className="col-span-0 lg:col-span-1">
            <QuickBooking />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
