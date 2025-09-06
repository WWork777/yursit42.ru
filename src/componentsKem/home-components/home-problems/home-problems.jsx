"use client";
import styles from "./home-problems.module.scss";
import { motion } from "framer-motion";

const ProblemsCircle = ({ circleText, description, animationProps }) => {
  return (
    <motion.div className={styles.problems_item} {...animationProps}>
      <div className={styles.home_problems_circle}>
        <h3>{circleText}</h3>
      </div>
      <h5 className={styles.problems_description}>{description}</h5>
    </motion.div>
  );
};

export default function HomeProblems({ problemsTitle }) {
  return (
    <section className="section-second">
      <h1 dangerouslySetInnerHTML={{ __html: problemsTitle }}></h1>
      <div className={styles.home_problems}>
        <ProblemsCircle
          animationProps={{
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: 0.4 },
          }}
          circleText="01"
          description="Предлагаем рабочие решения, а не гипотетические варианты"
        />
        <ProblemsCircle
          animationProps={{
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.6 },
          }}
          circleText="02"
          description="Оказываем высокое качество услуг, и в рамках бюджета"
        />
        <ProblemsCircle
          animationProps={{
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.8, delay: 0.8 },
          }}
          circleText="03"
          description="Находим подход к каждому клиенту"
        />
        <ProblemsCircle
          animationProps={{
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 1, delay: 1 },
          }}
          circleText="04"
          description="Работаем с полной отдачей и профессиональным интересом"
        />
      </div>
    </section>
  );
}
