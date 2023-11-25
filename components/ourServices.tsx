import Image from "next/image";
import first from "@/public/01.svg";
import second from "@/public/02.svg";
import third from "@/public/03.svg";
import fourth from "@/public/04.svg";
export default function OurServices() {
  return (
    <div>
      <h2 className='font-bold text-white text-[36px] leading-[42px] text-center mb-[30px]'>
        Наши <span className='text-[#ffb932]'>услуги</span>
      </h2>
      <ul className='flex flex-row flex-wrap items-center sm:justify-center lg:justify-between'>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={first} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Обмен валюты
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Значимость этих проблем настолько очевидна, что сложившаяся
              структура играет роль в формировании модели
            </p>
          </div>
        </li>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={second} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Обмен криптовалюты
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Начало повседневной работы по формированию позиции в значительной
            </p>
          </div>
        </li>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={third} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Оптовые покупки
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Рамки и место обучения кадров требуют от нас соответствующий
            </p>
          </div>
        </li>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={fourth} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Выдача налличкой
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Значимость этих проблем настолько очевидна, что сложившаяся
              структура играет роль в формировании модели
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
