'use client';
import styles from "./header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
   const pathname = usePathname(); 
  const isDarkPage = pathname === "/services" || pathname === "/price-list" || pathname === "/practices" || pathname === "/contacts";
  return (
    <div className={`${styles.header} ${isDarkPage ? styles.dark : ""}`}>
      <div className={styles.header_logo}>
        <Link href="/">
          <img src="/svg/logo/kodekslogo.svg" />
        </Link>
      </div>
      <div className={styles.header_links}>
        <Link href="/services">
          <p className={isDarkPage ? styles.darkText : ""}>Услуги</p>
        </Link>
        <Link href="/price-list">
          <p className={isDarkPage ? styles.darkText : ""}>Прайс-лист</p>
        </Link>
        <Link href="/practices">
          <p className={isDarkPage ? styles.darkText : ""}>Практики</p>
        </Link>
        <Link href="/contacts">
          <p className={isDarkPage ? styles.darkText : ""}>Контакты</p>
        </Link>
      </div>
      <div className={styles.header_contacts}>
        <div className={styles.header_contacts_top}>
          <Link href={""}><h5>lodeks_yrist@mail.ru</h5></Link>
          <Link href={""}><h5>+7 (960) 930-91-91</h5></Link>
        </div>
        <div className={styles.header_contacts_bottom}>
          <Link href={""} className={`${styles.header_contacts_link} ${isDarkPage ? styles.dark_contacts_link : ""}`}>
            {isDarkPage ? (
            <img src="/svg/header/waDark.svg" />
          ) : (
            <img src="/svg/header/wa.svg" />
          )}
            <h5>Whatsapp</h5>
          </Link>
          <Link href={""} className={`${styles.header_contacts_link} ${isDarkPage ? styles.dark_contacts_link : ""}`}>
          {isDarkPage ? (
            <img src="/svg/header/tgDark.svg" />
          ) : (
            <img src="/svg/header/tg.svg" />
          )}
            <h5>Telegram</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
