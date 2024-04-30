import { URL } from "@/services/api/interceptors";
import { IPost } from "@/services/post/post-service.interface";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
export default function PostCard({ post }: { post: IPost }) {
  const locale = useLocale();
  return (
    <Link
      href={`/blog/${post.id}`}
      className="max-w-[360px] md:h-[440px] flex flex-col bg-[#1a1c1e]"
    >
      <Image
        src={URL + "/" + post.header}
        width={360}
        height={240}
        alt=""
        className="rounded mb-[16px]"
      />
      <h2 className="text-[24px] font-bold mb-[20px] text-[#ffb932] text-left">
        {post.title}
      </h2>
      <p className="text-[#97989F] text-[16px] text-right mt-auto mb-[5px]">
        {moment(post.createdAt).locale(locale).format("LL")}
      </p>
    </Link>
  );
}
