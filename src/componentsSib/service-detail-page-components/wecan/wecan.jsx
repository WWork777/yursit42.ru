"use client";
import styles from "./wecan.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";

const WeCanHelp = ({ weCanCardTitle, weCanCardText }) => {
  return (
    <motion.div
      className={styles.wecan_card}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4>{weCanCardTitle}</h4>
      <h5>{weCanCardText}</h5>
    </motion.div>
  );
};

export default function WeCan({ weCanTitle, helpBlocks }) {
  const cardData = [
    { title: helpBlocks[0], text: helpBlocks[1] },
    { title: helpBlocks[2], text: helpBlocks[3] },
    { title: helpBlocks[4], text: helpBlocks[5] },
    { title: helpBlocks[6], text: helpBlocks[7] },
  ];
  return (
    <section className="section-main">
      <Link href={"/novosibirsk/services"} className={styles.wecan_link}>
        <h5>← Ко всем услугам</h5>
      </Link>
      <motion.h1
        dangerouslySetInnerHTML={{ __html: weCanTitle }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.wecan_title}
      ></motion.h1>
      <div className={styles.wecan_cards_container}>
        {cardData.map((card, index) => (
          <WeCanHelp
            key={index}
            weCanCardTitle={card.title}
            weCanCardText={card.text}
          />
        ))}
      </div>
    </section>
  );
}
