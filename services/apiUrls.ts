export const DOMAIN_NAME = process.env.NEXT_PUBLIC_BASE_URL;
export const DOMAIN_NAME_FILE_SERVICE =
  process.env.NEXT_PUBLIC_BASE_URL_FILE_SERVICE;

//AUTH
export const URL_LOGIN = `${DOMAIN_NAME}/auth/login`;
export const URL_SIGN_UP = `${DOMAIN_NAME}/auth/signup`;
export const URL_FORGOT_PASSWORD = `${DOMAIN_NAME}/auth/reset-password`;
export const URL_RESET_PASSWORD = `${DOMAIN_NAME}/auth/reset-password/change-password`;

//IMAGES
export const URL_POST_IMAGE = `${DOMAIN_NAME}/upload-image`;

// MOVIES
export const URL_GET_MOVIES = `${DOMAIN_NAME}/movies`;
export const URL_GET_MOVIE_BY_SLUG = (slug: string) =>
  `${DOMAIN_NAME}/movies/${slug}`;

//SNACKS
export const URL_GET_SNACKS = `${DOMAIN_NAME}/items`;

//POSTS
export const URL_GET_POSTS = `${DOMAIN_NAME}/posts`;
export const URL_GET_POST_BY_SLUG = (slug: string) =>
  `${DOMAIN_NAME}/posts/${slug}`;

//ACTORS
export const URL_GET_ACTORS = `${DOMAIN_NAME}/actors`;
export const URL_GET_ACTOR_BY_SLUG = (slug: string) =>
  `${DOMAIN_NAME}/actors/${slug}`;

//SHOW TIME
export const URL_GET_SHOW_TIMES_BY_DATE = (date: string) =>
  `${DOMAIN_NAME}/show-times?date=${date}`;
export const URL_GET_SHOW_TIME_BY_ID = (id: string) =>
  `${DOMAIN_NAME}/show-times/${id}`;

// TRANSACTIONS
export const URL_GET_TRANSACTIONS = `${DOMAIN_NAME}/transactions`;
export const URL_ADD_TRANSACTION = `${DOMAIN_NAME}/transactions`;
