import Image from "next/image";
import loader from "@/public/loader.svg";
import logo from "@/public/logo.png";
export default function Loader() {
  return (
    <div className="w-[100vw] h-[100vh] fixed z-20 bg-[#1a1c1e] left-0 top-0">
      <div className="w-[90%] h-[300px] m-auto absolute left-0 right-0 bottom-0 top-0 flex flex-col gap-[10px] items-center sm:w-[300px]">
        {/*<Image*/}
        {/*  src={loader}*/}
        {/*  alt="loader"*/}
        {/*  className="duration-300 ease-linear animate-bounce text-white w-full"*/}
        {/*/>*/}
        <Image
          src={logo}
          alt={"logo"}
          className="w-full duration-300 ease-linear animate-bounce "
        />
      </div>
    </div>
  );
}
