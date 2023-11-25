import api from "@/services/api/interceptors";

export default function ClientsAdminForm() {
  return (
    <div className='p-[30px]'>
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
