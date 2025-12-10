import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import { NewPost } from "../../types/post";

interface PostFormValues {
  title: string;
  body: string;
}
const initialValues: PostFormValues = {
  title: "",
  body: "",
};

interface PostFormProps {
  closeModal: () => void;
}

export default function PostForm({ closeModal }: PostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newNoteInfo: NewPost) => {
      return createPost(newNoteInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post created successfully!");
    },
  });

  const PostFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title can be maximum 50 characters long")
      .required("Title is required"),
    body: Yup.string()
      .max(500, "Content can have maximum 500 characters")
      .required("Content is required"),
  });

  const handleSubmit = async (values: PostFormValues, actions: FormikHelpers<PostFormValues>) => {
    try {
      await mutation.mutateAsync(values); // <-- чекаємо реальний API виклик

      actions.resetForm();
      closeModal();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
