export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface CommentCreateRequest {
  comment: {
    body: string;
  };
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}