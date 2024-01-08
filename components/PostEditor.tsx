"use client";
import Image from "next/image";
import styles from "./PostEditor.module.css";
import "./PostEditor.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import postService from "@/services/post/post.service";
import { URL } from "@/services/api/interceptors";
import { useRouter } from "next/navigation";
import Container from "./container";
const PostEditor = ({ postId }: { postId: number | null }) => {
  const router = useRouter();
  const [id, setId] = useState<number | null>(postId);
  const [save, setSave] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState("");
  const [header, setHeader] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const getPost = async (id: number) => {
    if (id == null) {
      return;
    }
    const res = await postService.getPostForAdmin(id);
    if (!res) {
      router.push("/admin");
    }
    setMedia(res.media[0].url);
    setHeader(res.header);
    setValue(res.content);
    setTitle(res.title);
    setDescription(res.description);
    setKeywords(res.keywords);
  };
  useEffect(() => {
    if (postId) {
      getPost(postId);
    }
  }, []);
  useEffect(() => {
    const upload = async () => {
      const link = await postService.loadMedia(file);
      setMedia(link);
      setHeader(link);
    };

    file && upload();
  }, [file]);
  useEffect(() => {
    const setData = async () => {
      if (!id) await handleSubmit();
      else await updateSumbit();
      setSave(false);
    };
    if (save) {
      setData();
    }
  }, [save]);

  const handleSubmit = async () => {
    const res = await postService.createPost({
      title,
      header,
      keywords,
      description,
      media,
      content: value,
    });
    setId(res.id);
    if (!postId) {
      router.push(`/admin/post/editor/${res.id}`);
    }
  };
  const updateSumbit = async () => {
    if (id) {
      const res = await postService.updatePost({
        id,
        title,
        header,
        keywords,
        description,
        media,
        content: value,
      });
    }
  };
  const Quill = ReactQuill.Quill;
  var Font = Quill.import("formats/font");
  Quill.register("modules/imageResize", ImageResize);
  Quill.register(Font, true);
  return (
    <Container>
      <div className={styles.container}>
        {!header ? (
          <div className='w-full max-h-[400px] min-h-[200px]'>
            <input
              type='file'
              id='image'
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              style={{ display: "none" }}
            />
            <label htmlFor='image'>
              <Image
                src={"/image.png"}
                width={100}
                height={100}
                alt=''
                className='m-auto cursor-pointer'
              />
            </label>
          </div>
        ) : (
          ""
        )}
        {header ? (
          <>
            <input
              type='file'
              id='image'
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              style={{ display: "none" }}
            />
            <label htmlFor='image'>
              <Image
                src={URL + "/" + header}
                className='w-[100%] max-w-[1160px] h-[400px] object-cover m-auto rounded-xl'
                alt=''
                width={500}
                height={500}
              />
            </label>
          </>
        ) : (
          ""
        )}
        <input
          type='text'
          value={title}
          placeholder='Title'
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          placeholder='Description'
          className='h-[150px] bg-transparent border p-[10px] m-[10px] box-border'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type='text'
          placeholder='Keywords(Enter through a comma):'
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className='border bg-transparent m-[10px] p-[10px]'
        />
        <div className={styles.editor}>
          <ReactQuill
            modules={{
              toolbar: [
                [
                  {
                    font: [
                      "monospace",
                      "serif",
                      "raleway",
                      "montserrat",
                      "lato",
                      "rubik",
                      "roboto",
                      "arial",
                    ],
                  },
                  ,
                  { size: [] },
                ],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "super" }, { script: "sub" }],
                [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["direction", { align: [] }],
                ["link", "image", "video"],
                ["clean"],
              ],
              imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
              },
            }}
            className={styles.textArea}
            theme='snow'
            value={value}
            onChange={setValue}
            placeholder='Tell your story...'
          />
        </div>
        <button
          className={styles.back}
          onClick={() => {
            setSave(true);
            router.push("/admin");
          }}
        >
          Back
        </button>
        <button
          className={styles.view}
          onClick={() => {
            setSave(true);
            router.push(`/admin/post/view/${id}`);
          }}
        >
          View
        </button>
        <button className={styles.save} onClick={() => setSave(true)}>
          Save
        </button>
        <button
          className={styles.publish}
          onClick={async () => {
            id && (await postService.publish(id));
          }}
        >
          Publish
        </button>
        <button
          className={styles.delete}
          onClick={async () => {
            id && (await postService.delete(id)) && router.push("/admin");
          }}
        >
          Delete
        </button>
      </div>
    </Container>
  );
};

export default PostEditor;
