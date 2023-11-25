import {
  ICreateCurrency,
  ICurrency,
} from "@/services/currency/currency-service.interface";
import currencyService from "@/services/currency/currency.service";
import { useEffect, useState } from "react";
import Image from "next/image";
import { URL } from "@/services/api/interceptors";
import Select, { SingleValue } from "react-select";
export default function CurrencyAdminForm() {
  const options = [
    { value: "crypto", label: "Crypto" },
    { value: "fiat", label: "Fiat" },
  ];
  const [data, setData] = useState<ICurrency[]>([]);
  const [formData, setFormData] = useState<ICreateCurrency>({
    title: "",
    value: "",
    type: "crypto",
  });
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await currencyService.getAll();
      if (res) setData(res);
    };
    getData();
  }, []);
  return (
    <div className='p-[30px]'>
      <h3 className='font-bold mb-[30px]'>Список валют:</h3>
      <ul className='flex flex-col gap-[10px] mb-[30px]'>
        {data
          ? data.map((currency) => {
              return (
                <li
                  className='w-[300px] flex border rounded p-[10px] items-center justify-between'
                  key={currency.id}
                >
                  <div className='flex flex-row items-center'>
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
                  <button
                    className='bg-[#ffb932] rounded p-[5px]'
                    onClick={async () => {
                      if (currency && typeof currency.id === "number") {
                        let res = await currencyService.delete(currency.id);
                        let tmp = [...data];
                        tmp = tmp.filter((item) => item.id !== res.id);
                        setData(tmp);
                      }
                    }}
                  >
                    Удалить
                  </button>
                </li>
              );
            })
          : ""}
      </ul>
      <div className='flex flex-col w-[300px] gap-[15px]'>
        <input
          type='text'
          placeholder='Введите название токена'
          className='text-black rounded p-[5px]'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type='text'
          placeholder='Введите код токена'
          className='text-black rounded p-[5px]'
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
        />
        <Select
          className='text-black'
          value={selectedItem}
          options={options}
          onChange={(value: SingleValue<{ value: string; label: string }>) => {
            if (value !== null) {
              setSelectedItem(value);
              setFormData({ ...formData, type: value.value });
            }
          }}
        />
        <input
          type='file'
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              const i = event.target.files[0];
              setFile(i);
            }
          }}
          accept='image/*'
        />
        <button
          className='bg-[#ffb932] rounded p-[5px]'
          onClick={async () => {
            const res = await currencyService.create(formData, file);
            if (res) {
              setData([...data, res]);
              setFormData({
                title: "",
                value: "",
                type: "crypto",
              });
              setFile(null);
            }
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
