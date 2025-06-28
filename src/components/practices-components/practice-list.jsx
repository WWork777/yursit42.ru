"use client";
import SelectVariants from "../UI/select";
import styles from "./practice-list.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

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

const PracticeCard = ({ titleCard, textCard, tag }) => {
  return (
    <motion.div
      className={styles.practice_card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4>{titleCard}</h4>
      <h5>{textCard}</h5>
      <p>{tag}</p>
      <button>
        ПЕРЕЙТИ К ДЕЛУ <Svg />
      </button>
    </motion.div>
  );
};

export default function Practice() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const practiceData = Array(54).fill({
    titleCard: "Раздел квартиры, купленной в браке",
    textCard: "Один из супругов не был собственником, но участвовал в выплатах",
    tag: "#Раздел имущества",
  });

  const totalPages = Math.ceil(practiceData.length / itemsPerPage);

  const currentItems = practiceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className={styles.practice}>
      <SelectVariants />
      <div className={styles.practice_list}>
        {currentItems.map((item, index) => (
          <PracticeCard
            key={index}
            titleCard={item.titleCard}
            textCard={item.textCard}
            tag={item.tag}
          />
        ))}
      </div>
      <div className={styles.pagination_container}>
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
        </div>
        <div className={styles.pagination_line}>
          <div
            className={styles.active_line}
            style={{
              width: `${100 / totalPages}%`,
              left: `${(currentPage - 1) * (100 / totalPages)}%`,
              transform: "translateX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
