import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import {MyRequest} from "../../../components/myRequest";
export const dynamic = "force-dynamic";

type Props = {
    params: { locale: string, id: string };
};


export default function Request({ params: { locale, id } }: Props) {
    unstable_setRequestLocale(locale);
    return <MyRequest id={id}/>;
}
