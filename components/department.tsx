import Image from "next/image";
import Map from "./Map";
import time2 from "@/public/time2.svg";
import svgFile from "@/public/ic-map-pin.svg";
import { useEffect, useState } from "react";
import Select from "react-select";
import addressService from "@/services/address/address.service";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Index");

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
            (group) => group.label === region,
          );

          // Якщо групи для city_name ще не існує, створюємо нову
          if (existingGroupIndex === -1) {
            groupedOptions.push({
              label: region,
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
    const svg = document.getElementById("map");
    if (svg) {
      const existingImages = svg.querySelectorAll("image");
      existingImages.forEach((existingImage) => {
        svg.removeChild(existingImage); // Видалення кожного старого <image> елемента
      });
      const paths = document.querySelectorAll("#map path");
      paths.forEach((path) => {
        if (path) {
          const pathId = path.getAttribute("id");
          if (pathId === selectedAddress?.value) {
            (path as SVGPathElement).style.fill = "#762b2d";
            (path as SVGPathElement).style.opacity = "0.7";
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
    <div className="mb-[100px]">
      <h2 className="font-bold text-white text-[36px] leading-[42px] text-center mb-[30px]">
        {t("nearest")} <span className="text-[#ffb932]">{t("branch")}</span>
      </h2>
      <div className="flex flex-col gap-[10px] items-center lg:flex-row xl:gap-[50px]">
        <div className="basis-1 rounded-[10px] scale-[50%] lg:basis-6/12 lg:scale-100">
          <Map className="" />
        </div>
        <div className="basis-1 flex flex-col justify-around lg:basis-6/12">
          <div>
            <h2 className="mb-[20px] font-bold text-[16px]">
              {t("selectNearestBranch")}
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
              className="text-white mb-[20px]"
              onChange={(value) => {
                if (value !== null) {
                  setSelectedAddress(value as Option);
                }
              }}
            />
          </div>
          <div>
            <h2 className="mb-[20px] font-bold text-[16px]">{t("timeline")}</h2>{" "}
            <p className="flex flex-row items-center mb-[20px]">
              <Image
                src={time2}
                alt=""
                width={18}
                height={18}
                className="mr-[18px]"
              />
              {t("timeline2")}
            </p>
          </div>
          <button
            onClick={() => {
              window.open(
                `https://www.google.com/maps/place/${selectedAddress?.label}`,
                "_blank",
              );
            }}
            className="bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[100%] xl:w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]"
          >
            {t("plotRoute")}
          </button>
        </div>
      </div>
    </div>
  );
}
