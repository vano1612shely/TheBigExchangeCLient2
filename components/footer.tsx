"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import phoneIcon from "@/public/phone.svg";
import instagramIcon from "@/public/instagram.svg";
import telegramIcon from "@/public/telegram2.svg";
import marker from "@/public/marker.svg";
import time from "@/public/time.svg";
import { useTranslations } from "next-intl";
export default function Footer({
  phone,
  address,
  telegram,
  telegramBot,
  instagram,
}: {
  phone: string;
  address: string;
  telegram: string;
  telegramBot: string;
  instagram: string;
}) {
  const t = useTranslations("Index");
  return (
    <div className="flex flex-col gap-[50px] text-center p-[30px] pt-[50px] border-t justify-between md:gap-0 md:flex-row md:text-left bottom-0 relative items-center md:items-start">
      <div className="m-auto md:m-0 w-[100px]">
        <Link href={"#"}>
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <h3 className="font-bold text-[16px] leading-[19px] text-white mb-[30px]">
          {t("contacts").toUpperCase()}
        </h3>
        <ul className="flex flex-col gap-[20px] items-center md:items-start">
          <li>
            <Link
              className="flex gap-[10px] items-center hover:text-[#ffb932] duration-300 ease-linear"
              href={`tel:+${phone}`}
            >
              <Image src={phoneIcon} alt="phone" />
              {phone}
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-[10px] items-center hover:text-[#ffb932] duration-300 ease-linear"
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
            >
              <Image src={instagramIcon} alt="instagram" />
              {instagram}
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-[10px] items-center hover:text-[#ffb932] duration-300 ease-linear"
              href={`https://t.me/${telegram}`}
            >
              <Image src={telegramIcon} alt="telegram" />
              {telegram}
            </Link>
          </li>
          <li className="flex gap-[10px] items-center">
            <Image src={marker} alt="marker" />
            {address}
          </li>
        </ul>
      </div>
      {/* <div>
        <h3 className='font-bold text-[16px] leading-[19px] text-white mb-[30px]'>
          УСЛУГИ
        </h3>
        <ul className='flex flex-col gap-[20px] items-center md:items-start'>
          <li>
            <Link
              className='flex gap-[10px] items-center hover:text-[#ffb932] duration-300 ease-linear'
              href={"#"}
            >
              Обмен валют
            </Link>
          </li>
          <li>
            <Link
              className='flex gap-[10px] items-center hover:text-[#ffb932] duration-300 ease-linear'
              href={telegramBot ? telegramBot : "#"}
            >
              Денежные переводы
            </Link>
          </li>
          <li>
            <Link
              className='flex gap-[10px] items-center hover:text-[#ffb932] duration-300 ease-linear'
              href={telegram ? telegram : "#"}
            >
              Вывод криптовалют
            </Link>
          </li>
        </ul>
      </div> */}
      <div>
        <h3 className="font-bold text-[16px] leading-[19px] text-white mb-[30px]">
          {t("workSchedule").toUpperCase()}
        </h3>
        <ul className="flex flex-col gap-[20px] items-center md:items-start">
          <li className="flex gap-[10px] items-center">
            <Image src={time} alt="time" />
            24/7
          </li>
        </ul>
      </div>
    </div>
  );
}
