import Axios from "axios";
import { URL_GET_ACTORS, URL_GET_ACTOR_BY_SLUG } from "./apiUrls";

const ActorServices = {
  getActors: () => {
    return Axios({
      url: URL_GET_ACTORS,
      method: "GET",
    });
  },
  getActorBySlug: (slug: string) => {
    return Axios({
      url: URL_GET_ACTOR_BY_SLUG(slug),
      method: "GET",
    });
  },
};

export default ActorServices;
