"use client";
import styles from "./hero-block.module.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Modal from "@/components/common/modal/modal";

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
  backgroundImageLink,
  heroTextMobile,
}) {
  const numberRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Анимация чисел
  useEffect(() => {
    const animateNumbers = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target.dataset.target;
              const isPercentage = target.includes("%");
              const isPlus = target.includes("+");

              let cleanNumber = target.replace(/[^0-9]/g, "");
              animateValue(
                entry.target,
                0,
                parseInt(cleanNumber),
                2000,
                isPercentage ? "%" : isPlus ? "+" : ""
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      numberRefs.current.forEach((ref) => ref && observer.observe(ref));

      return () => {
        numberRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      };
    };

    const animateValue = (element, start, end, duration, suffix = "") => {
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
  }, []);

  // Форма
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isAgreed, setIsAgreed] = useState(false); // Согласие с политикой
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

  const handlePhoneInput = (e) => {
    const { value, name } = e.target;
    const sanitizedValue = value.replace(/[^0-9+]/g, "");
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
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

    const text = `Новая заявка с сайта (Новосибирск):\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nСообщение: ${data.message || "не указано"}`;

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

    if (!isAgreed) {
      alert(
        "Пожалуйста, подтвердите согласие с политикой обработки персональных данных."
      );
      return;
    }

    if (!validate()) return;

    setIsLoading(true);

    try {
      const isSent = await sendToTelegram(formData);

      if (isSent) {
        if (typeof window !== "undefined" && window.ym) {
          window.ym(56680159, "reachGoal", "HeroForm");
        }

        alert(
          "Форма успешно отправлена! Мы свяжемся с вами в ближайшее время."
        );
        setFormData({ name: "", phone: "", message: "" });
        setIsAgreed(false); // сброс чекбокса после отправки (по желанию)
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
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImageLink})` }}
    >
      <div className={styles.hero_container}>
        <div className={styles.hero_content}>
          <div className={styles.hero_content_left}>
            <b
              className={styles.hero_title}
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            ></b>
            <p
              className={styles.hero_text}
              dangerouslySetInnerHTML={{ __html: heroText }}
            ></p>
            <p
              className={styles.hero_text_mobile}
              dangerouslySetInnerHTML={{ __html: heroTextMobile }}
            ></p>
          </div>

          <form className={styles.hero_content_right} onSubmit={handleSubmit}>
            <h4 className={styles.consultation_form_title}>Оставьте заявку</h4>

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
                  type="tel"
                  placeholder="Ваш телефон *"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneInput}
                  className={errors.phone ? styles.input_error : ""}
                />
                {errors.phone && (
                  <span className={styles.error_message}>{errors.phone}</span>
                )}
              </div>
            </div>

            <div className={styles.consultation_form_bottom_inputs}>
              <input
                type="text"
                placeholder="Сообщение"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {/* Чекбокс согласия */}
            <div className={styles.agreement_checkbox}>
              <label>
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                Я согласен с{" "}
                <Link href="/privacy" style={{ color: "#A47764" }}>
                  политикой обработки персональных данных
                </Link>
              </label>
            </div>

            {/* Кнопка: активна только при заполнении телефона и согласии */}
            <button
              type="submit"
              disabled={isLoading || !formData.phone.trim() || !isAgreed}
            >
              <p>{isLoading ? "Отправка..." : "Обращение к юристу"}</p>
            </button>
          </form>
        </div>

        <div className={styles.hero_bottom_block}>
          <div className={styles.hero_bottom_block_text}>
            <h2
              className={styles.hero_bottom_block_text_number}
              ref={(el) => (numberRefs.current[0] = el)}
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
              ref={(el) => (numberRefs.current[1] = el)}
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
              ref={(el) => (numberRefs.current[2] = el)}
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

      {isModalOpen && <Modal isOpen={isModalOpen} onClose={toggleModal} />}
    </div>
  );
}
