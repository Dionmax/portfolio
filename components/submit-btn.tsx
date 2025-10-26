"use client";
import React, { useCallback, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function SubmitBtn() {
  const [pending, setPending] = useState(false);
  const t = useTranslations("button");

  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string | undefined;
    const button = e.currentTarget;
    const form = button.closest("form");
    if (!form) return;

    // If no site key, just submit (failsafe)
    if (!siteKey) {
      form.requestSubmit();
      return;
    }

    const setTokenAndSubmit = async () => {
      try {
        setPending(true);
        const token = await window.grecaptcha!.execute(siteKey, { action: "contact" });
        let input = form.querySelector<HTMLInputElement>('input[name="g-recaptcha-response"]');
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = "g-recaptcha-response";
          form.appendChild(input);
        }
        input.value = token;
        form.requestSubmit();
      } catch (err) {
        console.error("reCAPTCHA execution failed", err);
        form.requestSubmit();
      } finally {
        setPending(false);
      }
    };

    if (window.grecaptcha?.execute) {
      await setTokenAndSubmit();
    } else if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(setTokenAndSubmit);
    } else {
      // Script not loaded yet, wait a bit then try to submit anyway
      setTimeout(() => form.requestSubmit(), 300);
    }
  }, []);

  return (
    <button
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] 
      bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 
      hover:scale-110 active:scale-105 hover:bg-gray-950 disabled:scale-100 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10"
      type="button"
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          <span>{t("submit")}</span>
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}
