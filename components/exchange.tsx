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
  value: any;
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
      value: {title: city.city_name, id: city.id},
    }));

    options.push({
      label: country,
      options: cities,
    });
  });

  return options;
}
export default function Exchange() {
  const t = useTranslations("Index");
  const types = [{
      label: t("cashless"),
      value: 'cashless'
  },{
      label: t("cash"),
      value: 'cash'
  }, {
      label: t("crypto"),
      value: 'crypto'
  }]
  const [showCityList, setShowCityList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateExchange, setUpdateExchange] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModal>({
    title: "",
    buttonText: "",
    message: "",
    onClick: () => setShowModal(false),
  });
    const [banks, setBanks] = useState<any>([]);
    const [chains, setChains] = useState<any>([]);
    const [selectedBank, setSelectedBank] = useState<any>();
    const [selectedChain, setSelectedChain] = useState<any>();
  const [giveCurrency, setGiveCurrency] = useState<ICurrency[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>();
  const [getCurrency, setGetCurrency] = useState<ICurrency[]>([]);
  const [townList, setTownList] = useState<ICityByCountry>({});
  const [formData, setFormData] = useState<ITelegramSendMessageRequest>({
    getType: types[2],
    giveType: types[0],
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
      const give = await currencyService.getFiat();
      setGiveCurrency(give);
      const get = await currencyService.getCrypto();
      const towns = await cityService.getList();

      if (towns) setTownList(towns);
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
            setBanks(banksList);}
      setGetCurrency(get);
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
    }, [formData.getCurrency]);
    useEffect(() => {
        const getData = async () => {
            if(formData.getType.value === "cash" || formData.getType.value === "cashless") {
                const get = await currencyService.getFiat();
                setGetCurrency(get);
                const usd = get.find((g) => g.value.toLowerCase() == "usd");
                setFormData({
                    ...formData,
                    getCurrency: usd ? usd : get[0],
                });
            } else if(formData.getType.value === "crypto") {
                const get = await currencyService.getCrypto();
                setGetCurrency(get);
                const usd = get.find((g) => g.value.toLowerCase() == "usdt");
                setFormData({
                    ...formData,
                    getCurrency: usd ? usd : get[0],
                });
            }
            else {
                const get = await currencyService.getAll();
                setGetCurrency(get);
                const usdt = get.find((g) => g.value.toLowerCase() == "usdt");
                setFormData({
                    ...formData,
                    getCurrency: usdt ? usdt : get[0],
                });
            }
            setUpdateExchange(true);
        };
        getData()
    }, [formData.getType]);
    useEffect(() => {
        const getData = async () => {
            if(formData.giveType.value === "cash" || formData.giveType.value === "cashless") {
                const give = await currencyService.getFiat();
                setGiveCurrency(give);
                const usd = give.find((g) => g.value.toLowerCase() == "usd");
                setFormData({
                    ...formData,
                    giveCurrency: usd ? usd : give[0],
                });
            } else if(formData.giveType.value === "crypto") {
                const give = await currencyService.getCrypto();
                setGiveCurrency(give);
                const usd = give.find((g) => g.value.toLowerCase() == "usdt");
                setFormData({
                    ...formData,
                    giveCurrency: usd ? usd : give[0],
                });
            }
            else {
                const give = await currencyService.getAll();
                setGiveCurrency(give);
                const usdt = give.find((g) => g.value.toLowerCase() == "usdt");
                setFormData({
                    ...formData,
                    giveCurrency: usdt ? usdt : give[0],
                });
            }
            setUpdateExchange(true);
        };
        getData()
    }, [formData.giveType]);
  useEffect(() => {
    const getExchange = async () => {
      const res = await api.get("/price", {
        params: {
          giveCurrency: formData.giveCurrency,
          getCurrency: formData.getCurrency,
            city_id: formData.getType.value === "cash" || formData.giveType.value === "cash" ? formData.city_id: undefined
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
  }, [formData.getCurrency, formData.giveCurrency, updateExchange, formData.city_id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          if(formData.getType.value === "cash" && !formData.city_id) {
              setModalData({
                  ...modalData,
                  title: t("chooseCity"),
                  message: '',
                  buttonText: t("close")
              })
              setShowModal(true)
            return
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
                  id="select-country"
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
                    input: (baseStyles, state) => ({
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
                        city: value.value.title,
                          city_id: value.value.id
                      });
                      setUpdateExchange(true)
                    }
                  }}
                />
              </div>
              <div className="hidden lg:block h-full overflow-y-auto">
                <CityList
                  townList={townList}
                  currentCity={formData.city ? formData.city : ""}
                  setCity={(city) => {setFormData({ ...formData, city: city.city_name, city_id: city.id }); setUpdateExchange(true)}}
                  title={t("selectCity")}
                  height={625}
                />
              </div>
            </div>
          ) : (
            ""
          )}
            <div className="flex-1">
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
                    <div className="flex-1">
                        <SelectReact
                            className="mb-5"
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
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "#fff",
                                }),
                            }}
                            isSearchable={false}
                            options={types}
                            value={formData.giveType}
                            onChange={(value: any) => {
                                setFormData({
                                    ...formData,
                                    giveType: value
                                });
                                if (value.value === "cash") {
                                    setShowCityList(true)
                                } else if(formData.getType.value !== "cash"){
                                    setShowCityList(false)
                                }
                            }}
                        />
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
                    </div>
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
                        <Image src={exIcon} width={50} height={50} alt={"switch"}/>
                    </button>
                    <div className="flex-1">
                        <SelectReact
                            className="mb-5"
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
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "#fff",
                                }),
                            }}
                            isSearchable={false}
                            options={types}
                            value={formData.getType}
                            onChange={(value: any) => {
                                setFormData({
                                    ...formData,
                                    getType: value
                                });
                                if (value.value === "cash") {
                                    setShowCityList(true)
                                } else if(formData.giveType.value !== 'cash'){
                                    setShowCityList(false)
                                }
                            }}
                        />
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
                        /></div>
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
                                setFormData({...formData, name: e.target.value});
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
                                setFormData({...formData, email: e.target.value});
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
                                setFormData({...formData, phone: e.target.value});
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
                                setFormData({...formData, telegram: e.target.value});
                            }}
                            type="text"
                            className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                        />
                    </div>
                </div>
                {(formData.getType.value !== "cash" && formData.getCurrency?.type === "fiat") ? (
                    <div
                        className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
                        <div className="w-full">
                            <h4 className="pl-[20px] mb-[10px] font-bold">
                                {t("bank")}:*
                            </h4>
                            <SelectReact
                                id="select-bank"
                                isSearchable={true}
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
                                    input: (baseStyles, state) => ({
                                        ...baseStyles,
                                        color: "#fff",
                                    }),
                                }}
                                value={selectedBank}
                                onChange={(value) => {
                                    setSelectedBank(value);
                                    setFormData({...formData, bank: value.value});
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
                                    setFormData({...formData, wallet: e.target.value});
                                }}
                                required
                                className="w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light"
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {formData.getCurrency?.type === "crypto" &&
                <div className="flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]">
                    <div className="w-full">
                        <h4 className="pl-[20px] mb-[10px] font-bold">
                            {t("network")}:*
                        </h4>
                        <SelectReact
                            id="select-network"
                            isSearchable={true}
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
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "#fff",
                                }),
                            }}
                            value={selectedChain}
                            onChange={(value) => {
                                setSelectedChain(value);
                                setFormData({...formData, chain: value.value});
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
                </div>}
                <p className="text-center font-bold text-[16px] mb-[10px] lg:text-right">
                    {t("checkExactCourse")}
                </p>
                <div className="flex flex-row justify-center">
                    <button
                        className="bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-full md:w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]">
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
