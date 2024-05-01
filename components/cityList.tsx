import { ICityByCountry } from "@/services/city/city-service.interface";
import Image from "next/image";
import pin from "@/public/ic-map-pin.svg";
interface ICityList {
  townList: ICityByCountry;
  setCity: (city: string) => void;
  currentCity: string;
  title: string;
  height: number | null;
}
export default function CityList({
  townList,
  setCity,
  currentCity,
  title = "Выберите город",
  height = null,
}: ICityList) {
  return (
    <div
      className={`basis-1 flex flex-col lg:basis-1/3 ${
        height ? "h-[" + height + "px]" : "h-full"
      }`}
    >
      <h3 className="text-[24px] text-white leading-[28px] font-bold m-w-[33.33%] pl-[20px] mb-[30px] font-raleway">
        {title}
      </h3>
      <ul className="overflow-y-auto list-none font-normal pr-[10px] h-full">
        {townList &&
          Object.entries(townList).map(([country, cities]) => {
            return (
              <div key={country}>
                <h3 className="text-[18px] text-white leading-[28px] font-bold mb-[10px] font-raleway">
                  {country}
                </h3>
                <ul>
                  {townList[country].map((town, index) => (
                    <li key={index} className="mb-[5px]">
                      <button
                        type="button"
                        onClick={() => {
                          setCity(town.city_name);
                        }}
                        className={`easy-linear duration-300 flex flex-row h-[40px] rounded-[10px] text-[18px] text-white items-center px-[30px] font-raleway w-full border hover:bg-[#2f2f2f]  hover:border-[#ffb932] ${
                          currentCity === town.city_name
                            ? "bg-[#2f2f2f] border-[#ffb932]"
                            : "bg-[#222425] border-[#222425]"
                        }`}
                      >
                        <Image
                          src={pin}
                          alt="pin"
                          className="mr-[5px] w-[15px] h-[15px]"
                        />
                        {town.city_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
