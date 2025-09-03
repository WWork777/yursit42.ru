"use client";
import styles from "./etaps.module.scss";
import { motion } from "framer-motion";

const PurposeCard = ({
  purposeCardTitle,
  purposeCardText,
  animationProps,
  formattedIndex,
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 dangerouslySetInnerHTML={{ __html: etapsTitle }}></h1>
          <h4
            className={styles.purpose_left_text}
            dangerouslySetInnerHTML={{ __html: etapsText }}
          ></h4>
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
            purposeCardText="На данном этапе Вами передаются документы для детального анализа, Вы описываете суть проблемы и Ваше видение ситуации."
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
            purposeCardText="Подготовка всех необходимых справок, паспортов, выписок и пр. Юридический прогноз относительно перспективы дела."
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
            purposeCardText="Заключение соглашение на представление Ваших интересов."
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
            purposeCardText="Подготовка процессуальных документов. (Заявления, иски, ходатайства, жалобы)."
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
            purposeCardText="Проведение досудебных переговоров с целью решения вопроса не ввязываясь в судебный процесс."
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
            purposeCardText="Представление Ваших интересов в суде."
            formattedIndex="06"
          />
        </div>
      </div>
    </section>
  );
}
