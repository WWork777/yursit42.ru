"use client";
import styles from "./modal.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Modal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpen]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите ваш телефон";
      valid = false;
    } else if (!/^[\d\+][\d\(\)\ -]{4,17}\d$/.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const sendToTelegram = async (data) => {
    const TELEGRAM_BOT_TOKEN = "7933033563:AAGeVEYEzAQ6NUuVYkxNsXgANSi0xvRN4sg";
    const TELEGRAM_CHAT_ID = "-1002630836547";

    const text = `Новая заявка с сайта (юристкемерово.рф):\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nСообщение: ${data.message || "не указано"}`;

    try {
      const response = await fetch("/api/telegram-proxi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "-1002630836547",
          text: text,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке сообщения");
      }

      return true;
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const isSent = await sendToTelegram(formData);

      if (isSent) {
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== "undefined" && window.ym) {
          window.ym(56680159, "reachGoal", "ModalForm");
        }

        alert(
          "Форма успешно отправлена! Мы свяжемся с вами в ближайшее время."
        );
        setFormData({ name: "", phone: "", message: "" });
      } else {
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#A47764"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#A47764"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h3 className={styles.modalTitle}>Оставить заявку</h3>
        <p className={styles.modalSubtitle}>
          Заполните форму и мы свяжемся с вами
        </p>

        <form className={styles.consultation_form} onSubmit={handleSubmit}>
          <div className={styles.consultation_form_top_inputs}>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                placeholder="Ваше имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.input_error : ""}
              />
              {errors.name && (
                <span className={styles.error_message}>{errors.name}</span>
              )}
            </div>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                placeholder="Ваш телефон *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? styles.input_error : ""}
              />
              {errors.phone && (
                <span className={styles.error_message}>{errors.phone}</span>
              )}
            </div>
          </div>
          <div className={styles.consultation_form_bottom_inputs}>
            <textarea
              placeholder="Сообщение"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !formData.phone.trim()}
            className={styles.submitButton}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              "Отправить заявку"
            )}
          </button>
        </form>
        <div className={styles.privacyNote}>
          Нажимая кнопку «Отправить заявку», вы соглашаетесь с{" "}
          <Link href={"/privacy"} className={styles.privacyLink}>
            политикой конфиденциальности
          </Link>
        </div>
      </div>
    </div>
  );
}
