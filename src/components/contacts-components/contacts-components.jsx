"use client";
import styles from "./contacts-components.module.scss";
import { motion } from "framer-motion";

export default function ContactsTextBlock() {
  return (
    <div className={styles.contacts_text_block}>
      <h5>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ ЮК "Кодексъ" </h5>
      <p>
        <span>Юридический адрес организации:</span> 650905, Кемеровская область,
        г Кемерово, Масальская ул, д. 1а, кв. 5{" "}
      </p>
      <p>
        <span>Фактический адрес организации:</span> 650000, РОССИЯ, КЕМЕРОВСКАЯ
        ОБЛ, Г КЕМЕРОВО, УЛ КРАСНАЯ, Д 13
      </p>
      <p>
        <span>ИНН:</span> 4205431799
      </p>
      <p>
        <span>КПП:</span> 420501001
      </p>
      <p>
        <span>ОГРН:</span> 1254200012670
      </p>
      <p>
        <span>Расч. счёт:</span> 40702810720000259059
      </p>
      <p>
        <span>Банк:</span> ООО "Банк Точка"
      </p>
      <p>
        <span>БИК банка:</span> 044525104
      </p>
      <p>
        <span>Корр. счет банка:</span> 30101810745374525104
      </p>
    </div>
  );
}
