import { useTranslations } from "next-intl";
import React from "react";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 text-xs">&copy; {t("heading")}</small>
      <p className="text-xs">
        <span className="font-semibold">{t("about")} </span>
        {t("description")}
      </p>
    </footer>
  );
}
