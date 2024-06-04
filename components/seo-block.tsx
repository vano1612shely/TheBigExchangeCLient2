import { useTranslations } from "next-intl";

export default function SeoBlock() {
  const t = useTranslations("Index");
  return (
    <div className="mb-[100px]">
      <h2 className="font-bold text-[30px] leading-[42px] text-white text-center mb-[50px] lg:text-[36px]">
        LukanExchange
        <span className="text-[#ffb932]"> - {t("seoBlock.title")}</span>
      </h2>
      <div className="flex flex-col gap-[50px] md:flex-row">
        {/*<div className='order-2 basis-1 h-[475px] rounded-[10px] md:basis-6/12'>*/}
        {/*  <video*/}
        {/*    autoPlay*/}
        {/*    muted*/}
        {/*    loop*/}
        {/*    className='object-cover rounded-xl w-full h-full'*/}
        {/*    src={"/video.MP4"}*/}
        {/*    suppressHydrationWarning*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="basis-1 text-center md:basis-6/12 md:text-left">
          <h3 className="text-[#ffb932] font-bold text-[24px] leading-[28px] mb-[10px]">
            LukanExchange: {t("seoBlock.subtitle")}
          </h3>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p1")}
          </p>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p2")}
          </p>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p3")}
          </p>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p4")}
          </p>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p5")}
          </p>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p6")}
          </p>
          <p className="text-white text-[16px] leading-[19px] mb-[19px]">
            {t("seoBlock.p7")}
          </p>
        </div>
      </div>
    </div>
  );
}
