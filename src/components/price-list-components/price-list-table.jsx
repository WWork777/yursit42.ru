"use client";
import styles from "./price-list.module.scss";
import { motion } from "framer-motion";

const PriceListBlock = ({ priceListTitle, isDark, items = [] }) => {
  return (
    <motion.div
      className={`${styles.price_list_table} ${isDark ? styles.dark : styles.white}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4>{priceListTitle}</h4>
      <div className={styles.price_list_table_content}>
        {items.map((item, index) => (
          <div key={index}>
            <div className={styles.price_list_table_content_item}>
              <p className={styles.price_list_table_content_item_text}>
                {item.text}
              </p>
              <p>{item.price}</p>
            </div>
            <div className={styles.price_list_table_content_item_line}></div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function PriceListTable() {
  return (
    <>
      <PriceListBlock
        priceListTitle="Составление документов"
        isDark={true}
        items={[
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор дарения", price: "от 5 000 руб." },
          { text: "Судебный приказ", price: "от 5 000 руб." },
          { text: "Отмена судебного приказа", price: "от 7 000 руб." },
          { text: "Исковое заявление", price: "от 7 000 руб." },
          { text: "Возражение на исковое заявление", price: "от 7 000 руб." },
          { text: "Апелляционная жалоба", price: "от 10 000 руб." },
          {
            text: "Возражение на апелляционную жалобу",
            price: "от 10 000 руб.",
          },
          { text: "Мировое соглашение", price: "от 10 000 руб." },
          { text: "Кассационная жалоба", price: "от 10 000 руб." },
        ]}
      />
      <PriceListBlock
        priceListTitle="Судебное заседание"
        isDark={false}
        items={[
          { text: "Мировой суд", price: "от 10 000 руб." },
          { text: "Суд общей юрисдикции", price: "от 12 000 руб." },
          { text: "Расмотрение дела по существу", price: "от 15 000 руб." },
          { text: "Аппеляционный суд", price: "от 15 000 руб." },
          { text: "Кассационный суд", price: "от 15 000 руб." },
        ]}
      />
    </>
  );
}
