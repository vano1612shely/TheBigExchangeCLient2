import postService from "@/services/post/post.service";
import { useEffect, useState } from "react";
import LastPost from "./lastPost";
import { IPost } from "@/services/post/post-service.interface";
import Loader from "./loader";
import PostCard from "./postCard";

export default function Blog() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const take = 12;
  useEffect(() => {
    const getPosts = async () => {
      const data = await postService.getPostsList(skip, take);
      setPosts([...posts, ...data]);
    };
    getPosts();
    console.log(posts);
  }, [skip]);
  if (posts.length == 0) {
    return <Loader />;
  }
  return (
    <div className='grow'>
      <section>
        <LastPost post={posts[0]} />
      </section>
      <section className='text-center mb-[100px]'>
        <ul className='flex justify-around flex-wrap gap-[30px] mb-[70px]'>
          {posts.map((post) => {
            if (post.id != posts[0].id)
              return (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              );
          })}
        </ul>
        <button
          className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[100%] max-w-[300px] xl:w-[300px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
          onClick={() => setSkip(skip + take)}
        >
          Загрузить еще
        </button>
      </section>
    </div>
  );
}
