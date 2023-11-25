import { IAddressResponse } from "@/services/address/address-service.interface";
import addressService from "@/services/address/address.service";
import { useEffect, useState } from "react";
import Select from "react-select";
interface IAddressFormData {
  city_name: string;
  address: string;
  region: string;
}
interface IOption {
  value: string;
  label: string;
}
export default function AddressAdminForm() {
  const [data, setData] = useState<IAddressResponse[]>([]);
  const [formData, setFormData] = useState<IAddressFormData>({
    city_name: "",
    address: "",
    region: "",
  });
  const [selectedItem, setSelectedItem] = useState<IOption | null>();
  const [regions, setRegions] = useState<IOption[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      const res = await addressService.getAllData();
      if (res) setData(res);
      const reg = await addressService.getRegions();
      let tmp: IOption[] = [];
      for (const key in reg) {
        tmp.push({ value: key, label: reg[key] });
      }
      setRegions(tmp);
      setFormData({ ...formData, region: tmp[0].value });
      setSelectedItem(tmp[0]);
      setIsLoading(false);
    };
    getData();
  }, []);
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className='p-[30px]'>
      <h3 className='font-bold mb-[30px]'>Список адресов:</h3>
      <ul className='flex flex-col gap-[10px] mb-[20px]'>
        {data
          ? data.map((address) => {
              return (
                <li
                  key={address.id}
                  className='w-[300px] flex justify-between border rounded p-[10px] items-center'
                >
                  {address.city_name}, {address.address}
                  <button
                    className='bg-[#ffb932] rounded p-[5px]'
                    onClick={async () => {
                      const res = await addressService.delete(address.id);
                      if (res) {
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
      <div className='flex flex-col w-[300px] justify-between gap-[15px]'>
        <input
          type='text'
          placeholder='Введите название города'
          className='text-black rounded p-[5px]'
          value={formData.city_name}
          onChange={(e) =>
            setFormData({ ...formData, city_name: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='Введите улицу'
          className='text-black rounded p-[5px]'
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <Select
          options={regions}
          className='text-black'
          value={selectedItem}
          onChange={(value) => {
            if (value) setFormData({ ...formData, region: value.value });
            setSelectedItem(value);
          }}
        />
        <button
          className='bg-[#ffb932] rounded p-[5px]'
          onClick={async () => {
            const res = await addressService.create(formData);
            if (res) setData([...data, res]);
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
