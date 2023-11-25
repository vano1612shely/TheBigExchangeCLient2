"use client";
import { useEffect, useState } from "react";
import { useActions } from "@/hooks/useActions";
import { IAuthFormData } from "@/types/auth.interface";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useActions();
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<IAuthFormData>({
    login: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      router.push("/admin"); // Перенаправлення на сторінку входу, якщо немає токену
      return;
    }
  }, [user]);
  return (
    <div>
      <form
        className='w-[500px] mx-auto mt-[100px] flex flex-col gap-[20px]'
        onSubmit={async (e) => {
          e.preventDefault();
          await login(userData);
        }}
      >
        <input
          type='text'
          name='login'
          value={userData.login}
          onChange={(e) => {
            setUserData({ ...userData, login: e.target.value });
          }}
          className='bg-transparent border-white border focus:border-[#ffb932] ease-linear duration-300 p-[10px] rounded-[20px] pl-[30px]'
          placeholder='Логин'
        />
        <input
          type='password'
          name='password'
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
          className='bg-transparent border-white border focus:border-[#ffb932] ease-linear duration-300 p-[10px] rounded-[20px] pl-[30px]'
          placeholder='Пароль'
        />
        <button
          type='submit'
          className='border-[#ffb932] bg-[#ffb932] p-[20px] font-bold rounded-[20px]'
        >
          Войти
        </button>
      </form>
    </div>
  );
}
