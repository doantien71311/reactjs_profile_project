import i18n from "i18next";
import Backend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: false,
    lng: "vn",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // path to translation files
    },
  });
