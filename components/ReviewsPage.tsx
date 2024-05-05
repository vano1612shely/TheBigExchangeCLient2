"use client";
import React, { useEffect, useState } from "react";
import { IDataResponse } from "@/services/info/info-service.interface";
import infoService from "@/services/info/info.service";
import Loader from "@/components/loader";
import Container from "@/components/container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Review } from "@/types/review.type";
import reviewsService from "@/services/reviews/reviews.service";
import Modal from "@/components/Reviews/ReviewModal";
import StarsPicker from "@/components/Reviews/StarsPicker";
import Stars from "@/components/Reviews/stars";
import StarRating from "@/components/Reviews/stars";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
export default function ReviewsPageBlock() {
  const locale = useLocale();
  const t = useTranslations("Index");
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
    <>
      <Container>
        <Header
          phone={data?.phone}
          telegram={data?.telegram}
          telegramBot={data?.telegramBot}
        />
      </Container>
      <Container>
        <Modal>
          <Modal.Button className="block mx-auto bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[100%] md:w-[250px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]">
            {t("addReview")}
          </Modal.Button>
          <Modal.Content>
            <form
              className="text-zinc-900 flex flex-col gap-3 mb-5"
              onSubmit={async (e) => {
                e.preventDefault();
                if (reviewData) {
                  const res = await reviewsService.create(reviewData);
                  await getData();
                  setReviewData({});
                }
              }}
            >
              <input
                type="text"
                required
                name="name"
                placeholder={`${t("name")}:`}
                className="p-2 rounded"
                value={reviewData?.name}
                onChange={(e) => {
                  setReviewData({ ...reviewData, name: e.target.value });
                }}
              />
              <input
                type="text"
                name="country"
                placeholder={`${t("country")}:`}
                className="p-2 rounded"
                value={reviewData?.country}
                onChange={(e) => {
                  setReviewData({ ...reviewData, country: e.target.value });
                }}
              />
              <textarea
                name="review"
                id="review"
                required
                placeholder={`${t("review")}:`}
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
              <div className="flex gap-5">
                <button className="bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]">
                  {t("save")}
                </button>
                <Modal.CloseButton className="text-white">
                  {t("close")}
                </Modal.CloseButton>
              </div>
            </form>
          </Modal.Content>
        </Modal>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry className="mb-[50px] mt-[50px]" gutter="20px">
            {reviews.map((review, index) => {
              return (
                <div key={index} className="border rounded p-5">
                  <div className="flex gap-10 items-center mb-[20px] justify-between">
                    <h3 className="font-bold text-xl">
                      {review.name}
                      {review.country ? ", " + review.country : ""}
                    </h3>
                    <StarRating rating={review.stars ? review.stars : 0} />
                  </div>
                  <div>
                    <p className="text-[18px] mb-[10px]">{review.review}</p>
                    <span className="text-[#97989F] text-right">
                      {moment(review.date).locale(locale).format("LL")}
                    </span>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
      <Container>
        <Footer
          phone={data.phone}
          instagram={data.instagram}
          telegram={data.telegram}
          address={data.address}
          telegramBot={data.telegramBot}
        />
      </Container>
    </>
  );
}
