import styles from "./header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_logo}>
        <Link href="">
          <img src="/svg/logo/kodekslogo.svg" />
        </Link>
      </div>
      <div className={styles.header_links}>
        <Link href="">
          <p>Услуги</p>
        </Link>
        <Link href="">
          <p>Прайс-лист</p>
        </Link>
        <Link href="">
          <p>Практики</p>
        </Link>
        <Link href="">
          <p>Контакты</p>
        </Link>
      </div>
      <div className={styles.header_contacts}>
        <div className={styles.header_contacts_top}>
          <Link href={""}><h5>lodeks_yrist@mail.ru</h5></Link>
          <Link href={""}><h5>+7 (960) 930-91-91</h5></Link>
        </div>
        <div className={styles.header_contacts_bottom}>
          <Link href={""} className={styles.header_contacts_link}>
            <img src="/svg/header/wa.svg" />
            <h5>Whatsapp</h5>
          </Link>
          <Link href={""} className={styles.header_contacts_link}>
            <img src="/svg/header/tg.svg" />
            <h5>Telegram</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
