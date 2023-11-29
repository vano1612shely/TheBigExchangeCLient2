import Image from "next/image";
import Map from "./Map";
import time2 from "@/public/time2.svg";
import svgFile from "@/public/ic-map-pin.svg";
import { useEffect, useState } from "react";
import Select from "react-select";
import addressService from "@/services/address/address.service";
type Option = {
  value: string;
  label: string;
};
type GroupedOptions = {
  label: string;
  options: Option[];
};
export default function Department() {
  const [address, setAddress] = useState<GroupedOptions[] | undefined>(
    undefined,
  );
  const [selectedAddress, setSelectedAddress] = useState<Option | undefined>(
    undefined,
  );

  useEffect(() => {
    const getData = async () => {
      const res = await addressService.getAllData();
      // Створення об'єкту для зберігання групованих даних
      let groupedOptions: GroupedOptions[] = [];
      if (res) {
        res.forEach((item) => {
          const { id, address, city_name, region } = item;

          // Перевірка чи група вже існує у масиві groupedOptions за city_name
          const existingGroupIndex = groupedOptions.findIndex(
            (group) => group.label === city_name,
          );

          // Якщо групи для city_name ще не існує, створюємо нову
          if (existingGroupIndex === -1) {
            groupedOptions.push({
              label: city_name,
              options: [
                {
                  value: region,
                  label: `${city_name} ${address}`,
                },
              ],
            });
          } else {
            // Якщо група вже існує, додаємо новий варіант до відповідної групи
            groupedOptions[existingGroupIndex].options.push({
              value: region,
              label: `${city_name} ${address}`,
            });
          }
        });
        setAddress(groupedOptions as GroupedOptions[]); // Ensure groupedOptions is of type GroupedOptions[]
        setSelectedAddress(groupedOptions[0]?.options[0]); // Ensure this is an Option or handle the possibility of empty arrays
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const svg = document.querySelector("svg");
    if (svg) {
      const existingImages = svg.querySelectorAll("image");
      existingImages.forEach((existingImage) => {
        svg.removeChild(existingImage); // Видалення кожного старого <image> елемента
      });
      const paths = document.querySelectorAll("svg path");
      paths.forEach((path) => {
        if (path) {
          const pathId = path.getAttribute("id");
          if (pathId === selectedAddress?.value) {
            (path as SVGPathElement).style.fill = "#762b2d";
            (path as SVGPathElement).style.opacity = "0.7";
            // Отримання прямокутника, який обмежує шлях
            const bbox = (path as SVGPathElement).getBBox();
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;
            const image = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "image",
            );
            image.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "href",
              "../ic-map-pin.svg",
            );
            image.classList.add("hover:fill-white");
            // Встановлення координат та розмірів для <image>
            image.setAttributeNS(null, "x", String(centerX - 15));
            image.setAttributeNS(null, "y", String(centerY - 30));
            image.setAttributeNS(null, "width", "30");
            image.setAttributeNS(null, "height", "30");
            image.onclick = () => {
              window.open(
                `https://www.google.com/maps/place/${selectedAddress.label}`,
                "_blank",
              );
            };
            // Додавання <image> до <svg>
            svg.appendChild(image);
          } else {
            (path as SVGPathElement).style.fill = "#1a2636";
            (path as SVGPathElement).style.stroke = "#fff";
            (path as SVGPathElement).style.strokeWidth = "0.3";
            (path as SVGPathElement).style.opacity = "1";
          }
        }
      });
    }
  }, [selectedAddress]);
  return (
    <div className='mb-[100px]'>
      <h2 className='font-bold text-white text-[36px] leading-[42px] text-center mb-[30px]'>
        Ближайшее <span className='text-[#ffb932]'>отделение</span>
      </h2>
      <div className='flex flex-col gap-[10px] items-center lg:flex-row xl:gap-[50px]'>
        <div className='basis-1 rounded-[10px] scale-[50%] lg:basis-6/12 lg:scale-100'>
          <Map className='' />
        </div>
        <div className='basis-1 flex flex-col justify-around lg:basis-6/12'>
          <div>
            <h2 className='mb-[20px] font-bold text-[16px]'>
              Выберите ближайший пункт обмена валют:
            </h2>
            <Select
              isSearchable={false}
              value={selectedAddress}
              options={address}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "20px",
                  height: "40px",
                  background: "#1a1c1e",
                  color: "#fff",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "#1a1c1e",
                  color: "#fff",
                }),
                menuList: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "#1a1c1e",
                  color: "#fff",
                }),
                singleValue: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "#fff",
                }),
              }}
              className='text-white mb-[20px]'
              onChange={(value) => {
                if (value !== null) {
                  setSelectedAddress(value as Option);
                }
              }}
            />
          </div>
          <div>
            <h2 className='mb-[20px] font-bold text-[16px]'>График:</h2>{" "}
            <p className='flex flex-row items-center mb-[20px]'>
              <Image
                src={time2}
                alt=''
                width={18}
                height={18}
                className='mr-[18px]'
              />
              Пн-Пт 09:00 - 20:00, Сб 10:00 - 18:00, Вс - выходной
            </p>
          </div>
          <button
            onClick={() => {
              window.open(
                `https://www.google.com/maps/place/${selectedAddress?.label}`,
                "_blank",
              );
            }}
            className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[100%] xl:w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
          >
            Проложить маршрут
          </button>
        </div>
      </div>
    </div>
  );
}
