"use client";
import styles from "./consultation-form.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function ConsultationForm({
  consultationTitle,
  consultationText,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isAgreed, setIsAgreed] = useState(false); // Состояние для чекбокса
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

    // Разрешаем только цифры и знак "+"
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

    const text = `Новая заявка с сайта (Кемерово):\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nСообщение: ${data.message || "не указано"}`;

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
          window.ym(56680159, "reachGoal", "FormKemerovo");
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
    <section className="section-second" id="form">
      <div className={styles.consultation_form_container}>
        <h2 dangerouslySetInnerHTML={{ __html: consultationTitle }}></h2>
        <h4 dangerouslySetInnerHTML={{ __html: consultationText }}></h4>
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

          {/* Кнопка активна только если чекбокс отмечен и телефон введён */}
          <button
            type="submit"
            disabled={isLoading || !formData.phone.trim() || !isAgreed}
          >
            <p>{isLoading ? "Отправка..." : "Отправить заявку"}</p>
          </button>
        </form>
      </div>
    </section>
  );
}
