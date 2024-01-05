import { IPost } from "@/services/post/post-service.interface";
import postService from "@/services/post/post.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { URL } from "@/services/api/interceptors";
export default function PostsListAdminForm() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [skip, setSkip] = useState<number>(0);
  useEffect(() => {
    const getPosts = async () => {
      const data = await postService.getPostsListForAdmin(skip, 10);
      setPosts(data);
    };
    getPosts();
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      const data = await postService.getPostsListForAdmin(skip, 10);
      setPosts([...posts, ...data]);
    };
    getPosts();
  }, [skip]);
  return (
    <div className='p-[20px]'>
      <ul className='flex flex-row gap-[20px] flex-wrap mb-[30px]'>
        {posts.map((post: IPost) => {
          return (
            <li key={post.id} className='p-[10px] w-[200px] h-[300px]'>
              <Link
                href={`admin/post/editor/${post.id}`}
                className='flex flex-col h-full'
              >
                <Image
                  src={URL + "/" + post.header}
                  width={360}
                  height={240}
                  alt=''
                  className='rounded mb-[16px]'
                />
                <h3 className='mb-[10px] font-bold'>{post.title}</h3>
                <br />
                <p className='text-right mt-auto mb-[5px]'>{post.type}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <button onClick={() => setSkip(skip + 10)}>Загрузить еще</button>
    </div>
  );
}
