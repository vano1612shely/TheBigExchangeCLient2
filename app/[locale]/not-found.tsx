"use client";
import { useEffect } from "react";
export const dynamic = "force-dynamic";
export default function NotFound() {
  useEffect(() => {
    window.location.reload();
  }, []);
  return;
}
