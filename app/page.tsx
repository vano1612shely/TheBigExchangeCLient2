"use client";
import Container from "@/components/container";
import SeoBlock from "@/components/seo-block";
import Exchange from "@/components/exchange";
import Department from "@/components/department";
import { useEffect, useState } from "react";
import OurServices from "@/components/ourServices";
import Header from "@/components/header";
import Footer from "@/components/footer";
import infoService from "@/services/info/info.service";
import { IDataResponse } from "@/services/info/info-service.interface";
import Loader from "@/components/loader";

export default function Home() {
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
  useEffect(() => {
    const getData = async () => {
      const res = await infoService.getAllData();
      if (res) setData(res);
    };
    getData();
  }, []);
  if (!data) {
    return <Loader />;
  }
  return (
    <>
      {/* {data ? ( */}
      <>
        <Container>
          <Header
            phone={data?.phone}
            telegram={data?.telegram}
            telegramBot={data?.telegramBot}
          />
        </Container>
        <Container className='mb-[100px]'>
          <div className='flex flex-row h-[50px]'>
            <button
              onClick={() => setExchangeType("offline")}
              className={`font-bold text-white relative z-20 h-full flex items-center ${
                exchangeType === "offline"
                  ? "bg-[#2f2f2f] border-[#ffb932]"
                  : "bg-[#1a1c1e] border-[#1a1c1e]"
              } border px-[30px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
            >
              Офлайн
            </button>
            <button
              onClick={() => setExchangeType("online")}
              className={`font-bold text-white relative z-20 h-full flex items-center ${
                exchangeType === "online"
                  ? "bg-[#2f2f2f] border-[#ffb932]"
                  : "bg-[#1a1c1e] border-[#1a1c1e]"
              } border px-[30px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
            >
              Онлайн
            </button>
            <button
              onClick={() => setExchangeType("transaction")}
              className={`font-bold text-white relative z-20 h-full flex items-center ${
                exchangeType === "transaction"
                  ? "bg-[#2f2f2f] border-[#ffb932]"
                  : "bg-[#1a1c1e] border-[#1a1c1e]"
              } border px-[10px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
            >
              Перевод средств
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
      {/* ) : (
        <Loader />
      )} */}
    </>
  );
}
