import styles from "./footerSib.module.scss";
import Link from "next/link";

const SvgLeft = ({ liText, link }) => {
  return (
    <Link href={link} className={styles.li_text_link_left}>
      <img src="/svg/home-help/li.svg" alt="list icon" />
      <p style={{ margin: 0 }}>{liText}</p>
    </Link>
  );
};
export default function FooterSib() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_logo}>
        <img
          src="/svg/logo/kodekslogo.svg"
          alt="logo"
          className={styles.footer_logo_img}
        />
        <h5>1997-2025 КОДЕКСЪ. Все права защищены.</h5>
        <p>Политика конфиденциальности</p>
      </div>
      <div className={styles.footer_links}>
        <SvgLeft liText="Услуги" link="/novosibirsk/fiz" />
        <SvgLeft liText="Прайс-лист" link="/novosibirsk/price" />
        <SvgLeft liText="Практики" link="/novosibirsk/practices" />
        <SvgLeft liText="Новости" link="/novosibirsk/news" />
        <SvgLeft liText="Контакты" link="/novosibirsk/contacts" />
      </div>
      <div className={styles.footer_contacts}>
        <h5>Главный офис</h5>
        <p>г. НОВОСИБИРСК, ул. Красная, д. 13</p>
        <h5>Телефон</h5>
        <Link href="tel:+79609309191">
          <p>+7 (960) 930-91-91</p>
        </Link>
        <h5>Почта</h5>
        <Link href="mailto:kodeks_yrist@mail.ru">
          <p>kodeks_yrist@mail.ru</p>
        </Link>
        <div className={styles.footer_social}>
          <Link href="https://api.whatsapp.com/send/?phone=79609309191&text&type=phone_number&app_absent=0">
            <img src="/svg/contacts/wa.svg" className={styles.footer_svg} />
          </Link>
          <Link href="https://telegram.me/yurist42_kodeks">
            <img src="/svg/contacts/tg.svg" className={styles.footer_svg} />
          </Link>
          <Link href="https://vk.com/kodeks42">
            <img src="/svg/contacts/vk.svg" className={styles.footer_svg} />
          </Link>
          <Link href="https://max.ru/u/f9LHodD0cOKU3qvldFKHsXB1Hs0cS8Ve_tQtUFZ5F6BOwi4vntNqXHG2MiA">
            <img src="/svg/contacts/max.svg" className={styles.footer_svg} />
          </Link>
        </div>
        <div className={styles.footer_bottom}>
          <h5>1997-2025 КОДЕКСЪ. Все права защищены.</h5>
          <p>Политика конфиденциальности</p>
        </div>
      </div>
    </div>
  );
}
