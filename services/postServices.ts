import Axios from "axios";
import { URL_GET_POSTS, URL_GET_POST_BY_SLUG } from "./apiUrls";

const PostServices = {
  getPosts: () => {
    return Axios({
      url: URL_GET_POSTS,
      method: "GET",
    });
  },
  getPostBySlug: (slug: string) => {
    return Axios({
      url: URL_GET_POST_BY_SLUG(slug),
      method: "GET",
    });
  },
};

export default PostServices;
