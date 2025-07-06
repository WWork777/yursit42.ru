"use client";
import styles from "./home-help.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";



const SvgLeft = ({ liText,link }) => {
  return (
    <Link href={`category/${link}`} className={styles.li_text_link_left}>
      <img src="/svg/home-help/li.svg" alt="list icon" />
      <p style={{ margin: 0 }}>{liText}</p>
    </Link>
  );
};

const SvgRight = ({ liText, link }) => {
  return (
    <Link href={`category/${link}`} className={styles.li_text_link_right}>
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
          <SvgLeft liText="Юрист по банкротству" link="yurist-po-bankrotstvu"/>
          <SvgLeft liText="Семейное право" link="semeynoe"/>
          <SvgLeft liText="Наследство" link="nasledstvo"/>
          <SvgLeft liText="Жилищное право" link="zhilishnoe-pravo"/>
          <SvgLeft liText="Земельное право" link="zemelnoe-pravo"/>
        </div>
        <div className={styles.li_right}>
          <SvgLeft liText="Арбитражные споры" link="arbitrazhnye-spori"/>
          <SvgLeft liText="Автоюрист" link="avtoyurist"/>
          <SvgLeft liText="Защита прав потребителей" link="zashchita"/>
          <SvgLeft liText="Финансы" link="finansy"/>
          <SvgLeft liText="Гражданское право" link="grazhdanskoe-pravo"/>
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
          <SvgRight liText="Споры с государственными органами" link="spory-s-gosudarstvennymi-organamis"/>
          <SvgRight liText="Услуги для бизнеса" link="uslugi-dlya-biznesa"/>
          <SvgRight liText="Банкротство" link="bankrotstvo"/>
          <SvgRight liText="Аутсорсинг" link="autsorsbz"/>
        </div>
      </div>
    </div>
  );
};

const HelpBlockLeft = ({ homeHelpTitle, homeHelpSvg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, }}
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
        <Link href={"/fiz"}><h3>{homeHelpTitle}</h3></Link>
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
       initial={{ opacity: 0, }}
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
        <Link href={"/yur"}><h3>{homeHelpTitle}</h3></Link>
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
