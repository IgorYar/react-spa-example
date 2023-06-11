import { get } from "./api_helper";

const GET_POSTS = "/posts";

export const getPosts = () => get(GET_POSTS);