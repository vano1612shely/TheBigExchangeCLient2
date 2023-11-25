import { useEffect, useState } from "react";
import Image from "next/image";
import { URL } from "@/services/api/interceptors";
import { IBank, ICreateBank } from "@/services/banks/banks-service.interface";
import banksService from "@/services/banks/banks.service";
export default function BankAdminForm() {
  const [data, setData] = useState<IBank[]>([]);
  const [formData, setFormData] = useState<ICreateBank>({
    name: "",
  });
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await banksService.getAll();
      if (res) setData(res);
    };
    getData();
  }, []);
  const options = [
    { value: "crypto", label: "Crypto" },
    { value: "fiat", label: "Fiat" },
  ];
  return (
    <div className='p-[30px]'>
      <h3 className='font-bold mb-[30px]'>Список валют:</h3>
      <ul className='flex flex-col gap-[10px] mb-[30px]'>
        {data
          ? data.map((bank) => {
              return (
                <li
                  className='w-[300px] flex border rounded p-[10px] items-center justify-between'
                  key={bank.id}
                >
                  <div className='flex flex-row items-center'>
                    {bank.icon_link ? (
                      <Image
                        className='mr-[10px]'
                        src={URL + "/" + bank.icon_link}
                        width={30}
                        height={30}
                        alt={""}
                      />
                    ) : (
                      ""
                    )}
                    {bank.name}
                  </div>
                  <button
                    className='bg-[#ffb932] rounded p-[5px]'
                    onClick={async () => {
                      let res = await banksService.delete(bank.id);
                      let tmp = [...data];
                      tmp = tmp.filter((item) => item.id !== res.id);
                      setData(tmp);
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
          placeholder='Введите название банка'
          className='text-black rounded p-[5px]'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            const res = await banksService.create(formData, file);
            if (res) {
              setData([...data, res]);
              setFormData({
                name: "",
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
