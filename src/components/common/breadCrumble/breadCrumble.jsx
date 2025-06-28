import styles from './breadCrumble.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BreadCrumble({ items }) {
  return (
    <div className={styles.breadCrumble}>
      {items.map((item, index) => (
        <span key={index} className={styles.breadCrumbItem}>
          {item.path ? (
            <Link href={item.path} className={styles.link}>
                <h5>{item.label}</h5>
            </Link>
          ) : (
            <h5 className={styles.currentPage}>{item.label}</h5>
          )}
          {index < items.length - 1 && <span className={styles.separator}>/</span>}
        </span>
      ))}
    </div>
  );
}