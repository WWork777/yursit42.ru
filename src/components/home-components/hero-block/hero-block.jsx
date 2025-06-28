'use client'
import styles from "./hero-block.module.scss";
import { useEffect, useRef } from "react";
import Link from "next/link";
export default function HeroBlock({
  heroTitle,
  heroText,
  buttonText,
  firstBlockText,
  secondBlockText,
  thirdBlockText,
  firstBlockTextNumber,
  secondBlockTextNumber,
  thirdBlockTextNumber,
  backgroundImageLink
}) {
  const numberRefs = useRef([]);

   useEffect(() => {
    const animateNumbers = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target.dataset.target;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            
            let cleanNumber = target.replace(/[^0-9]/g, '');
            animateValue(
              entry.target, 
              0, 
              parseInt(cleanNumber), 
              2000,
              isPercentage ? '%' : isPlus ? '+' : ''
            );
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      numberRefs.current.forEach(ref => ref && observer.observe(ref));
    };

    const animateValue = (element, start, end, duration, suffix = '') => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateNumbers();
    return () => {
      numberRefs.current = [];
    };
  }, []);

  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${backgroundImageLink})` }}>
      <div className={styles.hero_container}>
        <b
          className={styles.hero_title}
          dangerouslySetInnerHTML={{ __html: heroTitle }}
        ></b>
        <p
          className={styles.hero_text}
          dangerouslySetInnerHTML={{ __html: heroText }}
        ></p>
        <button className={styles.hero_button}>
          <Link href="#form"><h4>{buttonText}</h4></Link>
        </button>
        <div className={styles.hero_bottom_block}>
          <div className={styles.hero_bottom_block_text}>
            <h2 
              className={styles.hero_bottom_block_text_number}
              ref={el => numberRefs.current[0] = el}
              data-target={firstBlockTextNumber}
            >
              0
            </h2>
            <p className={styles.hero_bottom_block_text_text}>
              {firstBlockText}
            </p>
          </div>
          <div className={styles.hero_bottom_block_text}>
            <h2 
              className={styles.hero_bottom_block_text_number}
              ref={el => numberRefs.current[1] = el}
              data-target={secondBlockTextNumber}
            >
              0
            </h2>
            <p className={styles.hero_bottom_block_text_text}>
              {secondBlockText}
            </p>
          </div>
          <div className={styles.hero_bottom_block_text}>
            <h2 
              className={styles.hero_bottom_block_text_number}
              ref={el => numberRefs.current[2] = el}
              data-target={thirdBlockTextNumber}
            >
              0
            </h2>
            <p className={styles.hero_bottom_block_text_text}>
              {thirdBlockText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
