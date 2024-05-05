import Modal from "@/components/Reviews/ReviewModal";
import StarsPicker from "@/components/Reviews/StarsPicker";
import reviewsService from "@/services/reviews/reviews.service";
import React, { useEffect, useState } from "react";
import { Review } from "@/types/review.type";
import infoService from "@/services/info/info.service";
import Loader from "@/components/loader";
import { IDataResponse } from "@/services/info/info-service.interface";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import StarRating from "@/components/Reviews/stars";
import { Trash } from "lucide-react";
const ReviewAdminForm = () => {
  const [data, setData] = useState<IDataResponse>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stars, setStars] = useState<number>(0);
  const [reviewData, setReviewData] = useState<Review>();
  const getData = async () => {
    const res = await infoService.getAllData();
    const rev = await reviewsService.getAll();
    if (res) setData(res);
    if (rev) setReviews(rev);
  };
  useEffect(() => {
    getData();
  }, []);
  if (!data) {
    return <Loader />;
  }
  return (
    <div className="p-[30px]">
      <Modal>
        <Modal.Button className="block bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[100%] md:w-[250px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]">
          Добавить
        </Modal.Button>
        <Modal.Content>
          <form
            className="text-zinc-900 flex flex-col gap-3 mb-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Name:"
              className="p-2 rounded"
              value={reviewData?.name}
              onChange={(e) => {
                setReviewData({ ...reviewData, name: e.target.value });
              }}
            />
            <input
              type="text"
              name="country"
              placeholder="Country:"
              className="p-2 rounded"
              value={reviewData?.country}
              onChange={(e) => {
                setReviewData({ ...reviewData, country: e.target.value });
              }}
            />
            <input
              name="requested_order_ship_date"
              type="date"
              className="p-2 rounded"
              value={moment(reviewData?.date).format("YYYY-MM-DD")}
              onChange={(e) => {
                setReviewData({
                  ...reviewData,
                  date: new Date(e.target.value),
                });
              }}
            />
            <textarea
              name="review"
              id="review"
              placeholder="Review: "
              className="p-2 rounded min-h-[100px]"
              value={reviewData?.review}
              onChange={(e) => {
                setReviewData({ ...reviewData, review: e.target.value });
              }}
            ></textarea>
            <StarsPicker
              count={5}
              selected={reviewData?.stars ? reviewData?.stars : 0}
              pick={(index) => {
                setReviewData({ ...reviewData, stars: index });
                setStars(index);
              }}
            />
          </form>
          <div className="flex gap-5">
            <Modal.CloseButton
              onClick={async () => {
                if (reviewData) {
                  const res = await reviewsService.create(reviewData);
                  await getData();
                  setReviewData({});
                }
              }}
              className="bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]"
            >
              Save
            </Modal.CloseButton>
            <Modal.CloseButton>Close</Modal.CloseButton>
          </div>
        </Modal.Content>
      </Modal>
      <div className="pt-[20px]">
        <h2 className="font-bold mb-[10px]">Отзывы:</h2>
        <ul className="flex flex-col gap-2">
          {reviews.map((review, index) => {
            return (
              <div key={index} className="border rounded p-5">
                <div className="flex gap-10 items-center mb-[20px] justify-between">
                  <h3 className="font-bold text-xl">
                    {review.name}
                    {review.country ? ", " + review.country : ""}
                  </h3>
                  <StarRating rating={review.stars ? review.stars : 0} />
                  <button
                    onClick={async () => {
                      if (review.id) {
                        const res = await reviewsService.delete(review.id);
                        await getData();
                      }
                    }}
                  >
                    <Trash className="hover:text-red-500 duration-300 ease-linear" />
                  </button>
                </div>
                <div className="flex justify-between">
                  <p className="text-[18px] mb-[10px]">{review.review}</p>
                  <span className="text-[#97989F] text-right">
                    {moment(review.date).format("LL")}
                  </span>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReviewAdminForm;
