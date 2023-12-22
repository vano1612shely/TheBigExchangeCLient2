import { IChain } from "@/services/chains/chain-service.interface";
import chainService from "@/services/chains/chain.service";
import { ICurrency } from "@/services/currency/currency-service.interface";
import currencyService from "@/services/currency/currency.service";
import { SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";

export function UpdateChainForm({
  id,
  currencies,
  closeEvent,
}: {
  id: number;
  currencies: ICurrency[];
  closeEvent: () => void;
}) {
  const [chain, setChain] = useState<IChain>();
  const [chainName, setChainName] = useState<string>("");
  useEffect(() => {
    const getData = async () => {
      const res = await chainService.getById(id);
      setChainName(res.name);
      setChain(res);
    };
    getData();
  }, [id]);
  if (chain)
    return (
      <form className='flex flex-col gap-[10px] mb-[30px]'>
        <div className='flex gap-[10px]'>
          <label htmlFor='chainName'>Название:</label>
          <input
            className='text-[#000]'
            type='text'
            id='chainName'
            value={chainName}
            onChange={(e) => {
              setChainName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className='mb-[10px]'>Выберете валюты:</label>
          <div className='flex max-w-[300px] flex-wrap gap-[10px]'>
            {currencies.map((currency: ICurrency) => {
              let checked = false;
              chain.currencies.map((item) => {
                if (item.id == currency.id) checked = true;
              });
              return currency.id ? (
                <div key={currency.id}>
                  <input
                    type='checkbox'
                    name={String(currency.id) + "update"}
                    id={String(currency.id) + "update"}
                    value={currency.id}
                    checked={checked}
                    onChange={async (e) => {
                      if (currency.id)
                        if (e.target.checked) {
                          const res = await chainService.addLink(
                            chain.id,
                            currency.id,
                          );
                          setChain(res);
                        } else {
                          const res = await chainService.deleteLink(
                            chain.id,
                            currency.id,
                          );
                          setChain(res);
                        }
                    }}
                  />
                  <label htmlFor={String(currency.id) + "update"}>
                    {currency.title}
                  </label>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
        <button
          type='button'
          onClick={async () => {
            const res = await chainService.update(id, chainName);
            closeEvent();
          }}
          className='bg-[#ffb932] p-[5px] rounded w-[300px]'
        >
          Сохранить
        </button>
      </form>
    );
}

export default function ChainAdminForm() {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]); // Список криптовалют
  const [selectedCurrencies, setSelectedCurrencies] = useState<number[]>([]); // Обрані криптовалюти
  const [chainName, setChainName] = useState<string>(""); // Назва блокчейну
  const [chains, setChains] = useState<IChain[]>([]); // Список доступних блокчейнів
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<number>(0);
  // Отримання списку криптовалют з API
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await currencyService.getCrypto();
        setCurrencies(response);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  // Отримання списку блокчейнів з вашого API (потрібно виконати запит)
  useEffect(() => {
    const fetchChains = async () => {
      try {
        // Виконайте запит для отримання списку блокчейнів
        // const response = await axios.get('YOUR_ENDPOINT_FOR_CHAINS');
        // setChains(response.data);

        // Приклад тестового списку блокчейнів (поки не маєте реального ендпоінту)
        const res = await chainService.getAll();
        setChains(res);
      } catch (error) {
        console.error("Error fetching chains:", error);
      }
    };
    fetchChains();
  }, []);

  // Обробник події вибору криптовалют
  const handleCurrencySelect = (e: {
    target: { value: any; checked: any };
  }) => {
    const { value, checked } = e.target;
    const newVal = Number(value);
    if (checked) {
      setSelectedCurrencies([...selectedCurrencies, newVal]);
    } else {
      setSelectedCurrencies(
        selectedCurrencies.filter((currency) => currency !== newVal),
      );
    }
  };

  // Обробник події введення назви блокчейну
  const handleChainNameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setChainName(e.target.value);
  };

  // Логіка для відправки даних до сервера при натисканні кнопки "Додати"
  const handleAddChain = async () => {
    try {
      const newChain = await chainService.create(chainName, selectedCurrencies);
      setChains([...chains, newChain]);
    } catch (error) {
      console.error("Error adding chain:", error);
    }
  };

  return (
    <div className='p-[15px]'>
      <h2 className='mb-[10px]'>Добавить новую сеть</h2>
      <form className='flex flex-col gap-[10px] mb-[30px]'>
        <div className='flex gap-[10px]'>
          <label htmlFor='chainName'>Название:</label>
          <input
            className='text-[#000]'
            type='text'
            id='chainName'
            value={chainName}
            onChange={handleChainNameChange}
          />
        </div>
        <div>
          <label className='mb-[10px]'>Выберете валюты:</label>
          <div className='flex max-w-[300px] flex-wrap gap-[10px]'>
            {currencies.map((currency: ICurrency) =>
              currency.id ? (
                <div key={currency.id}>
                  <input
                    type='checkbox'
                    id={String(currency.id)}
                    value={currency.id}
                    checked={selectedCurrencies.includes(Number(currency.id))}
                    onChange={handleCurrencySelect}
                  />
                  <label htmlFor={String(currency.id)}>{currency.title}</label>
                </div>
              ) : (
                ""
              ),
            )}
          </div>
        </div>
        <button
          type='button'
          onClick={handleAddChain}
          className='bg-[#ffb932] p-[5px] rounded w-[300px]'
        >
          Добавить
        </button>
      </form>
      <div>
        <h3 className='mb-[15px]'>Список доступных сетей:</h3>
        <ul>
          {chains.map((chain) => (
            <li key={chain.id} className='gap-[15px] flex'>
              <button
                className='text-[#ffb932]'
                onClick={() => {
                  setSelectedChain(chain.id);
                  setShowModal(true);
                }}
              >
                {chain.name}
              </button>
              <button
                className='bg-[#ffb932] p-[5px] rounded'
                onClick={async () => {
                  const res = await chainService.delete(chain.id);
                  let tmp = [...chains];
                  tmp = tmp.filter((item) => item.id !== res.id);
                  setChains(tmp);
                }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showModal ? (
        <Modal
          title={"Обновление сети"}
          buttonText={"Закрыть"}
          size={{ width: 500, height: 400 }}
          message={
            <UpdateChainForm
              id={selectedChain}
              currencies={currencies}
              closeEvent={() => setShowModal(false)}
            />
          }
          onClick={() => {
            setShowModal(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
