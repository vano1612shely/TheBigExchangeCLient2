import { IPost } from "@/services/post/post-service.interface";
import Loader from "./loader";
import moment from "moment";
import "moment/locale/ru";
import Image from "next/image";
import { URL } from "@/services/api/interceptors";
import "react-quill/dist/quill.bubble.css";
// import ReactQuill from "react-quill";
// import PostContent from "./PostContent";
export default function Post({ post }: { post: IPost }) {
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
      <div
        className='ql-editor'
        style={{ fontFamily: "Raleway !important" }}
        id='content'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
