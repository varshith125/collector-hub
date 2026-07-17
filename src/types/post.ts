export interface Comment {
  id: string;
  userName: string;
  content: string;
  commentedAt: string;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  postedAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
  category?: string;
  commentsList?: Comment[];
}

