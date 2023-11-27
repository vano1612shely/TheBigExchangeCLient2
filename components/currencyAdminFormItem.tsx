import { useState } from "react";
import Image from "next/image";
import { ICurrency } from "@/services/currency/currency-service.interface";
import currencyService from "@/services/currency/currency.service";
import { URL } from "@/services/api/interceptors";
export default function CurrencyAdminFormItem({
  currency,
  setData,
}: {
  currency: ICurrency;
  setData: (value: ICurrency) => void;
}) {
  const [percent, setPercent] = useState<number>(
    currency.percent ? currency.percent : 0,
  );
  return (
    <li
      className='w-[500px] flex border rounded p-[10px] items-center justify-between'
      key={currency.id}
    >
      <div className='flex flex-row items-center w-[100px]'>
        {currency.icon_link ? (
          <Image
            className='mr-[10px]'
            src={URL + "/" + currency.icon_link}
            width={30}
            height={30}
            alt={""}
          />
        ) : (
          ""
        )}
        {currency.title}
      </div>
      <div className='flex flex-col justify-start gap-[5px]'>
        <p>Процент:</p>
        <input
          type='number'
          value={percent ? percent : ""}
          onChange={(e) => setPercent(Number(e.target.value))}
          className='text-black'
        />
        <button
          onClick={async () => {
            if (currency.id) {
              const res = await currencyService.updatePercent(
                currency.id,
                percent,
              );
            }
          }}
          className='bg-[#ffb932]'
        >
          Обновить процент
        </button>
      </div>
      <button
        className='bg-[#ffb932] rounded p-[5px]'
        onClick={async () => {
          if (currency && typeof currency.id === "number") {
            let res = await currencyService.delete(currency.id);
            if (res) setData(res);
          }
        }}
      >
        Удалить
      </button>
    </li>
  );
}
