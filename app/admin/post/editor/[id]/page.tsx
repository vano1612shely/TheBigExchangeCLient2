"use client";
import PostEditor from "@/components/PostEditor";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostAdmin({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/admin/login"); // Перенаправлення на сторінку входу, якщо немає токену
      return;
    }
  }, [user]);
  if (user) return <PostEditor postId={Number(params.id)} />;
}
