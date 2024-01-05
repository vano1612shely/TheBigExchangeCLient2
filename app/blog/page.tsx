"use client";
import Blog from "@/components/Blog";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { IDataResponse } from "@/services/info/info-service.interface";
import infoService from "@/services/info/info.service";
import { useEffect, useState } from "react";
export default function BlogPage() {
  const [data, setData] = useState<IDataResponse | null>();
  useEffect(() => {
    const getData = async () => {
      const d = await infoService.getAllData();
      setData(d);
    };
    getData();
  }, []);
  return (
    <Container>
      <div className='flex flex-col h-full min-h-[100vh]'>
        <Header
          phone={data?.phone ? data.phone : ""}
          telegram={data?.telegram ? data.telegram : ""}
          telegramBot={data?.telegramBot ? data.telegramBot : ""}
        />
        <Blog />
        <Footer
          phone={data?.phone ? data.phone : ""}
          instagram={data?.instagram ? data.instagram : ""}
          telegram={data?.telegram ? data.telegram : ""}
          address={data?.address ? data.address : ""}
          telegramBot={data?.telegramBot ? data.telegramBot : ""}
        />
      </div>
    </Container>
  );
}
