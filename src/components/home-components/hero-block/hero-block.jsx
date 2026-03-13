"use client";
import styles from "./hero-block.module.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Modal from "@/components/common/modal/modal";
import PhoneInputCustom from "@/components/common/phoneInput/phoneInput";
// import { useGeo } from "@/components/layout-components/GeoProvider";

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
  // const { cityKey } = useGeo();
  const [cityKey, setCityKey] = useState("kemerovo"); // 'kemerovo', 'novosibirsk', 'other'
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
                isPercentage ? "%" : isPlus ? "+" : "",
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
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

  // Состояния формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Функция проверки полноты номера телефона
  const isPhoneComplete = (phone) => {
    if (!phone || phone.trim() === "") return false;
    const digitsOnly = phone.replace(/\D/g, "");
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

  const handlePhoneInput = (value, country, e, formattedValue) => {
    const digitsOnly = value.replace(/\D/g, "");

    if (!value || !value.startsWith("+7 (9")) {
      value = "+7 (9";
    } else if (digitsOnly.length === 6 && !value.includes(")")) {
      value = value + ") ";
    } else if (value.includes(")") && !value.includes(") ")) {
      value = value.replace(")", ") ");
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

  const handlePhoneKeyDown = (e) => {
    const { value } = e.target;

    if (value === "+7(9" && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      return;
    }

    if (e.target.selectionStart <= 4 && value.startsWith("+7(9")) {
      if (!/[\d]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handlePhoneFocus = (e) => {
    const { value } = e.target;

    if (!value || !value.startsWith("+7 (9")) {
      setFormData((prev) => ({
        ...prev,
        phone: "+7 (9",
      }));
    }

    setTimeout(() => {
      const input = e.target;
      if (input.value === "+7 (9") {
        input.setSelectionRange(6, 6);
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
      const normalizedPhone = formData.phone.replace(/\s/g, "");

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

  // Отправка в Telegram (оставляем без изменений)
  const sendToTelegram = async (data) => {
    const TELEGRAM_BOT_TOKEN = "7933033563:AAGeVEYEzAQ6NUuVYkxNsXgANSi0xvRN4sg";
    const TELEGRAM_CHAT_ID = "-1002630836547";
    const formattedPhone = data.phone.startsWith("+")
      ? data.phone
      : `+${data.phone}`;

    let cityLabel = "Не указан";
    if (cityKey === "kemerovo") {
      cityLabel = "Кемерово";
    } else if (cityKey === "novosibirsk") {
      cityLabel = "Новосибирск";
    } else if (cityKey === "other") {
      cityLabel = "Другой город";
    }

    const text = `Новая заявка с сайта (Главный экран - ${cityLabel}):\n\nИмя: ${data.name}\nТелефон: ${formattedPhone}\nСообщение: ${data.message || "не указано"}`;

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

  const getYandexClientId = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.ym) {
        window.ym(56680159, "getClientID", (id) => resolve(id));
      } else {
        resolve(""); // Если Метрика не загружена
      }
    });
  };

  // Отправка в Битрикс24
  // Добавьте 'cid' в аргументы функции
  const sendToBitrix24 = async (data, cid) => {
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
          formType: "hero_form",
          city: cityKey,
          yandex_cid: cid, // Используем аргумент 'cid'
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Ошибка при отправке в Битрикс24");
      }

      return { success: true, leadId: result.leadId };
    } catch (error) {
      console.error("Ошибка отправки в Битрикс24:", error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Проверка согласия с политикой
    if (!isAgreed) {
      setSubmitStatus({
        type: "error",
        message:
          "Пожалуйста, подтвердите согласие с политикой обработки персональных данных.",
      });
      return;
    }

    // 2. Валидация полей (телефон и имя)
    if (!validate()) return;

    // 3. АНТИСПАМ ФИЛЬТР
    // Если в сообщении есть ссылки (http, .ru, .com и т.д.) — блокируем, так как это боты
    const linkRegExp = /http|https|www|\.ru|\.com|\.net|\.org/gi;
    if (linkRegExp.test(formData.message)) {
      setSubmitStatus({
        type: "error",
        message:
          "Использование ссылок в сообщении запрещено. Пожалуйста, удалите их.",
      });
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // Шаг 1: Получаем ClientID от Яндекс.Метрики
      const cid = await getYandexClientId();

      // Шаг 2: Запускаем отправку в Telegram и Битрикс одновременно
      // Мы используем cid, полученный выше, и передаем его в sendToBitrix24
      const [tgSuccess, bitrixResult] = await Promise.all([
        sendToTelegram(formData),
        sendToBitrix24(formData, cid),
      ]);

      // Шаг 3: Проверяем, что хотя бы один сервис принял заявку
      if (tgSuccess || bitrixResult.success) {
        // Фиксируем цель в Яндекс.Метрике (браузерное событие)
        if (typeof window !== "undefined" && window.ym) {
          window.ym(56680159, "reachGoal", "form");
        }

        // Выводим сообщение об успехе
        setSubmitStatus({
          type: "success",
          message:
            "Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.",
        });

        // Очищаем форму и состояние согласия
        setFormData({ name: "", phone: "", message: "" });
        setIsAgreed(false);

        console.log(
          "Заявка успешно обработана. Bitrix ID:",
          bitrixResult.leadId,
        );
      } else {
        throw new Error("Ошибка при отправке данных в сервисы");
      }
    } catch (error) {
      console.error("Ошибка при выполнении handleSubmit:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз позже.",
      });
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

            {/* === Блок выбора города === */}
            <div className={styles.city_selector_wrapper}>
              <p className={styles.city_selector_title}>Выберите регион:</p>
              <select
                className={styles.city_select}
                value={cityKey}
                onChange={(e) => setCityKey(e.target.value)}
              >
                <option value="kemerovo">Кузбасс-Кемеровская обл.</option>
                <option value="novosibirsk">Новосибирская обл.</option>
                <option value="other">Другой регион</option>
              </select>
            </div>
            {/* ================================ */}

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
                  style={{ margin: 0 }}
                />
                Я согласен с {""}
                <Link href="/privacy" style={{ color: "#A47764" }}>
                  политикой обработки персональных данных
                </Link>
              </label>
            </div>

            {/* Статус отправки */}
            {submitStatus.message && (
              <div
                className={
                  submitStatus.type === "success"
                    ? styles.success_message
                    : styles.error_message
                }
              >
                {submitStatus.message}
              </div>
            )}

            {/* Кнопка отправки */}
            <button type="submit" disabled={!isFormValid}>
              {isLoading ? (
                <div className={styles.button_content}>
                  <span className={styles.loading_spinner}></span>
                  <p>Отправка...</p>
                </div>
              ) : (
                <p>Обращение к юристу</p>
              )}
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
