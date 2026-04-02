export interface CommentResponse {
  id: number;
  content: string;
  writer: string;
  createdAt: string;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  comments: CommentResponse[];
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
