import Post from "@/components/Post";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "react-quill/dist/quill.snow.css";
import { URL } from "@/services/api/interceptors";
import { IDataResponse } from "@/services/info/info-service.interface";
import axios from "axios";
import { IPost } from "@/services/post/post-service.interface";
import type { Metadata, ResolvingMetadata } from "next";
const fetchInfo = async (): Promise<IDataResponse> => {
  const res = await axios.get(URL + "/info/getAll");
  return res.data;
};
const fetchPost = async (id: number): Promise<IPost> => {
  const res = await axios.get(URL + `/post?id=${id}`);
  return res.data;
};
const fetchView = async (id: number): Promise<IPost> => {
  const res = await axios.get(URL + `/post/view?id=${id}`);
  return res.data;
};
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const post = await fetchPost(Number(params.id));
  return {
    title: post.title,
    description: "post.description",
    keywords: "post.keywords",
  };
}
export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchInfo();
  const post = await fetchPost(Number(params.id));
  await fetchView(Number(params.id));
  return (
    <>
      <Container>
        <div className='flex flex-col h-full min-h-[100vh]'>
          <Header
            phone={data?.phone ? data.phone : ""}
            telegram={data?.telegram ? data.telegram : ""}
            telegramBot={data?.telegramBot ? data.telegramBot : ""}
          />
          <Post post={post} />
          <Footer
            phone={data?.phone ? data.phone : ""}
            instagram={data?.instagram ? data.instagram : ""}
            telegram={data?.telegram ? data.telegram : ""}
            address={data?.address ? data.address : ""}
            telegramBot={data?.telegramBot ? data.telegramBot : ""}
          />
        </div>
      </Container>
    </>
  );
}
