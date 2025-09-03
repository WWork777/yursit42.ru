"use client";
import SelectVariants from "../UI/select";
import styles from "./practice-list.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const Svg = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.70801 16.2916L16.2913 6.70831M16.2913 6.70831H6.70801M16.2913 6.70831V16.2916"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PracticeCard = ({ titleCard, textCard, tag, link }) => {
  return (
    <motion.div
      className={styles.practice_card}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4>{titleCard}</h4>
      <h5>{textCard}</h5>
      {/* <p>{tag}</p> */}
      <button>
        <Link
          href={`/practices/${link}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <h5 style={{ color: "white" }}>ПЕРЕЙТИ К ДЕЛУ</h5> <Svg />
        </Link>
      </button>
    </motion.div>
  );
};

export default function Practice() {
  return (
    <div className={styles.practice}>
      {/* <SelectVariants /> */}
      <div className={styles.practice_list}>
        <PracticeCard
          titleCard="Отказ в виндикации из-за добровольного отчуждения"
          textCard="Ограничение виндикации при добровольной передаче имущества третьему лицу"
          // tag={item.tag}
          link="praktika-1"
        />
        <PracticeCard
          titleCard="Частичное взыскание за неотделимые улучшения"
          textCard="Апелляция подтвердила обязанность арендодателя компенсировать согласованный ремонт, но отказала в возврате залога"
          // tag={item.tag}
          link="praktika-2"
        />
        <PracticeCard
          titleCard="Обязание предоставить благоустроенное жилье при расселении аварийного фонда"
          textCard="Апелляция отменила отказ в иске, обязав администрацию предоставить жилье с полным набором коммуникаций, соответствующих санитарным нормам"
          // tag={item.tag}
          link="praktika-3"
        />
        <PracticeCard
          titleCard="Отказ в оспаривании сделки в связи с пропуском срока исковой давности"
          textCard="Апелляция отменила решение первой инстанции, указав на законность сделок и пропуск срока исковой давности"
          // tag={item.tag}
          link="praktika-4"
        />
        <PracticeCard
          titleCard="Исключение тождественного иска при разделе наследственного имущества"
          textCard="Апелляция исключила дублирующий иск, сохранив право собственности за обоими наследниками, но отклонив повторное требование"
          // tag={item.tag}
          link="praktika-5"
        />
        <PracticeCard
          titleCard="Отмена решений из-за неисследованности доказательств выхода из кооператива"
          textCard="Кассация отменила решения нижестоящих судов за непринятие во внимание доказательств прекращения членства, отправив дело на пересмотр."
          // tag={item.tag}
          link="praktika-6"
        />
      </div>
      {/* <div className={styles.pagination_container}>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`${styles.page_number} ${currentPage === number ? styles.active : ""}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </div> */}
      {/* <div className={styles.pagination_line}>
          <div
            className={styles.active_line}
            style={{
              width: `${100 / totalPages}%`,
              left: `${(currentPage - 1) * (100 / totalPages)}%`,
              transform: "translateX(0)",
            }}
          />
        </div> */}
      {/* </div> */}
    </div>
  );
}
