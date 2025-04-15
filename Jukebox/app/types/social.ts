export interface User {
  userId: string;
  username: string;
  profilePicture?: string;
}

export interface Post {
  postId: string;
  content: string;
  createdAt: string;
  userId: string;
  likes: number;
  comments: string[];
} 