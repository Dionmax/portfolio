"use client";

import React, { use } from "react";
import SectionHeading from "@/components/section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslations } from "next-intl";

export default function About() {
  const { ref } = useSectionInView("About", 0.95);
  const t = useTranslations("about");

  return (
    <motion.section
      id="about"
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>{t("heading")}</SectionHeading>

      <p
        className="mb-3 font-medium"
        dangerouslySetInnerHTML={{ __html: t.raw("description1") }}
      ></p>
      <p
        className="mb-3 font-medium"
        dangerouslySetInnerHTML={{ __html: t.raw("description2") }}
      ></p>
      <p
        className="mb-3 font-medium"
        dangerouslySetInnerHTML={{ __html: t.raw("description3") }}
      ></p>
      <p
        className="mb-3 font-medium"
        dangerouslySetInnerHTML={{ __html: t.raw("description4") }}
      ></p>
      <p
        className="mb-3 font-medium"
        dangerouslySetInnerHTML={{ __html: t.raw("description5") }}
      ></p>
    </motion.section>
  );
}
