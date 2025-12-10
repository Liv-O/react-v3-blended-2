import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";
import { EditedPost } from "../../types/post";

interface EditFormProps {
  editPostData: { id: number; title: string; body: string };

  closeModal: () => void;
}

export default function EditPostForm({ editPostData, closeModal }: EditFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newDataPost: EditedPost) => {
      return editPost(newDataPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post edited successfully!");
    },
  });

  const EditFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title can be maximum 50 characters long")
      .required("Title is required"),
    body: Yup.string()
      .max(500, "Content can have maximum 500 characters")
      .required("Content is required"),
  });

  const handleSubmit = async (values: EditedPost, actions: FormikHelpers<EditedPost>) => {
    try {
      await mutation.mutateAsync(values); // <-- чекаємо реальний API виклик

      actions.resetForm();
      closeModal();
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  return (
    <Formik initialValues={editPostData} onSubmit={handleSubmit} validationSchema={EditFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
