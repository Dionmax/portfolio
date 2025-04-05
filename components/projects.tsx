"use client";

import React, { use } from "react";
import SectionHeading from "@/components/section-heading";
import Project from "@/components/project";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import coletumImg from "@/public/coletum.png";
import opentunaImg from "@/public/opentuna.png";
import propesqImg from "@/public/propesq.png";
import axispointeImg from "@/public/axispointe.png";
import { useTranslations } from "next-intl";
import { url } from "inspector";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const t = useTranslations("projects");

  const projectsData = [
    {
      title: t("1.title"),
      url: "https://www.axispointe.com/",
      description: t("1.description"),
      tags: ["PHP", "Symfony", "Postgresql"],
      imageUrl: axispointeImg,
    },
    {
      title: t("2.title"),
      url: "https://www.web.coletum.com/",
      description: t("2.description"),
      tags: ["React", "PHP", "MongoDB", "Postgresql", "Twig", "Symfony"],
      imageUrl: coletumImg,
    },
    {
      title: t("3.title"),
      url: "http://www.opentuna.org/",
      description: t("3.description"),
      tags: ["React", "NextJs", "MongoDB", "Postgresql", "React-Redux"],
      imageUrl: opentunaImg,
    },
    {
      title: t("4.title"),
      url: "http://www.propesq.pesca.sp.gov.br/",
      description: t("4.description"),
      tags: ["PHP", "Postgresql", "Twig", "Symfony", "GeoJson", "R", "XML"],
      imageUrl: propesqImg,
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="scroll-mt-28 mb-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>{t("heading")}</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
}
