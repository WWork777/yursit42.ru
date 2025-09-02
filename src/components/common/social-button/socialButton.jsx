"use client";
import styles from "./socialButton.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function SocialButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.social_wrapper}>
      <div className={styles.social_button} onClick={() => setIsOpen(!isOpen)}>
        <h5>Свяжитесь с нами</h5>
      </div>
      <div className={`${styles.social_icons} ${isOpen ? styles.open : ""}`}>
        <Link href="https://max.ru/u/f9LHodD0cOKU3qvldFKHsXB1Hs0cS8Ve_tQtUFZ5F6BOwi4vntNqXHG2MiA">
          <img src="/svg/max-logo.svg" className={styles.social_button_img} />
        </Link>
        <Link href="https://api.whatsapp.com/send/?phone=79609309191&text&type=phone_number&app_absent=0">
          <img src="/svg/wa.svg" className={styles.social_button_img} />
        </Link>
        <Link href="https://telegram.me/yurist42_kodeks">
          <img src="/svg/tg.svg" className={styles.social_button_img} />
        </Link>
        <Link href="tel:+79609309191">
          <img src="/svg/phone.png" className={styles.social_button_img} />
        </Link>
      </div>
    </div>
  );
}
