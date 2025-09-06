'use client';
import styles from './contacts-components.module.scss'
import { motion } from "framer-motion";

export default function ContactsTextBlock() {
    return (
        <div 
        className={styles.contacts_text_block}
        >
            <h5>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ИНТЕЛЛЕКТ КАПИТАЛЪ"</h5>
            <p><span>Юридический адрес организации:</span> 630005, Новосибирская область, г Новосибирск, Ипподромская ул, 19</p>
            <p><span>Фактический адрес организации:</span> 650000, РОССИЯ, КЕМЕРОВСКАЯ ОБЛ, Г КЕМЕРОВО, УЛ КРАСНАЯ, Д 13</p>
            <p><span>ИНН:</span> 5405079294</p>
            <p><span>КПП:</span> 540501001</p>
            <p><span>ОГРН:</span> 1225400050039</p>
            <p><span>Расч. счёт:</span> 40702810310001249585</p>
            <p><span>Банк:</span> АО "ТИНЬКОФФ БАНК"</p>
            <p><span>ИНН банка:</span> 7710140679</p>
            <p><span>БИК банка:</span> 044525974</p>
            <p><span>Корр. счет банка:</span> 30101810145250000974</p>
            <p><span>Юридический адрес банка:</span> Москва, 127287, ул. Хуторская 2-я, д. 38А, стр. 26</p>
        </div>
    )
}