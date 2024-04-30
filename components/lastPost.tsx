import { URL } from "@/services/api/interceptors";
import { IPost } from "@/services/post/post-service.interface";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
export default function LastPost({ post }: { post: IPost }) {
  const locale = useLocale();
  return (
    <div className="w-full relative mb-[100px]">
      <Link href={`/blog/${post.id}`}>
        <div className="w-full relative">
          <Image
            width={500}
            height={500}
            alt=""
            src={URL + "/" + post.header}
            className="w-full md:h-[600px] object-cover rounded-lg"
          />
          <div className="rounded-lg md:absolute bottom-[-60px] md:w-[600px] md:h-[300px] bg-white left-[60px] p-[40px]">
            <h2 className="text-[24px] md:text-[36px] text-[#1a1c1e] mb-[30px]">
              {post.title}
            </h2>
            <p className="text-[16px] text-[#97989F]">
              {moment(post.createdAt).locale(locale).format("LL")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
