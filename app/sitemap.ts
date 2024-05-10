import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://thebigexchange.net/uk",
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: "https://thebigexchange.net/uk",
          en: "https://thebigexchange.net/en",
          ru: "https://thebigexchange.net/ru",
          pl: "https://thebigexchange.net/pl",
          kk: "https://thebigexchange.net/kk",
          ar: "https://thebigexchange.net/ar",
          he: "https://thebigexchange.net/he",
        },
      },
    },
    {
      url: "https://thebigexchange.net/uk/reviews",
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: "https://thebigexchange.net/uk/reviews",
          en: "https://thebigexchange.net/en/reviews",
          ru: "https://thebigexchange.net/ru/reviews",
          pl: "https://thebigexchange.net/pl/reviews",
          kk: "https://thebigexchange.net/kk/reviews",
          ar: "https://thebigexchange.net/ar/reviews",
          he: "https://thebigexchange.net/he/reviews",
        },
      },
    },
    {
      url: "https://thebigexchange.net/uk/blog",
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: "https://thebigexchange.net/uk/blog",
          en: "https://thebigexchange.net/en/blog",
          ru: "https://thebigexchange.net/ru/blog",
          pl: "https://thebigexchange.net/pl/blog",
          kk: "https://thebigexchange.net/kk/blog",
          ar: "https://thebigexchange.net/ar/blog",
          he: "https://thebigexchange.net/he/blog",
        },
      },
    },
  ];
}
