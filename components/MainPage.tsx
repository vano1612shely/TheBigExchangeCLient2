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
        <Exchange />
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
