"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Link } from "@/navigation";
import call from "@/public/call.svg";
import telegramIcon from "@/public/telegram.svg";
import robot from "@/public/robot.png";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
export default function Header({
  telegram,
  phone,
  telegramBot,
}: {
  telegram: string;
  phone: string;
  telegramBot: string;
}) {
  const t = useTranslations("Index");
  return (
    <div className="font-raleway py-[40px] flex flex-col justify-between items-center md:flex-row">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className="w-[100px] align-middle sm:mb-[20px] lg:mb-0"
        />
      </Link>
      <div className="flex flex-col items-center justify-end md:gap-[50px] md:flex-row sm:gap-[10px]">
        <Link
          href="/blog"
          className="flex flex-row rounded-[20px] text-[16px] text-[#fff] px-[20px] py-[8px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200"
        >
          {t("blog")}
        </Link>
        <Link
          href={telegramBot ? telegramBot : "#"}
          className="bg-[#ffb932] flex flex-row rounded-[20px] text-[16px] text-[#1a1c1e] px-[20px] py-[8px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]"
          target="_blank"
        >
          <Image
            src={robot}
            alt="phone "
            className="mr-[10px] w-[20px] h-[20px]"
          />
          {t("telegramBot")}
        </Link>
        <Link
          href={`tel:${phone}`}
          className="font-light text-[16px] flex flex-row items-center"
        >
          <Image src={call} alt="phone " className="mr-[10px]" />
          {phone}
        </Link>
        <Link
          href={`https://t.me/${telegram}`}
          target="_blank"
          className="bg-[#ffb932] flex flex-row rounded-[20px] text-[16px] text-[#1a1c1e] px-[20px] py-[8px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]"
        >
          <Image
            src={telegramIcon}
            alt="phone "
            className="mr-[10px] w-[18px] h-[18px]"
          />
          {t("contact")}
        </Link>
        <LocaleSwitcher />
      </div>
    </div>
  );
}
