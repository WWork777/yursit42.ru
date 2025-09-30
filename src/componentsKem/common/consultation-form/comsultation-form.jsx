"use client";
import styles from "./consultation-form.module.scss";
import Link from "next/link";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

  // Функция проверки полноты номера телефона
  const isPhoneComplete = (phone) => {
    if (!phone || phone.trim() === "") return false;

    // Для российских номеров: код страны +7 и 10 цифр номера = минимум 11 символов
    // Убираем все нецифровые символы для проверки
    const digitsOnly = phone.replace(/\D/g, "");

    // Российский номер: +7 (XXX) XXX-XX-XX = 11 цифр
    // Международные номера могут быть длиннее, но для России достаточно 11 цифр
    return digitsOnly.length >= 11;
  };

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

  const handlePhoneInput = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите ваш телефон";
      valid = false;
    } else if (!isPhoneComplete(formData.phone)) {
      newErrors.phone = "Введите полный номер телефона";
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

    const formattedPhone = data.phone.startsWith("+")
      ? data.phone
      : `+${data.phone}`;

    const text = `Новая заявка с сайта (Кемерово):\n\nИмя: ${data.name}\nТелефон: ${formattedPhone}\nСообщение: ${data.message || "не указано"}`;

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
          window.ym(56680159, "reachGoal", "Form");
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

  // Проверяем, валидна ли форма для отправки
  const isFormValid = isPhoneComplete(formData.phone) && isAgreed && !isLoading;

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
              <PhoneInput
                country={"ru"}
                value={formData.phone}
                onChange={handlePhoneInput}
                disableDropdown={true}
                onlyCountries={["ru"]}
                inputClass={styles.consultation_phone_input}
                placeholder="Введите номер телефона"
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

          {/* Кнопка активна только если чекбокс отмечен и телефон введён полностью */}
          <button type="submit" disabled={!isFormValid}>
            <p>{isLoading ? "Отправка..." : "Отправить заявку"}</p>
          </button>
        </form>
      </div>
    </section>
  );
}
