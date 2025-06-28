"use client";
import styles from "./home-help.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";



const SvgLeft = ({ liText,link }) => {
  return (
    <Link href={`services/grajdanam/${link}`} className={styles.li_text_link_left}>
      <img src="/svg/home-help/li.svg" alt="list icon" />
      <p style={{ margin: 0 }}>{liText}</p>
    </Link>
  );
};

const SvgRight = ({ liText, link }) => {
  return (
    <Link href={`services/biznes/${link}`} className={styles.li_text_link_right}>
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
          <SvgLeft liText="Юрист по банкротству" link="bankrotstvo"/>
          <SvgLeft liText="Семейное право" link="semeynoe-pravo"/>
          <SvgLeft liText="Наследство" link="nasledstvo"/>
          <SvgLeft liText="Жилищное право" link="zilishnoe-pravo"/>
          <SvgLeft liText="Земельное право" link="zemelnoe-pravo"/>
        </div>
        <div className={styles.li_right}>
          <SvgLeft liText="Арбитражные споры" link="arbitrazh-spory"/>
          <SvgLeft liText="Автоюрист" link="avtoyurist"/>
          <SvgLeft liText="Защита прав потребителей" link="zashchita-prav-potrebiteley"/>
          <SvgLeft liText="Финансы" link="finansy"/>
          <SvgLeft liText="Гражданское право" link="grajdanoe-pravo"/>
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
          <SvgRight liText="Споры с государственными органами" link="spory-s-gosudarstvennymi-organami"/>
          <SvgRight liText="Услуги для бизнеса" link="uslugi-dlya-biznessa"/>
          <SvgRight liText="Банкротство" link="bankrotstvobz"/>
          <SvgRight liText="Аутсорсинг" link="autsorsbz"/>
        </div>
      </div>
    </div>
  );
};

const HelpBlockLeft = ({ homeHelpTitle, homeHelpSvg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`${styles.home_help_block} ${styles.home_help_block_left}`}
    >
      <Link href={"/services?type=gr"}>
        <img
          src="/svg/home-help/link.svg"
          alt="link"
          className={styles.home_help_block_link}
        />  
      </Link>

      <div className={styles.home_help_block_top}>
        <img src={homeHelpSvg} alt="icon" />
        <Link href={"/services?type=gr"}><h3>{homeHelpTitle}</h3></Link>
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
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`${styles.home_help_block} ${styles.home_help_block_right}`}
    >
      <Link href={"/services?type=bz"}>
        <img
          src="/svg/home-help/link2.svg"
          alt="link"
          className={styles.home_help_block_link}
        />
      </Link>

      <div className={styles.home_help_block_top}>
        <img src={homeHelpSvg} alt="phone" />
        <Link href={"/services?type=bz"}><h3>{homeHelpTitle}</h3></Link>
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
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={styles.home_help_title}
        dangerouslySetInnerHTML={{ __html: helpTitle }}
        >
      </motion.h1>
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
