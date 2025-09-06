"use client";
import styles from "./purpose-home.module.scss";
import { motion } from "framer-motion";

const PurposeCard = ({
  purposeCardSvg,
  purposeCardTitle,
  purposeCardText,
  animationProps,
}) => {
  return (
    <motion.div className={styles.purpose_card} {...animationProps}>
      <img src={purposeCardSvg} className={styles.purposeCardSvg} />
      <h4>{purposeCardTitle}</h4>
      <h5>{purposeCardText}</h5>
    </motion.div>
  );
};

export default function PurposeHome({ purposeTitle, purposeText }) {
  return (
    <section className="section-main">
      <div className={styles.purpose}>
        <motion.div 
        className={styles.purpose_left}
       initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 dangerouslySetInnerHTML={{ __html: purposeTitle }}></h1>
          <h5
            className={styles.purpose_left_text}
            dangerouslySetInnerHTML={{ __html: purposeText }}
          ></h5>
        </motion.div>
        <div className={styles.purpose_right}>
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: 0.4 },
            }}
            purposeCardSvg="/svg/home-purpose/cardSvg1.svg"
            purposeCardTitle="ПРОЗРАЧНОСТЬ"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.6 },
            }}
            purposeCardSvg="/svg/home-purpose/cardSvg2.svg"
            purposeCardTitle="КОМПЛЕКСНЫЙ ПОДХОД"
            purposeCardText="Берём дело под ключ — от первичной консультации до полного сопровождения в суде и исполнения решений."
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.8, delay: 0.8 },
            }}
            purposeCardSvg="/svg/home-purpose/cardSvg3.svg"
            purposeCardTitle="КОМФОРТ И ВНИМАНИЕ"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 1, delay: 1 },
            }}
            purposeCardSvg="/svg/home-purpose/cardSvg4.svg"
            purposeCardTitle="ОТВЕТСТВЕННОСТЬ"
            purposeCardText="Мы не обещаем невозможного и не перекладываем вину. Вникаем в детали и защищаем клиента как своего."
          />
        </div>
      </div>
    </section>
  );
}
