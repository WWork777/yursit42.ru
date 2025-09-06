"use client";
import styles from "./header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useModal } from "@/components/common/changeSite/ModalProvider";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openChangeSiteModal } = useModal();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkPage =
    pathname === "/services" ||
    pathname === "/price" ||
    pathname === "/news" ||
    pathname === "/practices" ||
    pathname === "/contacts" ||
    pathname === "/policy" ||
    pathname === "/fiz" ||
    pathname === "/yur" ||
    pathname === "/privacy" ||
    pathname.startsWith("/news/") ||
    pathname.startsWith("/practices/");

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`
  ${styles.header}
  ${isDarkPage ? styles.dark : ""}
  ${isScrolled ? styles.scrolled : ""}
  ${isDarkPage && isScrolled ? styles.scrolledDark : ""}
`}
    >
      <div className={styles.header_logo}>
        <Link href="/" onClick={closeMenu}>
          <img src="/svg/logo/kodekslogo.svg" alt="Логотип" />
        </Link>
      </div>

      {/* Бургер-кнопка */}
      <div
        className={`${styles.burger} ${isDarkPage ? styles.darkBurger : ""}`}
        onClick={toggleMenu}
      >
        <div className={`${styles.line} ${isMenuOpen ? styles.active : ""}`} />
        <div className={`${styles.line} ${isMenuOpen ? styles.active : ""}`} />
        <div className={`${styles.line} ${isMenuOpen ? styles.active : ""}`} />
      </div>

      {/* Мобильное меню */}
      <div className={`${styles.mobile_menu} ${isMenuOpen ? styles.open : ""}`}>
        <div className={`${styles.header_logo_mobile}`}>
          <Link href="/" onClick={closeMenu}>
            <img src="/svg/logo/kodekslogo.svg" alt="Логотип" />
          </Link>
        </div>
        <div className={`${styles.mobile_menu_links}`}>
          <Link href="/fiz" onClick={closeMenu}>
            <p
              className={isDarkPage && isScrolled ? styles.darkTextMobile : ""}
            >
              Услуги
            </p>
          </Link>
          <Link href="/price" onClick={closeMenu}>
            <p
              className={isDarkPage && isScrolled ? styles.darkTextMobile : ""}
            >
              Прайс-лист
            </p>
          </Link>
          <Link href="/practices" onClick={closeMenu}>
            <p
              className={isDarkPage && isScrolled ? styles.darkTextMobile : ""}
            >
              Практика
            </p>
          </Link>
          <Link href="/news" onClick={closeMenu}>
            <p
              className={isDarkPage && isScrolled ? styles.darkTextMobile : ""}
            >
              Новости
            </p>
          </Link>
          <Link href="/contacts" onClick={closeMenu}>
            <p
              className={isDarkPage && isScrolled ? styles.darkTextMobile : ""}
            >
              Контакты
            </p>
          </Link>
        </div>

        <div className={styles.mobile_contacts_mobile}>
          <Link href="mailto:kodeks_yrist@mail.ru">
            <p>kodeks_yrist@mail.ru</p>
          </Link>
          <Link href="tel:+79609309191">
            <p>+7 (960) 930-91-91</p>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path
                fill="currentColor"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
              />
            </svg>
            <p onClick={openChangeSiteModal}>Кемерово</p>
          </div>
        </div>

        <div className={styles.header_contacts_bottom_mobile}>
          {/* Первый ряд */}
          <div className={styles.messenger_row}>
            <Link
              href="https://api.whatsapp.com/send/?phone=79609309191"
              className={styles.header_contacts_link_mobile}
            >
              <img src={"/svg/mobileheader/wa.svg"} alt="WhatsApp" />
              <h5>Whatsapp</h5>
            </Link>

            <Link
              href="https://telegram.me/yurist42_kodeks"
              className={styles.header_contacts_link_mobile}
            >
              <img src={"/svg/mobileheader/tg.svg"} alt="Telegram" />
              <h5>Telegram</h5>
            </Link>
          </div>

          {/* Второй ряд */}
          <div className={styles.messenger_row_center}>
            <Link
              href="https://max.ru/u/f9LHodD0cOKU3qvldFKHsXB1Hs0cS8Ve_tQtUFZ5F6BOwi4vntNqXHG2MiA"
              className={styles.header_contacts_link_mobile}
            >
              <img src={"/svg/mobileheader/max.svg"} alt="VK" />
              <h5>Max</h5>
            </Link>
          </div>
        </div>
      </div>

      {/* Десктоп навигация */}
      <div className={styles.header_links}>
        <Link href="/fiz">
          <p className={isDarkPage ? styles.darkText : ""}>Услуги</p>
        </Link>
        <Link href="/price">
          <p className={isDarkPage ? styles.darkText : ""}>Прайс-лист</p>
        </Link>
        <Link href="/practices">
          <p className={isDarkPage ? styles.darkText : ""}>Практика</p>
        </Link>
        <Link href="/news">
          <p className={isDarkPage ? styles.darkText : ""}>Новости</p>
        </Link>
        <Link href="/contacts">
          <p className={isDarkPage ? styles.darkText : ""}>Контакты</p>
        </Link>
      </div>

      <div className={styles.header_contacts}>
        <div className={styles.header_contacts_top}>
          <Link href="mailto:kodeks_yrist@mail.ru">
            <h5>kodeks_yrist@mail.ru</h5>
          </Link>
          <Link href="tel:+79609309191">
            <h5>+7 (960) 930-91-91</h5>
          </Link>
          <h5 style={{ cursor: "pointer" }} onClick={openChangeSiteModal}>
            Кемерово
          </h5>
        </div>
        <div className={styles.header_contacts_bottom}>
          <Link
            href="https://api.whatsapp.com/send/?phone=79609309191"
            className={`${styles.header_contacts_link} ${
              isDarkPage ? styles.dark_contacts_link : ""
            }`}
          >
            <img
              src={
                isDarkPage & !isScrolled
                  ? "/svg/header/waDark.svg"
                  : "/svg/header/wa.svg"
              }
              alt="WhatsApp"
            />
            <h5>Whatsapp</h5>
          </Link>
          <Link
            href="https://telegram.me/yurist42_kodeks"
            className={`${styles.header_contacts_link} ${
              isDarkPage ? styles.dark_contacts_link : ""
            }`}
          >
            <img
              src={
                isDarkPage & !isScrolled
                  ? "/svg/header/tgDark.svg"
                  : "/svg/header/tg.svg"
              }
              alt="Telegram"
            />
            <h5>Telegram</h5>
          </Link>
          <Link
            href="https://max.ru/u/f9LHodD0cOKU3qvldFKHsXB1Hs0cS8Ve_tQtUFZ5F6BOwi4vntNqXHG2MiA"
            className={`${styles.header_contacts_link} ${
              isDarkPage ? styles.dark_contacts_link : ""
            }`}
          >
            <img
              src={
                isDarkPage & !isScrolled
                  ? "/svg/header/maxDark.svg"
                  : "/svg/header/max.svg"
              }
              alt="Telegram"
            />
            <h5>Max</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
