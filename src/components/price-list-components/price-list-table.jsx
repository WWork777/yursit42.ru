'use client';
import styles from "./price-list.module.scss";
import { motion } from "framer-motion";

const PriceListBlock = ({ priceListTitle, isDark, items = [] }) => {
  return (
    <motion.div
      className={`${styles.price_list_table} ${isDark ? styles.dark : styles.white}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4>{priceListTitle}</h4>
      <div className={styles.price_list_table_content}>
        {items.map((item, index) => (
          <div key={index}>
            <div className={styles.price_list_table_content_item}>
              <p>{item.text}</p>
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
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
          { text: "Договор купли-продажи", price: "от 5 000 руб." },
        ]}
      />
      <PriceListBlock
        priceListTitle="Судебное заседание"
        isDark={false}
        items={[
          { text: "мировой суд", price: "от 10 000 руб." },
          { text: "мировой суд", price: "от 10 000 руб." },
          { text: "мировой суд", price: "от 10 000 руб." },
          { text: "мировой суд", price: "от 10 000 руб." },
          { text: "мировой суд", price: "от 10 000 руб." },
        ]}
      />
    </>
  );
}
