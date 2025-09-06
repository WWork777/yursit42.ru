"use client";
import styles from "./home-practice.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePractice({ practiceTitle }) {
  return (
    <section className="section-main">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.home_practice_title}
        dangerouslySetInnerHTML={{ __html: practiceTitle }}
      ></motion.h1>
      <div className={styles.home_practice}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.home_practice_image}
        >
          <Image
            src="/home/practice/practiceimage (2).webp"
            alt="Практика"
            width={1000}
            height={1000}
            className={styles.home_practice_image_image}
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.home_practice_text}
        >
          <h3>Судьба клиента — наша репутация</h3>
          <p>
            В суде представляет интересы один юрист, а с делом работает целая
            команда специалистов
          </p>
          <p>
            Работаем с делами любой сложности: от консультации до полного
            сопровождения в суде. Наша принципиальная позиция — личная
            ответственность за результат. Каждое дело мы прорабатываем глубоко,
            объясняя клиенту возможные сценарии и честно рекомендуя лучшее
            решение.
          </p>
          <p>
            С 1997 года мы профессионально и добросовестно отстаиваем права
            доверителей — и делаем это так, чтобы к нам возвращались.
          </p>
          <button className={styles.home_practice_text_button}>
            <Link href="#form">
              <p>Запись на консультацию</p>
            </Link>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
