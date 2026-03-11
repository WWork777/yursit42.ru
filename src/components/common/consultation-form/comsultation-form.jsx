"use client";
import styles from "./consultation-form.module.scss";
import Link from "next/link";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PhoneInputCustom from "../phoneInput/phoneInput";

export default function ConsultationForm({
  consultationTitle,
  consultationText,
}) {
  const [cityKey, setCityKey] = useState("kemerovo");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

  const isPhoneComplete = (phone) => {
    if (!phone || phone.trim() === "") return false;
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 11;
  };

  const getYandexClientId = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.ym) {
        window.ym(56680159, "getClientID", (id) => resolve(id));
      } else {
        resolve("");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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
    }
    setErrors(newErrors);
    return valid;
  };

  // --- ОТПРАВКА ДАННЫХ ---

  const sendToTelegram = async (data) => {
    let cityLabel =
      cityKey === "kemerovo"
        ? "Кемерово"
        : cityKey === "novosibirsk"
          ? "Новосибирск"
          : "Другой город";
    const text = `Новая заявка (Форма консультации - ${cityLabel}):\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nСообщение: ${data.message || "не указано"}`;

    try {
      const maxResponse = await fetch(
        `https://api.green-api.com/waInstance3100517801/SendMessage/4e23b210658549c881680633b93bb11301a0f304a927433da6`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId: "-71184639158921", message: text }),
        },
      );
      return maxResponse.ok;
    } catch (error) {
      return false;
    }
  };

  const sendToBitrix24 = async (data, cid) => {
    try {
      const response = await fetch("/api/send-to-bitrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message,
          formType: "consultation_form",
          city: cityKey,
          yandex_cid: cid, // Передаем ClientID
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка Битрикс24:", error);
    }
  };

  // --- ГЛАВНЫЙ ОБРАБОТЧИК ---

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
      alert("Пожалуйста, подтвердите согласие с политикой данных.");
      return;
    }

    if (!validate()) return;

    // --- АНТИСПАМ ФИЛЬТР ---
    const linkRegExp = /http|https|www|\.ru|\.com|\.net|\.org/gi;
    if (linkRegExp.test(formData.message)) {
      alert("Ссылки в сообщении запрещены.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Получаем ClientID
      const cid = await getYandexClientId();

      // 2. Отправляем параллельно
      const [tgSent] = await Promise.all([
        sendToTelegram(formData),
        sendToBitrix24(formData, cid),
      ]);

      if (tgSent) {
        if (typeof window !== "undefined" && window.ym) {
          window.ym(56680159, "reachGoal", "form");
        }
        alert("Форма успешно отправлена!");
        setFormData({ name: "", phone: "", message: "" });
        setIsAgreed(false);
      } else {
        alert("Ошибка при отправке. Попробуйте позже.");
      }
    } catch (error) {
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.phone.startsWith("+7 (9") &&
    isPhoneComplete(formData.phone) &&
    isAgreed &&
    !isLoading;

  return (
    <section className="section-second" id="form">
      <div className={styles.consultation_form_container}>
        <h2 dangerouslySetInnerHTML={{ __html: consultationTitle }}></h2>
        <h4 dangerouslySetInnerHTML={{ __html: consultationText }}></h4>

        <div className={styles.city_selector}>
          {["kemerovo", "novosibirsk", "other"].map((city) => (
            <label key={city} className={styles.city_option}>
              <input
                type="radio"
                name="city"
                value={city}
                checked={cityKey === city}
                onChange={(e) => setCityKey(e.target.value)}
              />
              <span>
                {city === "kemerovo"
                  ? "Кемерово"
                  : city === "novosibirsk"
                    ? "Новосибирск"
                    : "Другое"}
              </span>
            </label>
          ))}
        </div>

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
              <PhoneInputCustom
                value={formData.phone}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, phone: val }))
                }
                error={errors.phone}
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

          <div className={styles.agreement_checkbox}>
            <label>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              Я согласен с{" "}
              <Link href="/privacy" style={{ color: "#A47764" }}>
                политикой данных
              </Link>
            </label>
          </div>

          <button type="submit" disabled={!isFormValid}>
            <p>{isLoading ? "Отправка..." : "Отправить заявку"}</p>
          </button>
        </form>
      </div>
    </section>
  );
}
