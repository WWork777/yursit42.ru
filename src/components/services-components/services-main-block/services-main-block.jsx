"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./services-main-block.module.scss";
import Link from "next/link";
import ServicesMainGrLink from "../../../../public/svg/services-page/grLink";
import ServicesMainBzLink from "../../../../public/svg/services-page/bzLink";
import { motion } from "framer-motion";
import servicesGrData from "@/data/services-gr.json";
import servicesBzData from "@/data/services-bz.json";
import { useRouter } from 'next/navigation';

const ServicesMainBlockCardGr = ({
  servicesCardTitle,
  items = [],
  isDark = false,
}) => {
  return (
    <div className={`${styles.services_main_block_card_gr}`}>
      <p>{servicesCardTitle}</p>
      <div className={styles.card_content}>
        {items.map((item, index) => (
          <Link key={index} href={`/fiz/${item.slug}`} className={styles.link}>
            <h5>{item.text}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ServicesMainBlockCardBz = ({
  servicesCardTitle,
  items = [],
  isDark = false,
}) => {
  return (
    <div className={`${styles.services_main_block_card_bz}`}>
      <p>{servicesCardTitle}</p>
      <div className={styles.card_content}>
        {items.map((item, index) => (
          <Link key={index} href={`/yur/${item.slug}`} className={styles.link}>
            <h5>{item.text}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ServicesMainBlockCardContainerGr = () => {
  return (
    <div className={styles.services_main_block_container}>
      {servicesGrData.map((card, index) => (
        <ServicesMainBlockCardGr
          key={index}
          servicesCardTitle={card.title}
          items={card.items}
          isDark={card.isDark}
        />
      ))}
    </div>
  );
};

const ServicesMainBlockCardContainerBz = () => {
  return (
    <div className={styles.services_main_block_container}>
      {servicesBzData.map((card, index) => (
        <ServicesMainBlockCardBz
          key={index}
          servicesCardTitle={card.title}
          items={card.items}
          isDark={card.isDark}
        />
      ))}
    </div>
  );
};

export default function ServicesMainBlock({ isFizPage }) {
  const router = useRouter();
  const [active, setActive] = useState(isFizPage ? "gr" : "bz");

  const handleSwitch = (type) => {
    router.push(type === "gr" ? "/fiz" : "/yur"); // Полноценный переход
  };

  return (
    <div className={styles.services_main_block}>
      <div className={styles.services_main_block_switch}>
        <h2
          onClick={() => handleSwitch("gr")}
          style={{ color: active === "gr" ? "#292C3B" : "#292C3B80" }}
        >
          Гражданам
          <ServicesMainGrLink active={active === "gr"} />
        </h2>
        <h2
          onClick={() => handleSwitch("bz")}
          style={{ color: active === "bz" ? "#292C3B" : "#292C3B80" }}
        >
          Бизнесу
          <ServicesMainBzLink active={active === "bz"} />
        </h2>

        <div
          className={`${styles.indicator_wrapper} ${active === "gr" ? styles.gr_active : styles.bz_active}`}
        >
          <div className={styles.indicator_left} />
          <div className={styles.indicator_right} />
        </div>
      </div>

      {active === "gr" ? (
        <ServicesMainBlockCardContainerGr />
      ) : (
        <ServicesMainBlockCardContainerBz />
      )}
    </div>
  );
}