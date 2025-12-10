export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface NewPost {
  title: string;
  body: string;
}

export interface EditedPost {
  id: number;
  title: string;
  body: string;
}
