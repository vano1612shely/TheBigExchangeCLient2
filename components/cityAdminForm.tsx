import { ICity } from "@/services/city/city-service.interface";
import cityService from "@/services/city/city.service";
import { useEffect, useState } from "react";
export default function CityAdminForm() {
  const [data, setData] = useState<ICity[]>([]);
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  useEffect(() => {
    const getData = async () => {
      const res = await cityService.getListWithoutFormat();
      setData(res);
    };
    getData();
  }, []);
  return (
    <div className='p-[30px]'>
      <h3 className='font-bold mb-[30px]'>Список городов:</h3>
      <ul className='flex flex-col gap-[10px] mb-[20px]'>
        {data
          ? data.map((city) => {
              return (
                <li
                  key={city.id}
                  className='w-[300px] flex justify-between border rounded p-[10px] items-center'
                >
                  {city.city_name}
                  <button
                    className='bg-[#ffb932] rounded p-[5px]'
                    onClick={async () => {
                      const res = await cityService.deleteCity(city.id);
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
      <div className='flex flex-col w-[300px] gap-[10px]'>
        <input
          type='text'
          placeholder='Введите название города'
          className='text-black rounded p-[5px]'
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Введите название страны'
          className='text-black rounded p-[5px]'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          className='bg-[#ffb932] rounded p-[5px]'
          onClick={async () => {
            const res = await cityService.addCity(cityName, country);
            setData([...data, res]);
            setCityName("");
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
