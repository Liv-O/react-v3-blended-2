import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";
import { EditedPost } from "../../types/post";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import Loader from "../Loader/Loader";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editedPost, setEditedPost] = useState<EditedPost>({ id: 0, title: "", body: "" });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ? Math.ceil(data?.totalPages / 12) : 0;

  const updateSearchQuery = useDebouncedCallback((search) => {
    setSearchQuery(search);
    setCurrentPage(1);
  }, 300);

  const createPost = () => {
    setIsModalOpen(true);
    setIsCreatePost(true);
  };

  const editPostToggle = () => {
    setIsModalOpen(true);
    setIsEditPost(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isCreatePost) {
      setIsCreatePost(false);
    } else setIsEditPost(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={createPost}>
          Create post
        </button>
      </header>
      <main>
        {isLoading && <Loader />}
        {isError && <p>There was an error, please try again...</p>}
        {data?.posts && (
          <PostList
            posts={data.posts}
            toggleEditPost={setEditedPost}
            toggleModal={editPostToggle}
          />
        )}
      </main>
      {isModalOpen && isCreatePost && (
        <Modal onClose={closeModal}>
          <CreatePostForm closeModal={closeModal} />
        </Modal>
      )}
      {isModalOpen && isEditPost && (
        <Modal onClose={closeModal}>
          <EditPostForm editPostData={editedPost} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
