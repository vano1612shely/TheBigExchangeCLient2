"use client";

// import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.bubble.css";
// const ReactQuill = dynamic(import("react-quill"), { ssr: false });
export default function PostContent({ content }: { content: any }) {
  return <ReactQuill value={content} readOnly={true} theme={"bubble"} />;
}
