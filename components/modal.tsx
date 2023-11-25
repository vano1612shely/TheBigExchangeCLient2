export interface IModal {
  title: string;
  message: string;
  onClick: () => void;
  buttonText: string;
}

export default function Modal({ title, message, onClick, buttonText }: IModal) {
  return (
    <div className='fixed z-[49] bg-[#2f2f2f]/[0.5] w-full h-full left-0 top-0'>
      <div className='fixed z-50 lg:w-[400px] h-[200px] rounded-xl top-0 bottom-0 left-0 right-0 m-auto sm:w-[90%] bg-[#1a1c1e] p-[15px]'>
        <h3 className='font-bold text-[26px] mb-[15px]'>{title}</h3>
        <p className='text-[16px]'>{message}</p>
        <button
          onClick={() => onClick()}
          className='absolute bottom-[15px] right-[15px] bg-[#ffb932] flex flex-row rounded-[20px] text-[16px] text-[#1a1c1e] px-[20px] h-[40px] items-center font-bold hover:drop-shadow-3xl focus:drop-shadow-3xl ease-linear duration-200 active:bg-[#bb861f]'
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
