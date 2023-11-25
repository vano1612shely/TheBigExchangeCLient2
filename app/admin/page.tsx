"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import InfoAdminForm from "@/components/infoAdminForm";
import CityAdminForm from "@/components/cityAdminForm";
import CurrencyAdminForm from "@/components/currencyAdminForm";
import Container from "@/components/container";
import { useActions } from "@/hooks/useActions";
import AddressAdminForm from "@/components/addressAdminForm";
import BankAdminForm from "@/components/banksAdminForm";
import ClientsAdminForm from "@/components/clientsAdminForm";
export default function Home() {
  const { user } = useAuth();
  const { logout } = useActions();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<
    "info" | "city" | "currency" | "address" | "banks" | "clients"
  >("info");
  useEffect(() => {
    if (!user) {
      router.push("/admin/login"); // Перенаправлення на сторінку входу, якщо немає токену
      return;
    }
  }, [user]);
  if (user)
    return (
      <Container className='pt-[50px]'>
        <div className='flex flex-row gap-[10px]'>
          <button
            className={`hover:text-[#ffb932] ease-linear duration-300 ${
              selectedItem == "info" ? "text-[#ffb932]" : ""
            }`}
            onClick={() => {
              setSelectedItem("info");
            }}
          >
            Основное
          </button>
          <button
            className={`hover:text-[#ffb932] ease-linear duration-300 ${
              selectedItem == "city" ? "text-[#ffb932]" : ""
            }`}
            onClick={() => {
              setSelectedItem("city");
            }}
          >
            Города
          </button>
          <button
            className={`hover:text-[#ffb932] ease-linear duration-300 ${
              selectedItem == "currency" ? "text-[#ffb932]" : ""
            }`}
            onClick={() => {
              setSelectedItem("currency");
            }}
          >
            Валюты
          </button>
          <button
            className={`hover:text-[#ffb932] ease-linear duration-300 ${
              selectedItem == "address" ? "text-[#ffb932]" : ""
            }`}
            onClick={() => {
              setSelectedItem("address");
            }}
          >
            Адреса
          </button>
          <button
            className={`hover:text-[#ffb932] ease-linear duration-300 ${
              selectedItem == "banks" ? "text-[#ffb932]" : ""
            }`}
            onClick={() => {
              setSelectedItem("banks");
            }}
          >
            Банки
          </button>
          <button
            className={`hover:text-[#ffb932] ease-linear duration-300 ${
              selectedItem == "clients" ? "text-[#ffb932]" : ""
            }`}
            onClick={() => {
              setSelectedItem("clients");
            }}
          >
            Клиенты
          </button>
          <button
            className='hover:text-[#ffb932] ease-linear duration-300'
            onClick={async () => {
              await logout();
            }}
          >
            Выход
          </button>
        </div>
        {selectedItem == "info" ? <InfoAdminForm /> : ""}
        {selectedItem == "city" ? <CityAdminForm /> : ""}
        {selectedItem == "currency" ? <CurrencyAdminForm /> : ""}
        {selectedItem == "address" ? <AddressAdminForm /> : ""}
        {selectedItem == "banks" ? <BankAdminForm /> : ""}
        {selectedItem == "clients" ? <ClientsAdminForm /> : ""}
      </Container>
    );
}
