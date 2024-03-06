"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

type Locale = "en" | "pt";

export default function LocaleSwitch() {
  const locale = useLocale() as Locale;
  const router = useRouter();

  function handleLocaleChange(newLocale: Locale): void {
    router.replace(`/${newLocale}`);
  }

  return (
    <div className="absolute top-[5rem] right-5 sm:top-5">
      <button
        onClick={() => handleLocaleChange("en")}
        className={`${
          locale === "en"
            ? "text-gray-950 dark:text-gray-50"
            : "text-gray-400 dark:text-gray-"
        } hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50`}
      >
        EN
      </button>
      <span className="mx-2">/</span>
      <button
        onClick={() => handleLocaleChange("pt")}
        className={`${
          locale === "pt"
            ? "text-gray-950 dark:text-gray-50"
            : "text-gray-400 dark:text-gray-500"
        } hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50`}
      >
        PT
      </button>
    </div>
  );
}
