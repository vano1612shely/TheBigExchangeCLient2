export interface ICreatePost {
  title: string;
  content: string;
  header: string;
  description?: string;
  keywords?: string;
  media: string;
}
export interface IPost {
  id: number;
  createdAt: Date;
  type: string;
  title: string;
  header: string;
  views: number;
  description: string;
  content: string;
  keywords: string;
  media: IMedia[];
}
export interface IUpdatePost {
  id: number;
  title: string;
  content: string;
  media: string;
  description?: string;
  keywords?: string;
  header: string;
}
export interface IMedia {
  id: number;
  postId: number;
  url: string;
}
