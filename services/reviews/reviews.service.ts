import api from "../api/interceptors";
import { Review } from "@/types/review.type";
class ReviewsService {
  async create(data: Review): Promise<Review> {
    const res = await api.post("/reviews", data);
    return res.data;
  }
  async getAll(): Promise<Review[]> {
    const res = await api.get(`/reviews`);
    return res.data;
  }
  async getLastReviews(): Promise<Review[]> {
    const res = await api.get(`/reviews/lastReviews`);
    return res.data;
  }
  async getReview(id: number): Promise<Review> {
    const res = await api.get(`/reviews/byId/${id}`);
    return res.data;
  }
  async delete(id: number): Promise<Review> {
    const res = await api.delete(`/reviews/${id}`);
    return res.data;
  }
}

export default new ReviewsService();
