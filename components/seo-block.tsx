export default function SeoBlock() {
  return (
    <div className='mb-[100px]'>
      <h2 className='font-bold text-[30px] leading-[42px] text-white text-center mb-[50px] lg:text-[36px]'>
        TheBigExchange
        <span className='text-[#ffb932]'>
          {" "}
          - Ваш глобальный партнер в мире криптовалют и международных переводов
        </span>
      </h2>
      <div className='flex flex-col gap-[50px] md:flex-row'>
        <div className='order-2 basis-1 h-[475px] rounded-[10px] md:basis-6/12'>
          <video
            autoPlay
            muted
            loop
            className='object-cover rounded-xl w-full h-full'
            src={"/video.MP4"}
            suppressHydrationWarning
          />
        </div>
        <div className='basis-1 text-center md:basis-6/12 md:text-left'>
          <h3 className='text-[#ffb932] font-bold text-[24px] leading-[28px] mb-[10px]'>
            TheBigExchange: Ваши Финансовые Возможности
          </h3>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Обмен Криптовалют: Быстро и выгодно обменивайте криптовалюты с
            нашими актуальными курсами.
          </p>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Международные Переводы: Отправьте деньги в любую точку мира
            моментально и безопасно.
          </p>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Инвестиции в Золото: Зарабатывайте, оставляя доллары на депозите и
            инвестируя в золото.
          </p>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Управление Финансами: Доверьте нам финансовые манипуляции и получите
            консультацию.
          </p>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Наши Преимущества: Надежность: Мы - надежная и лицензированная
            финансовая компания. Глобальное Присутствие: Обслуживаем клиентов по
            всему миру.
          </p>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Простота Использования: Легко совершайте операции через нашу удобную
            платформу.
          </p>
          <p className='text-white text-[16px] leading-[19px] mb-[19px]'>
            Отличный Клиентский Сервис: Наша команда всегда готова помочь.
          </p>
        </div>
      </div>
    </div>
  );
}
