"use client";

import telegramService from "@/services/telegram/telegram.service";
import {useEffect, useState} from "react";
import {ArrowLeft, ArrowRight, Calendar, Globe, MapPin, RefreshCw, User, Wallet} from "lucide-react";
import dayjs from "dayjs";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
interface ExchangeRequest {
    id: number;
    requestID: string;
    createdAt: string;
    status: string;
    exchange: number;
    giveType: string;
    giveCurrency: string;
    giveSum: number;
    getType: string;
    getCurrency: string;
    getSum: number;
    wallet: string | null;
    from: string;
    city?: string;
}
export const MyRequest = ({id}: {id: string})=> {
    const t = useTranslations("request");
    const router = useRouter()
    const [request, setRequest] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const getData = async ()=> {
        try {setIsLoading(true);
        const data = await telegramService.getRequest(id)
        setRequest(data)
        } finally {
            setTimeout(() => setIsLoading(false), 2000)
        }
    }


    useEffect(() => {
        getData()
    }, []);

    const statusColors: Record<string, string> = {
        IN_PROGRESS: "bg-yellow-100 text-yellow-800",
        PAYOUT_PROCESS: "bg-blue-100 text-blue-800",
        COMPLETED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
    };
    const statusStyle = statusColors[request?.status] || "bg-gray-100 text-gray-800";
    if(request)
        return (
            <div className="h-[100vh] w-full flex justify-between items-center">
                <div
                    className="max-w-2xl w-full mx-auto border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 bg-white">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-lg font-semibold text-black">
                            <RefreshCw
                                className={`w-5 h-5 text-blue-600 cursor-pointer transition-transform ${
                                    isLoading ? "animate-spin" : ""
                                }`}
                                onClick={() => getData()}
                            />
                            {t("request")} {request.requestID}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle}`}>{t("status")}:{' '}
                            {t(request.status)}
        </span>
                    </div>

                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4"/>
                        {dayjs(request.createdAt).format("DD.MM.YYYY HH:mm")}
                    </div>

                    <div className="space-y-2 text-sm">
                        {request.city && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400"/>
                                <span className="text-gray-500">{t('city')}:</span>
                                <span className="font-medium text-gray-800">{request.city}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 flex-wrap">
                            <Globe className="w-4 h-4 text-gray-400"/>
                            <span className="text-gray-500">{t("exchange")}:</span>
                            <span className="font-medium text-gray-800">
            {request.giveSum} {request.giveCurrency} ({t(request.giveType)})
          </span>
                            <ArrowRight className="w-4 h-4 text-gray-400"/>
                            <span className="font-medium text-gray-800">
            {request.getSum} {request.getCurrency} ({t(request.getType)})
          </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-gray-400"/>
                            <span className="text-gray-500">{t("rate")}:</span>
                            <span className="font-medium text-gray-800">{request.exchange}</span>
                        </div>

                        {request.wallet && (
                            <div className="flex items-start gap-2 break-words">
                                <Wallet className="w-4 h-4 text-gray-400 mt-0.5"/>
                                <span className="text-gray-500">{t("wallet")}:</span>
                                <span className="font-medium text-gray-800 break-all">{request.wallet}</span>
                            </div>
                        )}
                    </div>
                    <div className="pt-4 flex w-full justify-around">
                        <button
                            onClick={() => router.push("/")}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                            <ArrowLeft className="w-4 h-4"/>{t('toHome')}
                        </button>
                    </div>
                </div>
            </div>
        );
}
