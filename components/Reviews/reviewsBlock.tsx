import { ComponentPropsWithoutRef, FC, useEffect, useState } from "react";
import clsx from "clsx";
import { Review } from "@/types/review.type";
import StarRating from "@/components/Reviews/stars";
import moment from "moment/moment";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/navigation";
interface ReviewProps extends ComponentPropsWithoutRef<"div"> {
  reviews: Review[];
}

const Reviews: FC<ReviewProps> = ({
  className,
  children,
  reviews,
  ...rest
}) => {
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const locale = useLocale();
  const t = useTranslations("Index");
  const checkNumber = (number: number) => {
    if (number > reviews.length - 1) {
      return 0;
    } else if (number < 0) {
      return reviews.length - 1;
    }
    return number;
  };
  const changeReview = (index: number) => {
    setReviewIndex(index);
  };
  const next = () => {
    setReviewIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prev = () => {
    setReviewIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  return (
    <div
      {...rest}
      className={clsx(
        "relative pt-[100px] pb-[100px] border-t border-white",
        className,
      )}
    >
      <h2 className="font-bold text-[30px] leading-[42px] text-white text-center mb-[50px] lg:text-[36px]">
        {t("reviewsTitle1")}{" "}
        <span className="text-[#ffb932]">{t("reviewsTitle2")}</span>
      </h2>
      <div className="px-[50px]">
        <div className="mx-auto drop-shadow-3xl-light bg-[#1a1c1e] p-5 rounded-[10px]">
          <ul className="w-full">
            {reviews.map((review, index) => {
              return (
                <li key={index} hidden={reviewIndex !== index}>
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
                </li>
              );
            })}
          </ul>
          <div className="w-[300px]">
            <button
              onClick={prev}
              className="w-[40px] h-[40px] rounded-[50px] absolute left-[-50px] top-[calc(50%_-_20px)] font-bold bg-none"
            >
              <ChevronLeft
                size={40}
                className="hover:text-[#ffb932] duration-200 ease-linear"
              />
            </button>
            <button
              onClick={next}
              className="w-[40px] h-[40px] rounded-[50px] absolute right-[-50px] top-[calc(50%_-_20px)] font-bold bg-none"
            >
              <ChevronRight
                size={40}
                className="hover:text-[#ffb932] duration-200 ease-linear"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex mx-auto pt-[10px] max-w-[80px] items-center justify-around mb-[20px]">
        {reviews.map((review, index) => {
          return (
            <button
              onClick={() => changeReview(index)}
              key={index}
              className={clsx(
                "w-[10px] h-[10px] rounded-[50px] duration-200 ease-linear",
                index == reviewIndex ? "bg-[#ffb932]" : "bg-[#e5e7eb]",
              )}
            ></button>
          );
        })}
      </div>
      <div className="mx-auto w-[250px]">
        <Link href="/reviews">
          <button className="bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[100%] md:w-[250px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]">
            {t("more")}
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Reviews;
