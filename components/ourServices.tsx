import Image from "next/image";
import first from "@/public/01.svg";
import second from "@/public/02.svg";
import third from "@/public/03.svg";
import fourth from "@/public/04.svg";
import { useTranslations } from "next-intl";
export default function OurServices() {
  const t = useTranslations("Index");
  return (
    <div>
      <h2 className="font-bold text-white text-[36px] leading-[42px] text-center mb-[30px]">
        {t("ourServices.title1")}{" "}
        <span className="text-[#ffb932]">{t("ourServices.title2")}</span>
      </h2>
      <ul className="flex flex-row flex-wrap items-center sm:justify-center lg:justify-between">
        <li className="flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]">
          <div className="w-[135px] flex-shrink-0 mr-[17px]">
            <Image src={first} alt="first" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]">
              {t("ourServices.p1Title")}
            </h3>
            <p className="font-light text-[16px] leading-[19px] text-white">
              {t("ourServices.p1")}
            </p>
          </div>
        </li>
        <li className="flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]">
          <div className="w-[135px] flex-shrink-0 mr-[17px]">
            <Image src={second} alt="first" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]">
              {t("ourServices.p2Title")}
            </h3>
            <p className="font-light text-[16px] leading-[19px] text-white">
              {t("ourServices.p2")}
            </p>
          </div>
        </li>
        <li className="flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]">
          <div className="w-[135px] flex-shrink-0 mr-[17px]">
            <Image src={third} alt="first" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]">
              {t("ourServices.p3Title")}
            </h3>
            <p className="font-light text-[16px] leading-[19px] text-white">
              {t("ourServices.p3")}
            </p>
          </div>
        </li>
        <li className="flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]">
          <div className="w-[135px] flex-shrink-0 mr-[17px]">
            <Image src={fourth} alt="first" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]">
              {t("ourServices.p4Title")}
            </h3>
            <p className="font-light text-[16px] leading-[19px] text-white">
              {t("ourServices.p4")}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
