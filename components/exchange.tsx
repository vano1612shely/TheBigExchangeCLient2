"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import exIcon from "@/public/ex-icon.svg";
import Select from "./select";
import SelectReact, { SingleValue } from "react-select";
import { ICurrency } from "@/services/currency/currency-service.interface";
import currencyService from "@/services/currency/currency.service";
import banksService from "@/services/banks/banks.service";
import api, { URL } from "@/services/api/interceptors";
import { ITelegramSendMessageRequest } from "@/services/telegram/telegram-service.interface";
import telegramService from "@/services/telegram/telegram.service";
import Modal, { IModal } from "./modal";
import Loader from "./loader";
import CityList from "./cityList";
import ReactSelect from "react-select";
import chainService from "@/services/chains/chain.service";
import { ICityByCountry } from "@/services/city/city-service.interface";
import cityService from "@/services/city/city.service";
import { useTranslations } from "next-intl";
interface SelectOption {
  label: string;
  value: string;
}
export interface GroupedOption {
  readonly label: string;
  readonly options: readonly SelectOption[];
}
function transformToOptions(townList: ICityByCountry): GroupedOption[] {
  const options: GroupedOption[] = [];

  Object.keys(townList).forEach((country) => {
    const cities = townList[country].map((city) => ({
      label: city.city_name,
      value: city.city_name,
    }));

    options.push({
      label: country,
      options: cities,
    });
  });

  return options;
}

export default function Exchange({
  type,
}: {
  type: "transaction" | "online" | "offline";
}) {
  const t = useTranslations("Index");
  const [showCityList, setShowCityList] = useState<boolean>(true);
  const [transactionFrom, setTransactionFrom] = useState<SelectOption>({
    label: "",
    value: "",
  });
  const [transactionTo, setTransactionTo] = useState<SelectOption>({
    label: "",
    value: "",
  });
  const [showCityForm, setShowCityForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateExchange, setUpdateExchange] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [transactionTypeValue, setTransactionTypeValue] = useState<{
    value: string;
    label: string;
  }>({ label: t("cash"), value: "offline" });
  const [modalData, setModalData] = useState<IModal>({
    title: "",
    buttonText: "",
    message: "",
    onClick: () => setShowModal(false),
  });
  const [giveCurrency, setGiveCurrency] = useState<ICurrency[]>([]);
  const [banks, setBanks] = useState<any>([]);
  const [chains, setChains] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>();
  const [selectedBank, setSelectedBank] = useState<any>();
  const [selectedChain, setSelectedChain] = useState<any>();
  const [getCurrency, setGetCurrency] = useState<ICurrency[]>([]);
  const [townList, setTownList] = useState<ICityByCountry>({});
  const [formData, setFormData] = useState<ITelegramSendMessageRequest>({
    type: type,
    city: "",
    name: "",
    giveCurrency: null,
    getCurrency: null,
    giveSum: 0,
    getSum: 0,
    telegram: "",
    phone: "",
    email: "",
    exchange: 1,
    transactionType: "offline",
  });
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const give = await currencyService.getCrypto();
      setGiveCurrency(give);
      const get = await currencyService.getFiat();
      const towns = await cityService.getList();
      if (towns) setTownList(towns);
      setGetCurrency(get);
      const banksRes = await banksService.getAll();
      if (banksRes) {
        let banksList: any = [];
        banksRes.map(
          (bank: { id: number; name: string; icon_link?: string }) => {
            banksList.push({
              value: bank.name,
              label: (
                <div className="text-white flex flex-row items-center">
                  {bank.icon_link ? (
                    <Image
                      src={URL + "/" + bank.icon_link}
                      alt={bank.name}
                      width={30}
                      height={30}
                      className="mr-[5px]"
                    />
                  ) : (
                    ""
                  )}{" "}
                  {bank.name}
                </div>
              ),
            });
          },
        );
        setBanks(banksList);
      }
      const usdt = give.find((g) => g.value.toLowerCase() == "usdt");
      const usd = get.find((g) => g.value.toLowerCase() == "usd");
      setFormData({
        ...formData,
        giveCurrency: usdt ? usdt : give[0],
        getCurrency: usd ? usd : get[0],
      });
      setUpdateExchange(true);
      setIsLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    if (type !== "offline") {
      setShowCityList(false);
      const getData = async () => {
        const give = await currencyService.getCrypto();
        setGiveCurrency(give);
        const get = await currencyService.getFiat();
        setGetCurrency(get);
        const usdt = give.find((g) => g.value.toLowerCase() == "usdt");
        const usd = get.find((g) => g.value.toLowerCase() == "usd");
        setFormData({
          ...formData,
          type: type,
          giveCurrency: usdt ? usdt : give[0],
          getCurrency: usd ? usd : get[0],
        });
        setUpdateExchange(true);
      };
      getData();
    } else {
      setShowCityList(true);
    }
    if (type === "transaction") {
      const getData = async () => {
        const fiat = await currencyService.getFiat();
        setGetCurrency(fiat);
        setGiveCurrency(fiat);
        const usd = fiat.find((g) => g.value.toLowerCase() == "usd");
        setFormData({
          ...formData,
          type: type,
          giveCurrency: usd ? usd : fiat[0],
          getCurrency: usd ? usd : fiat[0],
        });
        setUpdateExchange(true);
        setShowCityForm(true);
      };
      getData();
    } else {
      const getData = async () => {
        const give = await currencyService.getCrypto();
        setGiveCurrency(give);
        const get = await currencyService.getFiat();
        setGetCurrency(get);
        const usdt = give.find((g) => g.value.toLowerCase() == "usdt");
        const usd = get.find((g) => g.value.toLowerCase() == "usd");
        setFormData({
          ...formData,
          type: type,
          giveCurrency: usdt ? usdt : give[0],
          getCurrency: usd ? usd : get[0],
        });
        setUpdateExchange(true);
      };
      getData();
    }
    setShowCityForm(false);
  }, [type]);
  useEffect(() => {
    const getData = async () => {
      if (formData.getCurrency?.type == "crypto") {
        if (formData.getCurrency.id) {
          const chainRes = await chainService.getChainsForCurrency(
            formData.getCurrency.id,
          );
          if (chainRes) {
            let chainsList: any = [];
            chainRes.map((chain: { id: number; name: string }) => {
              chainsList.push({
                value: chain.name,
                label: (
                  <div className="text-white flex flex-row items-center">
                    {chain.name}
                  </div>
                ),
              });
            });
            setChains(chainsList);
          }
        }
      }
    };
    getData();
  }, [formData]);
  useEffect(() => {
    const getExchange = async () => {
      const res = await api.get("/price", {
        params: {
          giveCurrency: formData.giveCurrency,
          getCurrency: formData.getCurrency,
        },
      });
      const newExchange = res.data.price;
      // Оновлення formData з урахуванням нового значення exchange
      setFormData((prevFormData) => ({
        ...prevFormData,
        exchange: newExchange,
        getSum: prevFormData.giveSum * newExchange,
      }));
    };
    if (updateExchange) {
      getExchange();
      setUpdateExchange(false);
    }
  }, [formData.getCurrency, formData.giveCurrency, updateExchange]);
  if (isLoading) {
    return <Loader />;
  }
  const formatGroupLabel = (data: GroupedOption) => (
    <div>
      <span>{data.label}</span>
      <span>{data.options.length}</span>
    </div>
  );
  return (
    <>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          if (formData.type === "offline" && formData.city == "") {
            setModalData({
              ...modalData,
              title: t("error"),
              message: t("selectCity!"),
              buttonText: t("close"),
            });
            setShowModal(true);
            return;
          }
          if (
            formData.type === "transaction" &&
            formData.transactionType === "offline"
          ) {
            if (!formData.transactionTo || !formData.transactionFrom) {
              setModalData({
                ...modalData,
                title: t("error"),
                message: t("selectCities!"),
                buttonText: t("close"),
              });
              setShowModal(true);
              return;
            }
          }
          const res = await telegramService.sendData(formData);
          if (res === true) {
            setModalData({
              ...modalData,
              title: t("successfully"),
              message: t("applicationSent"),
              buttonText: t("close"),
            });
          } else {
            setModalData({
              ...modalData,
              title: t("successfully"),
              message: t("applicationNotSent"),
              buttonText: t("close"),
            });
          }
          setShowModal(true);
        }}
      >
        <div className="w-full drop-shadow-3xl-light bg-[#1a1c1e] rounded-[10px] p-[20px] flex flex-col gap-[10px] lg:flex-row rounded-t-none">
          {showCityList ? (
            <div className="lg:h-[625px] mb-[30px] lg:mb-0">
              <div className="lg:hidden">
                <h3 className="text-[24px] text-white leading-[28px] font-bold m-w-[33.33%] pl-[32px] mb-[30px] font-raleway">
                  {t("selectCity")}
                </h3>
                <SelectReact
                  isSearchable={true}
                  options={transformToOptions(townList)}
                  className="text-white"
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
                  value={selectedCity}
                  onChange={(value) => {
                    if (value !== null) {
                      setSelectedCity(value);
                      setFormData({
                        ...formData,
                        city: value.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="hidden lg:block h-full overflow-y-auto">
                <CityList
                  townList={townList}
                  currentCity={formData.city ? formData.city : ""}
                  setCity={(city) => setFormData({ ...formData, city: city })}
                  title={t("selectCity")}
                  height={625}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex-1">
            {type === "transaction" ? (
              <div className="flex flex-col justify-between mb-[30px]">
                <h4 className="text-[24px] text-white leading-[28px] font-bold m-w-[33.33%] pl-[32px] mb-[30px] font-raleway">
                  {t("selectTranslationType")}
                </h4>
                <ReactSelect
                  isSearchable={false}
                  options={[
                    { label: t("cash"), value: "offline" },
                    { label: t("onlineTransfer"), value: "online" },
                  ]}
                  value={transactionTypeValue}
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
                  onChange={(
                    value: SingleValue<{ value: string; label: string }>,
                  ) => {
                    if (value !== null) {
                      setFormData({
                        ...formData,
                        transactionType: value.value,
                      });
                      setTransactionTypeValue(value);
                      if (value.value == "offline") {
                        setShowCityForm(true);
                      } else {
                        setShowCityForm(false);
                      }
                    }
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {showCityForm ? (
              <div className="flex flex-col w-full justify-around gap-[20px] md:flex-row mb-[30px] max-h-[620px]">
                <div className="w-full">
                  <h3 className="text-[24px] text-white leading-[28px] font-bold pl-[32px] mb-[30px] font-raleway">
                    {t("from")}
                  </h3>
                  <SelectReact
                    isSearchable={false}
                    options={transformToOptions(townList)}
                    className="text-white"
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
                    value={transactionFrom}
                    onChange={(value) => {
                      if (value !== null) {
                        setTransactionFrom(value);
                        setFormData({
                          ...formData,
                          transactionFrom: value.value,
                        });
                      }
                    }}
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-[24px] text-white leading-[28px] font-bold pl-[32px] mb-[30px] font-raleway">
                    {t("to")}
                  </h3>
                  <SelectReact
                    isSearchable={false}
                    options={transformToOptions(townList)}
                    className="text-white"
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
                    value={transactionTo}
                    onChange={(value) => {
                      if (value !== null) {
                        setTransactionTo(value);
                        setFormData({
                          ...formData,
                          transactionTo: value.value,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col justify-between">
              <h3 className="text-[24px] text-white leading-[28px] font-bold m-w-[33.33%] pl-[32px] mb-[30px] font-raleway">
                {t("personalData")}
              </h3>
            </div>
            <div className="flex flex-row justify-between mb-[10px]">
              <p className="font-bold text-[16px]">{t("selectCurrency")}</p>
              <p className="font-bold ml-auto">
                1 {formData.giveCurrency?.value.toUpperCase()} ={" "}
                <span className="text-[#ffb932]">
                  {formData.exchange}{" "}
                  {formData.getCurrency?.value.toUpperCase()}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-[5px] mb-[20px] items-center lg:flex-row lg:items-star">
              <Select
                options={giveCurrency}
                selected={formData.giveCurrency}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    giveCurrency: value,
                    giveSum: 0,
                    getSum: 0,
                  });
                  setUpdateExchange(true);
                }}
              />
              <button
                type="button"
                className="w-[50px] h-[50px]"
                onClick={() => {
                  // При зміні масивів giveCurrency та getCurrency
                  let updatedGiveCurrency = [...giveCurrency]; // Клонуємо масиви, щоб не змінювати їх напряму
                  let updatedGetCurrency = [...getCurrency];
                  setGiveCurrency(updatedGetCurrency);
                  setGetCurrency(updatedGiveCurrency);
                  setFormData({
                    ...formData,
                    giveCurrency: formData.getCurrency,
                    getCurrency: formData.giveCurrency,
                  });
                  setUpdateExchange(true);
                }}
              >
                <Image src={exIcon} width={50} height={50} alt={"switch"} />
              </button>
              <Select
                options={getCurrency}
                placeholder="123"
                selected={formData.getCurrency}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    getCurrency: value,
                    giveSum: 0,
                    getSum: 0,
                  });
                  setUpdateExchange(true);
                }}
              />
            </div>
            <div className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
              <div className="w-full">
                <h4 className="pl-[20px] mb-[10px] font-bold">{t("give")}</h4>
                <input
                  value={formData.giveSum ? formData.giveSum : ""}
                  type="number"
                  className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      giveSum: parseFloat(e.target.value),
                      getSum:
                        parseFloat(e.target.value) * Number(formData.exchange),
                    });
                  }}
                  required
                />
              </div>
              <div className="w-full">
                <h4 className="pl-[20px] mb-[10px] font-bold">{t("get")}</h4>
                <input
                  value={formData.getSum ? formData.getSum : ""}
                  type="number"
                  className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      giveSum:
                        parseFloat(e.target.value) / Number(formData.exchange),
                      getSum: parseFloat(e.target.value),
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
              <div className="w-full">
                <h4 className="pl-[20px] mb-[10px] font-bold">{t("name")}:*</h4>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  type="text"
                  className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                />
              </div>
              <div className="w-full">
                <h4 className="pl-[20px] mb-[10px] font-bold">E-mail:</h4>
                <input
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  type="email"
                  className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
              <div className="w-full">
                <h4 className="pl-[20px] mb-[10px] font-bold">
                  {t("phone")}:*
                </h4>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                  required
                  className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                />
              </div>
              <div className="w-full">
                <h4 className="pl-[20px] mb-[10px] font-bold">Telegram:</h4>
                <input
                  value={formData.telegram}
                  onChange={(e) => {
                    setFormData({ ...formData, telegram: e.target.value });
                  }}
                  type="text"
                  className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                />
              </div>
            </div>
            {formData.type === "online" &&
            formData.giveCurrency?.type == "fiat" ? (
              <div className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
                <div className="w-full">
                  <h4 className="pl-[20px] mb-[10px] font-bold">
                    {t("network")}:*
                  </h4>
                  <SelectReact
                    isSearchable={false}
                    options={chains}
                    className="text-white"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "20px",
                        height: "40px",
                        background: "#1a1c1e",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        background: "#1a1c1e",
                      }),
                      menuList: (baseStyles, state) => ({
                        ...baseStyles,
                        background: "#1a1c1e",
                      }),
                    }}
                    value={selectedChain}
                    onChange={(value) => {
                      setSelectedChain(value);
                      setFormData({ ...formData, chain: value.value });
                    }}
                  />
                </div>
                <div className="w-full">
                  <h4 className="pl-[20px] mb-[10px] font-bold">
                    {t("wallet")}:*
                  </h4>
                  <input
                    type="text"
                    value={formData?.wallet}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        wallet: e.target.value,
                      });
                    }}
                    required
                    className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                  />
                </div>
              </div>
            ) : (formData.type === "online" &&
                formData.giveCurrency?.type == "crypto") ||
              (type === "transaction" &&
                formData.transactionType === "online") ? (
              <div className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
                <div className="w-full">
                  <h4 className="pl-[20px] mb-[10px] font-bold">
                    {t("bank")}:*
                  </h4>
                  <SelectReact
                    isSearchable={false}
                    options={banks}
                    className="text-white"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "20px",
                        height: "40px",
                        background: "#1a1c1e",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        background: "#1a1c1e",
                      }),
                      menuList: (baseStyles, state) => ({
                        ...baseStyles,
                        background: "#1a1c1e",
                      }),
                    }}
                    value={selectedBank}
                    onChange={(value) => {
                      setSelectedBank(value);
                      setFormData({ ...formData, bank: value.value });
                    }}
                  />
                </div>
                <div className="w-full">
                  <h4 className="pl-[20px] mb-[10px] font-bold">
                    {t("bill")}:*
                  </h4>
                  <input
                    type="text"
                    value={formData?.wallet}
                    onChange={(e) => {
                      setFormData({ ...formData, wallet: e.target.value });
                    }}
                    required
                    className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <p className="text-center font-bold text-[16px] mb-[10px] lg:text-right">
              {t("checkExactCourse")}
            </p>
            <div className="flex flex-row justify-center">
              <button className="bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-full md:w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]">
                {t("submit")}
              </button>
            </div>
          </div>
        </div>
      </form>
      {showModal ? (
        <Modal
          title={modalData.title}
          buttonText={modalData.buttonText}
          message={modalData.message}
          onClick={modalData.onClick}
        />
      ) : (
        ""
      )}
    </>
  );
}
