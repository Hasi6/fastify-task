export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch',
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
}

export const API_ROUTES = {
  POSTS: {
    ALL: '/posts',
  },
  REVIEWS: {
    POST_ID: '/reviews/post/#{post_id}',
    ADD: '/reviews',
  },
};
