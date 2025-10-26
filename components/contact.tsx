"use client";

import React from "react";
import Script from "next/script";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const t = useTranslations("intro");
  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>{t("contact_me")}</SectionHeading>
      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {t("contact_me_at")}
        <a className="underline" href="mailto:dionmaxfn+portfolio@gmail.com">
          {t("my_email")}
        </a>
        {t("contact_me_through")}
      </p>
      {/* Load Google reCAPTCHA v3 script */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      <form
        className="mt-10 flex flex-col"
        action={async (formData) => {
          const response = await sendEmail(formData);

          if (typeof response === "string") {
            toast.error(response);
            return;
          }

          const { data, error } = response;
          if (error) {
            toast.error(error.message);
            return;
          }

          toast.success("Message sent successfully");
        }}
      >
        <input
          className="px-4 h-14 rounded-lg borderBlack dark:text-black dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          required
          name="senderEmail"
          maxLength={50}
          placeholder={t("email")}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:text-black dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          placeholder={t("message")}
          required
          name="message"
          maxLength={500}
        />
        {/* Hidden field to receive reCAPTCHA token */}
        <input type="hidden" name="g-recaptcha-response" value="" />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
