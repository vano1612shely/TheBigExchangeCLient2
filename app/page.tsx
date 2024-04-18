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
  //@ts-ignore
  function f(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  }
  useEffect(() => {
    f(window, document, "script", "dataLayer", "GTM-KP95JLCT");
  }, []);
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
      <iframe
        src='https://www.googletagmanager.com/ns.html?id=GTM-KP95JLCT'
        height='0'
        width='0'
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
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
              className={`text-[12px] md:text-[14px]  font-bold text-white relative z-20 h-full flex items-center ${
                exchangeType === "offline"
                  ? "bg-[#2f2f2f] border-[#ffb932]"
                  : "bg-[#1a1c1e] border-[#1a1c1e]"
              } border px-[30px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
            >
              Отделение
            </button>
            <button
              onClick={() => setExchangeType("online")}
              className={`text-[12px] md:text-[14px]  font-bold text-white relative z-20 h-full flex items-center ${
                exchangeType === "online"
                  ? "bg-[#2f2f2f] border-[#ffb932]"
                  : "bg-[#1a1c1e] border-[#1a1c1e]"
              } border px-[30px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
            >
              Карта/счет банка
            </button>
            <button
              onClick={() => setExchangeType("transaction")}
              className={`text-[12px] md:text-[14px] font-bold text-white relative z-20 h-full flex items-center ${
                exchangeType === "transaction"
                  ? "bg-[#2f2f2f] border-[#ffb932]"
                  : "bg-[#1a1c1e] border-[#1a1c1e]"
              } border px-[10px] rounded-tl-[10px] rounded-tr-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]`}
            >
              Передача наличных
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
