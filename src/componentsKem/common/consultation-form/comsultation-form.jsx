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

  // Обновленная функция для обработки телефона
  const handlePhoneInput = (value, country, e, formattedValue) => {
    // Если номер пустой или начинается не с +7(9, принудительно устанавливаем +7(9
    if (!value || !value.startsWith("+79")) {
      // Очищаем все, кроме цифр, и проверяем начинается ли с 79
      const digitsOnly = value.replace(/\D/g, "");
      if (!digitsOnly.startsWith("79")) {
        value = "+7(9";
      }
    }

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

  // Функция для обработки ввода с клавиатуры
  const handlePhoneKeyDown = (e) => {
    const { value } = e.target;

    // Запрещаем удаление префикса +7(9
    if (value === "+7(9" && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      return;
    }

    // Если пытаются ввести что-то в начале, когда уже есть +7(9
    if (e.target.selectionStart <= 4 && value.startsWith("+7(9")) {
      // Разрешаем только цифры и управляющие клавиши
      if (!/[\d]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  // Функция для обработки изменения фокуса
  const handlePhoneFocus = (e) => {
    const { value } = e.target;

    // Если поле пустое или не начинается с +7(9, устанавливаем префикс
    if (!value || !value.startsWith("+7(9")) {
      setFormData((prev) => ({
        ...prev,
        phone: "+7(9",
      }));
    }

    // Устанавливаем курсор после префикса
    setTimeout(() => {
      if (e.target.value === "+7(9") {
        e.target.setSelectionRange(4, 4);
      }
    }, 0);
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите ваш телефон";
      valid = false;
    } else {
      // Нормализуем номер: убираем все нецифровые символы кроме +
      const normalizedPhone = formData.phone.replace(/\s/g, ""); // убираем пробелы

      if (!normalizedPhone.startsWith("+7(9")) {
        newErrors.phone = "Номер должен начинаться с +7(9";
        valid = false;
      } else if (!isPhoneComplete(formData.phone)) {
        newErrors.phone = "Введите полный номер телефона";
        valid = false;
      } else if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(normalizedPhone)) {
        newErrors.phone = "Введите корректный номер телефона";
        valid = false;
      }
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

    // MAX
    const Phone = "79609309191";
    const idInstance = "3100517801";
    const apiTokenInstance =
      "4e23b210658549c881680633b93bb11301a0f304a927433da6";

    try {
      // const response = await fetch("/api/telegram-proxi", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     chat_id: "-1002630836547",
      //     text: text,
      //     parse_mode: "Markdown",
      //   }),
      // });

      const maxResponse = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: `-71184639158921`,
            message: text,
          }),
        },
      );

      if (!maxResponse.ok) {
        throw new Error("Ошибка при отправке сообщения");
      }

      return true;
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
      return false;
    }
  };

  // Новая функция для отправки в Битрикс24
  const sendToBitrix24 = async (data) => {
    try {
      const response = await fetch("/api/send-to-bitrix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message,
          formType: "consultation_form", // указываем тип формы
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Ошибка Битрикс24:", result.error);
      } else {
        console.log("Лид в Битрикс24 создан, ID:", result.leadId);
      }
    } catch (error) {
      console.error("Ошибка отправки в Битрикс24:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
      alert(
        "Пожалуйста, подтвердите согласие с политикой обработки персональных данных.",
      );
      return;
    }

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Отправляем в Telegram
      const isSent = await sendToTelegram(formData);

      // Отправляем в Битрикс24 (параллельно, не ждем результат)
      sendToBitrix24(formData);

      if (isSent) {
        if (typeof window !== "undefined" && window.ym) {
          window.ym(56680159, "reachGoal", "Form");
        }

        alert(
          "Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.",
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

  // Обновленная проверка валидности формы - теперь проверяем наличие префикса +7(9
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
                  setFormData((prev) => ({
                    ...prev,
                    phone: val,
                  }))
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

          {/* Кнопка активна только если чекбокс отмечен и телефон введён полностью и начинается с +7(9 */}
          <button type="submit" disabled={!isFormValid}>
            <p>{isLoading ? "Отправка..." : "Отправить заявку"}</p>
          </button>
        </form>
      </div>
    </section>
  );
}
