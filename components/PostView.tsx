import { IPost } from "@/services/post/post-service.interface";
import { useEffect, useState } from "react";
import Loader from "./loader";
import postService from "@/services/post/post.service";
import "react-quill/dist/quill.bubble.css";
import moment from "moment";
import "moment/locale/ru";
import Image from "next/image";
import { URL } from "@/services/api/interceptors";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import "./quill.css";
export default function PostView({ postId }: { postId: number }) {
  const [post, setPost] = useState<IPost | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getPosts = async () => {
      const data = await postService.getPostForAdmin(postId);
      if (!data) {
        router.push("/admin");
      }
      setPost(data);
    };
    getPosts();
  }, []);
  if (!post) return <Loader />;
  return (
    <div>
      <div>
        <h1 className='text-[36px] mb-[20px] font-bold'>{post.title}</h1>
        <p className='text-[#696A75] text-[14px] mb-[36px]'>
          {moment(post.createdAt).locale("ru").format("LL")}
        </p>
      </div>
      <Image
        width={500}
        height={500}
        src={URL + "/" + post.header}
        alt=''
        className='w-full max-h-[400px] object-cover rounded-lg mb-[32px]'
      />
      <ReactQuill value={post.content} readOnly={true} theme={"bubble"} />
    </div>
  );
}
