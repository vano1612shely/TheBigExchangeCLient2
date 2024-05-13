"use client";
import { useEffect, useState } from "react";
import Container from "@/components/container";
import { IDataResponse } from "@/services/info/info-service.interface";
import infoService from "@/services/info/info.service";
import Loader from "@/components/loader";
import Header from "@/components/header";
import Exchange from "@/components/exchange";
import SeoBlock from "@/components/seo-block";
import Department from "@/components/department";
import OurServices from "@/components/ourServices";
import Footer from "@/components/footer";
import { useMessages, useTranslations } from "next-intl";
import Reviews from "@/components/Reviews/reviewsBlock";
import { Review } from "@/types/review.type";
import reviewsService from "@/services/reviews/reviews.service";

export default function MainPage() {
  const t = useTranslations("Index");
  const [exchangeType, setExchangeType] = useState<
    "transaction" | "online" | "offline"
  >("offline");
  const [data, setData] = useState<IDataResponse>({
    telegram: "",
    telegramBot: "",
    phone: "",
    instagram: "",
    exchange: 1,
    address: "",
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await infoService.getAllData();
      const rev = await reviewsService.getLastReviews();
      if (res) setData(res);
      if (rev) setReviews(rev);
    };
    getData();
  }, []);
  if (!data) {
    return <Loader />;
  }
  return (
    <>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KP95JLCT"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
      <Container>
        <Header
          phone={data?.phone}
          telegram={data?.telegram}
          telegramBot={data?.telegramBot}
        />
      </Container>
      <Container className="mb-[100px]">
        <div className="flex flex-row h-[50px]">
          <button
            onClick={() => setExchangeType("offline")}
            className={`text-[12px] md:text-[14px]  font-bold text-white relative z-20 h-full flex items-center ${
              exchangeType === "offline"
                ? "bg-[#2f2f2f] border-[#ffb932]"
                : "bg-[#1a1c1e] border-[#1a1c1e]"
            } border px-[30px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
          >
            {t("branch")}
          </button>
          <button
            onClick={() => setExchangeType("online")}
            className={`text-[12px] md:text-[14px]  font-bold text-white relative z-20 h-full flex items-center ${
              exchangeType === "online"
                ? "bg-[#2f2f2f] border-[#ffb932]"
                : "bg-[#1a1c1e] border-[#1a1c1e]"
            } border px-[30px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
          >
            {t("CardBank")}
          </button>
          <button
            onClick={() => setExchangeType("transaction")}
            className={`text-[12px] md:text-[14px] font-bold text-white relative z-20 h-full flex items-center ${
              exchangeType === "transaction"
                ? "bg-[#2f2f2f] border-[#ffb932]"
                : "bg-[#1a1c1e] border-[#1a1c1e]"
            } border px-[10px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
          >
            {t("cashTransfer")}
          </button>
        </div>
        <Exchange type={exchangeType} />
      </Container>
      <Container>
        <SeoBlock />
      </Container>
      <Container>
        <Department />
      </Container>
      <Container>
        <OurServices />
      </Container>
      {reviews ? (
        <Container>
          <Reviews reviews={reviews} />
        </Container>
      ) : (
        ""
      )}
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
