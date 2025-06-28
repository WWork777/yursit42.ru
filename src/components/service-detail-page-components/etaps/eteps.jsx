"use client";
import styles from "./etaps.module.scss";
import { motion } from "framer-motion";

const PurposeCard = ({
  purposeCardTitle,
  purposeCardText,
  animationProps,
  formattedIndex
}) => {
  return (
    <motion.div className={styles.purpose_card} {...animationProps}>
      <h4>{purposeCardTitle}</h4>
      <h5>{purposeCardText}</h5>
      <span className={styles.card_index}>{formattedIndex}</span>
    </motion.div>
  );
};

export default function Etaps({ etapsTitle, etapsText }) {
  return (
    <section className="section-main">
      <div className={styles.purpose}>
        <motion.div 
        className={styles.purpose_left}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        >
          <h1 dangerouslySetInnerHTML={{ __html: etapsTitle }}></h1>
          <h5
            className={styles.purpose_left_text}
            dangerouslySetInnerHTML={{ __html: etapsText }}
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
            purposeCardTitle="Консультация и анализ ситуации"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
            formattedIndex="01"
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.6 },
            }}
            purposeCardTitle="Подготовка стратегии"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
            formattedIndex="02"
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.8, delay: 0.8 },
            }}
            purposeCardTitle="Сбор документов"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
            formattedIndex="03"
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 1, delay: 1 },
            }}
            purposeCardTitle="Представляем ваши интересы в суде"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
            formattedIndex="04"
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 1, delay: 1 },
            }}
            purposeCardTitle="Добиваемся результата в вашу пользу"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
            formattedIndex="05"
          />
          <PurposeCard
            animationProps={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 1, delay: 1 },
            }}
            purposeCardTitle="Контролируем исполнение решения"
            purposeCardText="Мы объясняем суть дела без юридической шелухи. Клиенты всегда понимают, что происходит и за что платят."
            formattedIndex="06"
          />
        </div>
      </div>
    </section>
  );
}
