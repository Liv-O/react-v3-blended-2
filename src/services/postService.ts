import axios from "axios";
import { NewPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface HTTPGetResponse {
  posts: Post[];
  totalPages: number;
}

export const fetchPosts = async (searchText: string, page: number): Promise<HTTPGetResponse> => {
  const getParams = { params: { q: searchText, _page: page, _limit: 12 } };
  const data = await axios.get<Post[]>("/posts", getParams);
  console.log(data);
  const totalCount = Number(data.headers["x-total-count"]);

  return {
    posts: data.data,
    totalPages: totalCount,
  };
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const data = await axios.post<Post>("/posts", newPost);
  console.log(data);
  return data.data;
};

export const editPost = async (newDataPost: Post): Promise<Post> => {
  const data = await axios.patch<Post>(`/posts/:${newDataPost.id}`, newDataPost);
  console.log(data);
  return data.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const data = await axios.delete<Post>(`/posts/:${postId}`);
  console.log(data);
  return data.data;
};
