"use client";
import { useEffect } from "react";
import { useModal } from "./ModalProvider";
import styles from "./changeSite.module.scss";

const ChangeSite = ({ allowClose = false }) => {
  const { closeChangeSiteModal } = useModal();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCitySelect = (city) => {
    localStorage.setItem("selectedCity", city);
    window.location.href = `/${city}`;
    closeChangeSiteModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {allowClose && (
          <button
            className={styles.closeButton}
            onClick={closeChangeSiteModal}
            aria-label="Закрыть уведомление"
          >
            &times;
          </button>
        )}

        <div className={styles.modalHeader}>
          <div className={styles.locationIcon}>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path
                fill="currentColor"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
              />
            </svg>
          </div>
          <h2>Выберите свой город</h2>
          <p>Чтобы увидеть актуальные предложения в вашем регионе</p>
        </div>

        <div className={styles.changebtns}>
          <button
            className={styles.button}
            onClick={() => handleCitySelect("novosibirsk")}
          >
            <span className={styles.buttonText}>Новосибирск</span>
          </button>
          <button
            className={styles.button}
            onClick={() => handleCitySelect("kemerovo")}
          >
            <span className={styles.buttonText}>Кемерово</span>
          </button>
        </div>

        <div className={styles.footer}>
          <button className={styles.laterButton} onClick={closeChangeSiteModal}>
            Выбрать позже
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSite;
