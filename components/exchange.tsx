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
export default function Exchange({
  type,
}: {
  type: "transaction" | "online" | "offline";
}) {
  const [showCityList, setShowCityList] = useState<boolean>(true);
  const [showCityForm, setShowCityForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateExchange, setUpdateExchange] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [transactionTypeValue, setTransactionTypeValue] = useState<{
    value: string;
    label: string;
  }>({ label: "Безнал", value: "online" });
  const [modalData, setModalData] = useState<IModal>({
    title: "",
    buttonText: "",
    message: "",
    onClick: () => setShowModal(false),
  });
  const [giveCurrency, setGiveCurrency] = useState<ICurrency[]>([]);
  const [banks, setBanks] = useState<any>([]);
  const [selectedBank, setSelectedBank] = useState<any>();
  const [getCurrency, setGetCurrency] = useState<ICurrency[]>([]);
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
  });
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const give = await currencyService.getCrypto();
      setGiveCurrency(give);
      const get = await currencyService.getFiat();
      setGetCurrency(get);
      const banksRes = await banksService.getAll();
      if (banksRes) {
        let banksList: any = [];
        banksRes.map(
          (bank: { id: number; name: string; icon_link?: string }) => {
            banksList.push({
              value: bank.name,
              label: (
                <div className='text-white flex flex-row items-center'>
                  {bank.icon_link ? (
                    <Image
                      src={URL + "/" + bank.icon_link}
                      alt={bank.name}
                      width={30}
                      height={30}
                      className='mr-[5px]'
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
      setFormData({ ...formData, giveCurrency: give[0], getCurrency: get[0] });
      setUpdateExchange(true);
      setIsLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    if (type !== "offline") {
      setShowCityList(false);
    } else {
      setShowCityList(true);
    }
    if (type === "transaction") {
      const getData = async () => {
        const fiat = await currencyService.getFiat();
        setGetCurrency(fiat);
        setGiveCurrency(fiat);
        setFormData({
          ...formData,
          type: type,
          giveCurrency: fiat[0],
          getCurrency: fiat[0],
        });
        setUpdateExchange(true);
      };
      getData();
    } else {
      const getData = async () => {
        const give = await currencyService.getCrypto();
        setGiveCurrency(give);
        const get = await currencyService.getFiat();
        setGetCurrency(get);
        setFormData({
          ...formData,
          type: type,
          giveCurrency: give[0],
          getCurrency: get[0],
        });
        setUpdateExchange(true);
      };
      getData();
    }
    setShowCityForm(false);
  }, [type]);
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
  }, [updateExchange]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <form
        action=''
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(formData);
          const res = await telegramService.sendData(formData);
          if (res === true) {
            setModalData({
              ...modalData,
              title: "Успешно",
              message: "Заявка отправлена",
              buttonText: "Закрыть",
            });
          } else {
            setModalData({
              ...modalData,
              title: "Ошибка",
              message: "Заявка не была обработана, попробуйте позже",
              buttonText: "Закрыть",
            });
          }
          setShowModal(true);
        }}
      >
        <div className='w-full drop-shadow-3xl-light bg-[#1a1c1e] rounded-[10px] p-[20px] flex flex-col gap-[10px] lg:flex-row rounded-t-none'>
          {showCityList ? (
            <div className='max-h-[300px] lg:max-h-[625px] overflow-y-auto'>
              <CityList
                currentCity={formData.city ? formData.city : ""}
                setCity={(city) => setFormData({ ...formData, city: city })}
                title='Выберите город'
              />
            </div>
          ) : (
            ""
          )}
          <div className='flex-1'>
            {type === "transaction" ? (
              <div className='flex flex-col justify-between mb-[30px]'>
                <h4 className='text-[20px] text-white leading-[28px] font-bold m-w-[33.33%] pl-[32px] mb-[10px] font-raleway'>
                  Выберите тип перевода
                </h4>
                <ReactSelect
                  options={[
                    { label: "Безнал", value: "online" },
                    { label: "Наличние", value: "offline" },
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
              <div className='flex flex-col w-full justify-around gap-[20px] md:flex-row mb-[30px] max-h-[500px]'>
                <div className='max-h-[200px] overflow-y-auto'>
                  <CityList
                    currentCity={
                      formData.transactionFrom ? formData.transactionFrom : ""
                    }
                    setCity={(city) =>
                      setFormData({ ...formData, transactionFrom: city })
                    }
                    title='Откуда:'
                  />
                </div>
                <div className='max-h-[200px] overflow-y-auto'>
                  <CityList
                    currentCity={
                      formData.transactionTo ? formData.transactionTo : ""
                    }
                    setCity={(city) =>
                      setFormData({ ...formData, transactionTo: city })
                    }
                    title='Куда:'
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className='flex flex-col justify-between'>
              <h3 className='text-[24px] text-white leading-[28px] font-bold m-w-[33.33%] pl-[32px] mb-[30px] font-raleway'>
                Персональные данные
              </h3>
            </div>
            <div className='flex flex-row justify-between mb-[10px]'>
              <p className='font-bold text-[16px]'>Выберите валюту: </p>
              <p className='font-bold ml-auto'>
                1 {formData.giveCurrency?.value.toUpperCase()} ={" "}
                <span className='text-[#ffb932]'>
                  {formData.exchange}{" "}
                  {formData.getCurrency?.value.toUpperCase()}
                </span>
              </p>
            </div>
            <div className='flex flex-col gap-[5px] mb-[20px] items-center lg:flex-row lg:items-star'>
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
                type='button'
                className='w-[50px] h-[50px]'
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
                placeholder='123'
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
            <div className='flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]'>
              <div className='w-full'>
                <h4 className='pl-[20px] mb-[10px] font-bold'>Отдаю:</h4>
                <input
                  value={formData.giveSum ? formData.giveSum : ""}
                  type='number'
                  className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
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
              <div className='w-full'>
                <h4 className='pl-[20px] mb-[10px] font-bold'>Получаю:</h4>
                <input
                  value={formData.getSum ? formData.getSum : ""}
                  type='number'
                  className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
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
            <div className='flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]'>
              <div className='w-full'>
                <h4 className='pl-[20px] mb-[10px] font-bold'>Имя:*</h4>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  type='text'
                  className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
                />
              </div>
              <div className='w-full'>
                <h4 className='pl-[20px] mb-[10px] font-bold'>E-mail:</h4>
                <input
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  type='email'
                  className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
                />
              </div>
            </div>
            <div className='flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]'>
              <div className='w-full'>
                <h4 className='pl-[20px] mb-[10px] font-bold'>Телефон:*</h4>
                <input
                  type='text'
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                  required
                  className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
                />
              </div>
              <div className='w-full'>
                <h4 className='pl-[20px] mb-[10px] font-bold'>Telegram:</h4>
                <input
                  value={formData.telegram}
                  onChange={(e) => {
                    setFormData({ ...formData, telegram: e.target.value });
                  }}
                  type='text'
                  className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
                />
              </div>
            </div>
            {formData.type === "online" &&
            formData.giveCurrency?.type == "fiat" ? (
              <div className='flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]'>
                <div className='w-full'>
                  <h4 className='pl-[20px] mb-[10px] font-bold'>Кошелек:*</h4>
                  <input
                    type='text'
                    value={formData?.wallet}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        wallet: e.target.value,
                        walletType: "cryptoWallet",
                      });
                    }}
                    required
                    className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
                  />
                </div>
              </div>
            ) : (formData.type === "online" &&
                formData.giveCurrency?.type == "crypto") ||
              (type === "transaction" &&
                formData.transactionType === "online") ? (
              <div className='flex flex-col gap-[20px] mb-[20px] items-center lg:flex-row lg:items-star lg:gap-[5px]'>
                <div className='w-full'>
                  <h4 className='pl-[20px] mb-[10px] font-bold'>Банк:*</h4>
                  <SelectReact
                    options={banks}
                    className='text-white'
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
                      setFormData({ ...formData, walletType: value.value });
                    }}
                  />
                </div>
                <div className='w-full'>
                  <h4 className='pl-[20px] mb-[10px] font-bold'>Счет:*</h4>
                  <input
                    type='text'
                    value={formData?.wallet}
                    onChange={(e) => {
                      setFormData({ ...formData, wallet: e.target.value });
                    }}
                    required
                    className='w-full h-[40px] rounded-[20px] bg-[#1a1c1e] border border-white p-[2px] pl-[30px] appearance-none focus:drop-shadow-1xl-light'
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <p className='text-center font-bold text-[16px] mb-[10px] lg:text-right'>
              Точный курс узнавайте у менеджера!
            </p>
            <div className='flex flex-row justify-center'>
              <button className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-full md:w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'>
                Подать заявку
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
