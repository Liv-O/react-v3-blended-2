import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/postService";
import { EditedPost, Post } from "../../types/post";
import css from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: EditedPost) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost }: PostListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      return deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post deleted successfully!");
    },
  });

  const handleDelete = (postId: number) => {
    mutation.mutateAsync(postId);
  };
  return (
    <ul className={css.list}>
      {posts.map((post) => {
        return (
          <li key={post.id} className={css.listItem}>
            <h2 className={css.title}>{post.title}</h2>
            <p className={css.content}>{post.body}</p>
            <div className={css.footer}>
              <button
                className={css.edit}
                onClick={() => {
                  toggleModal();
                  toggleEditPost({ id: post.id, title: post.title, body: post.body });
                }}
              >
                Edit
              </button>
              <button className={css.delete} onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
