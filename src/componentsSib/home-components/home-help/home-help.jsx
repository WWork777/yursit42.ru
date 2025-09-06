"use client";
import styles from "./home-help.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";

const SvgLeft = ({ liText, link }) => {
  return (
    <Link href={`/${link}`} className={styles.li_text_link_left}>
      <img src="/svg/home-help/li.svg" alt="list icon" />
      <p style={{ margin: 0 }}>{liText}</p>
    </Link>
  );
};

const SvgRight = ({ liText, link }) => {
  return (
    <Link
      href={`/novosibirsk/yur/${link}`}
      className={styles.li_text_link_right}
    >
      <img src="/svg/home-help/li2.svg" alt="list icon" />
      <p style={{ margin: 0 }}>{liText}</p>
    </Link>
  );
};

const LiSvgLeft = () => {
  return (
    <div className={styles.li}>
      <div className={styles.li_container}>
        <div className={styles.li_left}>
          <SvgLeft
            liText="Юрист по банкротству"
            link="novosibirsk/category/yurist-po-bankrotstvu"
          />
          <SvgLeft
            liText="Гражданское право"
            link="novosibirsk/category/grazhdanskoe-pravo"
          />
          <SvgLeft
            liText="Семейное право"
            link="novosibirsk/category/semeynoe"
          />
          <SvgLeft
            liText="Финансовое право"
            link="novosibirsk/category/finansy"
          />
          <SvgLeft liText="Автоюрист" link="novosibirsk/category/avtoyurist" />
          <SvgLeft
            liText="Земельное право"
            link="novosibirsk/category/zemelnoe-pravo"
          />
        </div>
        <div className={styles.li_right}>
          <SvgLeft liText="Наследство" link="novosibirsk/category/nasledstvo" />
          <SvgLeft
            liText="Жилищное право"
            link="novosibirsk/category/zhilishnoe-pravo"
          />
          <SvgLeft
            liText="Защита прав потребителей"
            link="novosibirsk/category/zashchita"
          />
          <SvgLeft
            liText="Интеллектуальные споры"
            link="/novosibirsk/fiz/intellektualnoe-pravo"
          />
        </div>
      </div>
    </div>
  );
};

const LiSvgRight = () => {
  return (
    <div className={styles.li}>
      <div className={styles.li_container}>
        <div className={styles.li_left}>
          <SvgRight liText="Споры с ФНС" link="spory-s-fns" />
          <SvgRight
            liText="Споры с гос. ораганами"
            link="spory-s-gosorganami"
          />
          <SvgRight liText="Подрядные споры" link="podryadnye-spory" />
          <SvgRight liText="Корпоративные споры" link="korporativnye-spory" />
          <SvgRight
            liText="Арбитражные споры"
            link="vedenye-sudebnyh-del-v-arbitrazhnom-sude-pervaya-instancia"
          />

          <Link
            href={`category/autsorsbz`}
            className={styles.li_text_link_right}
          >
            <img src="/svg/home-help/li2.svg" alt="list icon" />
            <p style={{ margin: 0 }}>Аутсорс</p>
          </Link>
        </div>
        <div className={styles.li_right}>
          <SvgRight
            liText="Ликвидация юр. лиц"
            link="likvidaciya-yuridicheskih-lic"
          />
          <SvgRight liText="Банкротство" link="bankrotstvo-yuridicheskih-lic" />
          <SvgRight
            liText="Защита при субсидиальной ответственности"
            link="pryvlechenye-k-subsidyarnoy-otvetstvennosty"
          />
          <SvgRight
            liText="Привлечение ЛПР к субсидиальной ответственности"
            link="privlechenie-lpr-k-subsidiarnoj-otvetstvennosti"
          />
          <SvgRight
            liText="Взыскание через банкротство"
            link="vzyskanie-cherez-bankrotstvo"
          />
          <SvgRight
            liText="Оспаривание сделок в банкротстве"
            link="vzyskanie-cherez-bankrotstvo"
          />
        </div>
      </div>
    </div>
  );
};

const HelpBlockLeft = ({ homeHelpTitle, homeHelpSvg }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${styles.home_help_block} ${styles.home_help_block_left}`}
    >
      <Link href={"/fiz"}>
        <img
          src="/svg/home-help/link.svg"
          alt="link"
          className={styles.home_help_block_link}
        />
      </Link>

      <div className={styles.home_help_block_top}>
        <img src={homeHelpSvg} alt="icon" />
        <Link href={"/fiz"}>
          <h3>{homeHelpTitle}</h3>
        </Link>
      </div>
      <div className={styles.home_help_block_bottom}>
        <LiSvgLeft />
      </div>
    </motion.div>
  );
};

const HelpBlockRight = ({ homeHelpTitle, homeHelpSvg }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${styles.home_help_block} ${styles.home_help_block_right}`}
    >
      <Link href={"/yur"}>
        <img
          src="/svg/home-help/link2.svg"
          alt="link"
          className={styles.home_help_block_link}
        />
      </Link>

      <div className={styles.home_help_block_top}>
        <img src={homeHelpSvg} alt="phone" />
        <Link href={"/yur"}>
          <h3>{homeHelpTitle}</h3>
        </Link>
      </div>
      <div className={styles.home_help_block_bottom}>
        <LiSvgRight />
      </div>
    </motion.div>
  );
};

export default function HomeHelp({
  helpTitle,
  helpTitleLeftBlock,
  helpTitleRightBlock,
}) {
  return (
    <section className="section-main">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.home_help_title}
        dangerouslySetInnerHTML={{ __html: helpTitle }}
      ></motion.h1>
      <div className={styles.home_help}>
        <HelpBlockLeft
          homeHelpTitle={helpTitleLeftBlock}
          homeHelpSvg="/svg/home-help/grajdanam.svg"
        />
        <HelpBlockRight
          homeHelpTitle={helpTitleRightBlock}
          homeHelpSvg="/svg/home-help/biznes.svg"
        />
      </div>
    </section>
  );
}
