import api from "../api/interceptors";
import { ICreatePost, IPost, IUpdatePost } from "./post-service.interface";
class PostService {
  async loadMedia(file: File | null): Promise<string> {
    const bodyFormData = new FormData();
    if (file) {
      bodyFormData.append("image", file);
    }
    const res = await api.post("/post/loadMedia", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
  async createPost(data: ICreatePost): Promise<IPost> {
    const res = await api.post("/post/create", {
      title: data.title,
      content: data.content,
      header: data.header,
      media: data.media,
      description: data.description,
      keywords: data.keywords,
    });
    return res.data;
  }
  async getPostsList(skip: number, take: number): Promise<IPost[]> {
    const res = await api.get(`/post/getPosts?skip=${skip}&take=${take}`);
    return res.data;
  }
  async getPostsListForAdmin(skip: number, take: number): Promise<IPost[]> {
    const res = await api.get(`/post/getPostsAdmin?skip=${skip}&take=${take}`);
    return res.data;
  }
  async getLastPost(): Promise<IPost> {
    const res = await api.get("/post/last");
    return res.data;
  }
  async getPost(id: number): Promise<IPost> {
    const res = await api.get(`/post?id=${id}`);
    return res.data;
  }
  async publish(id: number): Promise<IPost> {
    const res = await api.get(`/post/publish?id=${id}`);
    return res.data;
  }
  async getPostForAdmin(id: number): Promise<IPost> {
    const res = await api.get(`/post/postAdmin?id=${id}`);
    return res.data;
  }
  async delete(id: number): Promise<IPost> {
    const res = await api.delete("/post", { data: { id } });
    return res.data;
  }
  async updatePost(data: IUpdatePost): Promise<IPost> {
    const res = await api.put("/post/update", {
      id: data.id,
      title: data.title,
      header: data.header,
      content: data.content,
      media: data.media,
      description: data.description,
      keywords: data.keywords,
    });
    return res.data;
  }
}

export default new PostService();
