"use client";

import React, { createElement, use } from "react";
import SectionHeading from "@/components/section-heading";
import { useSectionInView } from "@/lib/hooks";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import { useTranslations } from "next-intl";

import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { GiMaterialsScience } from "react-icons/gi";
import { TbBrandCSharp } from "react-icons/tb";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.3);
  const { theme } = useTheme();

  const t = useTranslations("experiences");

  const experiencesData = [
    {
      title: t("8.title"),
      location: t("8.location"),
      description: t("8.description"),
      icon: createElement(CgWorkAlt),
      date: t("8.date"),
    },
    {
      title: t("7.title"),
      location: t("7.location"),
      description: t("7.description"),
      icon: createElement(GiMaterialsScience),
      date: t("7.date"),
    },
    {
      title: t("6.title"),
      location: t("6.location"),
      description: t("6.description"),
      icon: createElement(GiMaterialsScience),
      date: t("6.date"),
    },
    {
      title: t("5.title"),
      location: t("5.location"),
      description: t("5.description"),
      icon: createElement(GiMaterialsScience),
      date: t("5.date"),
    },
    {
      title: t("4.title"),
      location: t("4.location"),
      description: t("4.description"),
      icon: createElement(GiMaterialsScience),
      date: t("4.date"),
    },
    {
      title: t("3.title"),
      location: t("3.location"),
      description: t("3.description"),
      icon: createElement(CgWorkAlt),
      date: t("3.date"),
    },
    {
      title: t("2.title"),
      location: t("2.location"),
      description: t("2.description"),
      icon: createElement(LuGraduationCap),
      date: t("2.date"),
    },
    {
      title: t("1.title"),
      location: t("1.location"),
      description: t("1.description"),
      icon: createElement(TbBrandCSharp),
      date: t("1.date"),
    },
  ] as const;

  return (
    <motion.section
      id="experience"
      className="scroll-mt-28 mb-28 sm:mb-40"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>{t("heading")}</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible
              className="vertical-timeline-element--work"
              contentStyle={{
                background:
                  theme == "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.5)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme == "light"
                    ? "0.4rem solid  #9ca3af"
                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme == "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </motion.section>
  );
}
