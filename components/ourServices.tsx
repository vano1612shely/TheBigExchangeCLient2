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
              Надежность
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              TheBigExchange - это надежная и лицензированная финансовая
              компания, которая стремится обеспечивать безопасность и защиту для
              всех наших клиентов.
            </p>
          </div>
        </li>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={second} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Глобальное Присутствие
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Мы работаем по всему миру, предоставляя доступ к нашим услугам для
              клиентов из разных стран и регионов.
            </p>
          </div>
        </li>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={third} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Простота Использования
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Наша платформа разработана с учетом удобства пользователей. Вы
              сможете легко и быстро совершать финансовые операции в несколько
              кликов.
            </p>
          </div>
        </li>
        <li className='flex flex-row max-w-[490px] basis-[490px] mb-[54px] sm:max-w-full md:max-w-[330px] lg:max-w-[440px]'>
          <div className='w-[135px] flex-shrink-0 mr-[17px]'>
            <Image src={fourth} alt='first' className='w-full' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-bold text-[24px] leading-[28px] text-[#ffb932] mb-[13px]'>
              Отличный Клиентский Сервис
            </h3>
            <p className='font-light text-[16px] leading-[19px] text-white'>
              Наша команда клиентской поддержки всегда готова помочь вам в
              решении ваших вопросов и проблем.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
