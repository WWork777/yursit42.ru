'use client';
import styles from "./home-practice.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePractice({ practiceTitle }) {
  return (
    <section className="section-main">
      <motion.h1 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={styles.home_practice_title}
      dangerouslySetInnerHTML={{ __html: practiceTitle }}
      ></motion.h1>
      <div className={styles.home_practice}>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1 , x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
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
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1 , x: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.home_practice_text}
          viewport={{ once: true, margin: "-100px" }}
          >
          <h3>Судьба клиента — наша репутация</h3>
          <p>
            Мы защищаем интересы клиентов - физических и юридических лиц - в
            судах всех инстанций.
          </p>
          <p>
            Работаем с делами любой сложности: от консультации до полного
            сопровождения в арбитраже. Наша принципиальная позиция — личная
            ответственность за результат. Каждое дело мы прорабатываем глубоко,
            объясняя клиенту возможные сценарии и честно рекомендуя лучшее
            решение.
          </p>
          <p>
            С 1997 года мы профессионально и добросовестно отстаиваем права
            доверителей — и делаем это так, чтобы к нам возвращались.
          </p>
          <button className={styles.home_practice_text_button}>
            <p>Запись на консультацию</p>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
