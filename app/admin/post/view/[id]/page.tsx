"use client";
import PostView from "@/components/PostView";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAuth } from "@/hooks/useAuth";
import { IDataResponse } from "@/services/info/info-service.interface";
import infoService from "@/services/info/info.service";
import postService from "@/services/post/post.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostAdmin({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [data, setData] = useState<IDataResponse | null>();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/admin/login"); // Перенаправлення на сторінку входу, якщо немає токену
      return;
    }
    const getData = async () => {
      const d = await infoService.getAllData();
      setData(d);
    };
    getData();
  }, [user]);
  if (user)
    return (
      <Container>
        <button
          className='bg-[#1a8917] rounded-xl p-[10px] text-white'
          onClick={() => router.push(`/admin/post/editor/${params.id}`)}
        >
          Back To Editor
        </button>
        <button
          className='bg-[#1a8917] rounded-xl p-[10px] text-white'
          onClick={() => postService.publish(Number(params.id))}
        >
          Publish
        </button>
        <div className='flex flex-col h-full min-h-[100vh] pointer-events-none'>
          <Header
            phone={data?.phone ? data.phone : ""}
            telegram={data?.telegram ? data.telegram : ""}
            telegramBot={data?.telegramBot ? data.telegramBot : ""}
          />
          <PostView postId={Number(params.id)} />
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
