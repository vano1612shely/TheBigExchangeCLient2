import api from "@/services/api/interceptors";
import {useEffect, useState} from "react";
import moment from "moment";
import {StatusBadge} from "@/components/statusBadge";

export default function ClientsAdminForm() {
    const [requests, setRequest] = useState<any[]>([])
    const [meta, setMeta] = useState<{ page: number; perPage: number; totalPages: number }>({
        page: 1,
        perPage: 10,
        totalPages: 1,
    })

    const getData = async (page = meta.page) => {
        const res = await api.get(`/client/request?page=${page}`)
        setRequest(res.data.data);
        setMeta((prev) => ({
            ...prev,
            page,
            totalPages: res.data.meta.totalPages,
        }))
    }
    useEffect(() => {
        getData()
    }, [])
    const handlePageChange = (newPage: number) => {
        getData(newPage)
    }
  return (
      <div>
          <div>
              <div className="overflow-x-auto p-4">
                  <table className="min-w-full border border-gray-300 bg-white">
                      <thead className="bg-blue-600 text-white text-sm uppercase">
                      <tr>
                          {[
                              "ID", "Віддає", "Отримує", "Сума яку віддає", "Сума яку отримує", "Курс",
                              "Ім'я клієнта", "Telegram", "Телефон", "Email", "З якого ресурсу?", "Статус",
                              "Дата створення", "Гаманець"
                          ].map((header) => (
                              <th
                                  key={header}
                                  className="px-4 py-2 border border-gray-300 text-left font-semibold"
                              >
                                  {header}
                              </th>
                          ))}
                      </tr>
                      </thead>
                      <tbody className="text-sm text-gray-800">
                      {requests.map((r) => {
                          const formattedDate = moment(r.createdAt).format("DD.MM.YYYY, HH:mm")

                          let walletDisplay = r.wallet || "—"
                          if (r.getType === "crypto" && r.chain) {
                              walletDisplay = `${r.chain}: ${r.wallet}`
                          } else if (r.getType === "cashless" && r.bank) {
                              walletDisplay = `${r.bank}: ${r.wallet}`
                          }

                          return (
                              <tr key={r.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-2 border border-gray-300">{r.id}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.giveCurrency}({r.giveType})</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.getCurrency}({r.getType})</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.giveSum.toFixed(2)}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.getSum}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.exchange}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.client?.name || "—"}</td>
                                  <td className="px-4 py-2 border border-gray-300">@{r.client?.telegram || "—"}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.client?.phone || "—"}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.client?.email || "—"}</td>
                                  <td className="px-4 py-2 border border-gray-300">{r.from}</td>
                                  <td className="px-4 py-2 border border-gray-300">
                                      <StatusBadge
                                          status={r.status}
                                          requestId={r.id}
                                          onUpdate={() => getData(meta.page)}
                                      />
                                  </td>
                                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{formattedDate}</td>
                                  <td className="px-4 py-2 border border-gray-300 break-all">{walletDisplay}</td>
                              </tr>
                          )
                      })}
                      </tbody>
                  </table>

                  {/* Пагінація */}
                  <div className="flex justify-center items-center gap-2 mt-4">
                      <button
                          disabled={meta.page === 1}
                          onClick={() => handlePageChange(meta.page - 1)}
                          className="px-3 py-1 rounded text-black border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
                      >
                          Назад
                      </button>

                      {[...Array(meta.totalPages)].map((_, i) => {
                          const page = i + 1
                          return (
                              <button
                                  key={page}
                                  onClick={() => handlePageChange(page)}
                                  className={`px-3 py-1 rounded border text-black ${meta.page === page
                                      ? "bg-blue-600 text-white"
                                      : "border-gray-300 bg-white hover:bg-gray-100 "
                                  }`}
                              >
                                  {page}
                              </button>
                          )
                      })}

                      <button
                          disabled={meta.page === meta.totalPages}
                          onClick={() => handlePageChange(meta.page + 1)}
                          className="px-3 py-1 rounded text-black border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
                      >
                          Далі
                      </button>
                  </div>
              </div>
          </div>

          <h3 className='font-bold mb-[30px]'>Скачать данные:</h3>
          <ul className='flex flex-col gap-[10px] mb-[30px]'>
              <li>
                  <button
                      onClick={async () => {
                          const response = await api.get("/client/downloadClientCsv", {
                              responseType: "blob",
                              maxRedirects: 0, // Вимикаємо автоматичні перенаправлення
                          });
                          const redirectUrl = response.request.responseURL;
                          const link = document.createElement("a");
                          link.href = redirectUrl;
                          link.target = "_blank"; // Це відкриє посилання в новій вкладці
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                      }}
                      className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
                  >
                      Скачать данные про клиентов CSV
                  </button>
              </li>
              <li>
                  <button
                      onClick={async () => {
                          const response = await api.get("/client/downloadClientExcel", {
                              responseType: "blob",
                              maxRedirects: 0, // Вимикаємо автоматичні перенаправлення
                          });
                          const redirectUrl = response.request.responseURL;
                          const link = document.createElement("a");
                          link.href = redirectUrl;
                          link.target = "_blank"; // Це відкриє посилання в новій вкладці
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                      }}
                      className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
                  >
                      Скачать данные про клиентов Excel
                  </button>
              </li>
              <li>
                  <button
                      onClick={async () => {
                          const response = await api.get("/client/downloadRequestCsv", {
                              responseType: "blob",
                              maxRedirects: 0, // Вимикаємо автоматичні перенаправлення
                          });
                          const redirectUrl = response.request.responseURL;
                          const link = document.createElement("a");
                          link.href = redirectUrl;
                          link.target = "_blank"; // Це відкриє посилання в новій вкладці
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                      }}
                      className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
                  >
                      Скачать данные про заявки CSV
                  </button>
              </li>
              <li>
                  <button
                      onClick={async () => {
                          const response = await api.get("/client/downloadRequestExcel", {
                              responseType: "blob",
                              maxRedirects: 0, // Вимикаємо автоматичні перенаправлення
                          });
                          const redirectUrl = response.request.responseURL;
                          const link = document.createElement("a");
                          link.href = redirectUrl;
                          link.target = "_blank"; // Це відкриє посилання в новій вкладці
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                      }}
                      className='bg-[#ffb932] rounded-[20px] text-[16px] text-center text-[#1a1c1e] px-[20px] h-[40px] w-[50%] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
                  >
                      Скачать данные про заявки Excel
                  </button>
              </li>
          </ul>
      </div>
  );
}
