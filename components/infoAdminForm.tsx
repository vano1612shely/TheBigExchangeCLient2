"use client";
import { useEffect, useState } from "react";
import { IDataResponseForAdmin } from "@/services/info/info-service.interface";
import infoService from "@/services/info/info.service";

export default function InfoAdminForm() {
  const [data, setData] = useState<IDataResponseForAdmin | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await infoService.getAllDataForAdmin();
      if (res) setData(res);
    };
    getData();
  }, []);
  if (!data) {
    return <>Loading...</>;
  }
  return (
    <div className='p-[30px]'>
      <h2 className='font-bold mb-[30px]'>Основное:</h2>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let res = await infoService.updateData(data);
            if (res) {
              window.alert("Успешно");
            } else {
              window.alert("Ошибка");
            }
          }}
        >
          <div className='flex flex-wrap gap-[15px] mb-[20px]'>
            <div className='flex flex-col'>
              <label htmlFor='phone'>Номер телефона:</label>
              <input
                id='phone'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder='Введите номер телефона'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='telegram'>Telegram:</label>
              <input
                id='telegram'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.telegram}
                onChange={(e) => setData({ ...data, telegram: e.target.value })}
                placeholder='Введите никнейм в телеграмм'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='telegramBot'>TelegramBot:</label>
              <input
                id='telegramBot'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.telegramBot}
                onChange={(e) =>
                  setData({ ...data, telegramBot: e.target.value })
                }
                placeholder='Введите имя бота'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='percent'>Telegram Bot Api:</label>
              <input
                id='telegramBotApi'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.telegramBotApi}
                onChange={(e) =>
                  setData({ ...data, telegramBotApi: e.target.value })
                }
                placeholder='Введите telegram bot api:'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='percent'>Telegram Chat Id:</label>
              <input
                id='telegramChatId'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.telegramChatId}
                onChange={(e) =>
                  setData({ ...data, telegramChatId: e.target.value })
                }
                placeholder='Введите telegram chat id:'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='instagram'>Instagram:</label>
              <input
                id='instagram'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.instagram}
                onChange={(e) =>
                  setData({ ...data, instagram: e.target.value })
                }
                placeholder='Введите никнейм в инстаграмм'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='address'>Адрес:</label>
              <input
                id='address'
                type='text'
                className='text-black rounded p-[5px]'
                value={data?.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                placeholder='Введите адрес'
              />
            </div>
          </div>
          <button
            className='bg-[#ffb932] rounded-[20px] p-[15px]'
            type='submit'
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
