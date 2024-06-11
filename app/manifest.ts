import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lukan Exchange",
    short_name: "Lukan Exchange",
    description:
      "Lukan Exchange - мгновенный обмен криптовалют в Украине. Низкие комиссии, безопасность, поддержка 24/7. Просто, быстро, надежно!",
    start_url: "/uk",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
  };
}
