import { useState } from "react";
import PostsListAdminForm from "./postsListAdminForm";
import { useRouter } from "next/navigation";

export default function BlogAdminCreator() {
  const [postId, setPostId] = useState<number | null>(null);
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("admin/post/editor/null")}
        className='w-[150px] p-[15px] rounded-xl bg-[#ffb932] font-bold mt-[20px]'
      >
        Создать новый пост
      </button>
      <PostsListAdminForm />
    </>
  );
}
