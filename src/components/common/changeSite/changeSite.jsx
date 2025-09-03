'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './changeSite.module.scss';

const ChangeSite = ({ allowClose = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
		{allowClose && (
          <button 
            className={styles.closeButton}
            onClick={() => setIsVisible(false)}
            aria-label="Закрыть уведомление"
          >
            &times;
          </button>
        )}
        <h2>Выберите свой город</h2>
        <div className={styles.changebtns}>
            <Link href='/novosibirsk'><button className={styles.buttons} > Сиб</button></Link>
            <Link href='/kemerovo'><button className={styles.buttons}>Кем</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ChangeSite;