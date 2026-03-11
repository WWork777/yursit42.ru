"use client";
import styles from "./quiz.module.scss";
import { useState } from "react";
import Link from "next/link";
import "react-phone-input-2/lib/style.css";
import PhoneInputCustom from "../phoneInput/phoneInput";
// import { useGeo } from "@/components/layout-components/GeoProvider";

export default function Quiz() {
  // const { cityKey } = useGeo();
  const [cityKey, setCityKey] = useState("kemerovo");
  const [step, setStep] = useState(0);
  const [allSteps, setAllSteps] = useState(4);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userType, setUserType] = useState(null);
  const [comment, setComment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [answers, setAnswers] = useState({
    userType: null,
    topic: null,
    comment: "",
    name: "",
    phone: "",
  });

  const TELEGRAM_BOT_TOKEN =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
    "7933033563:AAGeVEYEzAQ6NUuVYkxNsXgANSi0xvRN4sg";
  const TELEGRAM_CHAT_ID =
    process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "-1002630836547";

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

  const sendToTelegram = async () => {
    setIsSending(true);
    try {
      let cityLabel = "Не указан";
      if (cityKey === "kemerovo") {
        cityLabel = "Кемерово";
      } else if (cityKey === "novosibirsk") {
        cityLabel = "Новосибирск";
      } else if (cityKey === "other") {
        cityLabel = "Другой город";
      }

      const message = `
        Новая заявка с квиза (${cityLabel}):\n
        Тип клиента: ${answers.userType === "individual" ? "Физическое лицо" : "Юридическое лицо"}\n
        Тема вопроса: ${answers.topic || "Не указано"}\n
        Комментарий: ${answers.comment || "Не указано"}\n
        Имя: ${answers.name}\n
        Телефон: ${answers.phone}\n
      `;

      const idInstance = "3100517801";
      const apiTokenInstance =
        "4e23b210658549c881680633b93bb11301a0f304a927433da6";

      const maxResponse = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: `-71184639158921`,
            message: message,
          }),
        },
      );

      if (!maxResponse.ok) {
        throw new Error("Ошибка при отправке в Telegram");
      }

      return true;
    } catch (error) {
      console.error("Ошибка отправки:", error);
      return false;
    } finally {
      setIsSending(false);
    }
  };

  // Новая функция для отправки в Битрикс24
  const sendToBitrix24 = async (cid) => {
    try {
      const fullMessage = `Комментарий клиента: ${answers.comment || "Не указано"}`;

      const response = await fetch("/api/send-to-bitrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          phone: answers.phone,
          message: fullMessage,
          formType: "quiz_form",
          userType: answers.userType,
          topic: answers.topic,
          city: cityKey,
          yandex_cid: cid, // Передаем ID Метрики
        }),
      });

      const result = await response.json();
      return response.ok;
    } catch (error) {
      console.error("Ошибка отправки в Битрикс24:", error);
      return false;
    }
  };

  const handleStartClick = () => {
    setStep(1);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setSelectedOption(type);
    setAnswers((prev) => ({ ...prev, userType: type }));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnswers((prev) => ({ ...prev, topic: option }));
  };

  const handleNextClick = () => {
    if (selectedOption || step === 3) {
      setStep(step + 1);
      if (step !== 2) {
        setSelectedOption(null);
      }
    }
  };

  const handlePrevClick = () => {
    if (step > 0) {
      setStep(step - 1);
      if (step === 1) {
        setUserType(null);
        setAnswers((prev) => ({ ...prev, userType: null }));
      }
    }
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setAnswers((prev) => ({ ...prev, comment: value }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setAnswers((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
      setSubmitStatus({
        type: "error",
        message: "Подтвердите согласие с политикой.",
      });
      return;
    }

    if (!isPhoneComplete(formData.phone)) {
      setSubmitStatus({
        type: "error",
        message: "Введите полный номер телефона",
      });
      return;
    }

    // Антиспам (как в предыдущих формах)
    const linkRegExp = /http|https|www|\.ru|\.com|\.net|\.org/gi;
    if (linkRegExp.test(answers.comment)) {
      setSubmitStatus({
        type: "error",
        message: "Ссылки в комментарии запрещены.",
      });
      return;
    }

    setIsSending(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // 1. Получаем ClientID
      const cid = await getYandexClientId();

      // 2. Отправляем параллельно
      const [tgSent, bitrixSent] = await Promise.all([
        sendToTelegram(),
        sendToBitrix24(cid),
      ]);

      if (tgSent || bitrixSent) {
        if (typeof window !== "undefined" && window.ym) {
          window.ym(56680159, "reachGoal", "form");
        }

        setSubmitStatus({
          type: "success",
          message:
            "Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.",
        });

        // Сброс состояния
        setTimeout(() => {
          setStep(0);
          setFormData({ name: "", phone: "" });
          setComment("");
          setSelectedOption(null);
          setUserType(null);
          setIsAgreed(false);
          setAnswers({
            userType: null,
            topic: null,
            comment: "",
            name: "",
            phone: "",
          });
        }, 2000);
      } else {
        throw new Error("Ошибка сервисов");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Ошибка отправки. Попробуйте еще раз.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const steps = {
    start: {
      title: "Подберите себе лучшего юриста за минуту",
      description:
        "Разберем вашу ситуацию, подготовим документы и поможем их подать.",
      buttonText: "Подобрать",
      action: handleStartClick,
    },
    userType: {
      title: "Кому нужна консультация",
      options: [
        { text: "Физическому лицу", value: "individual" },
        { text: "Юридическому лицу", value: "business" },
      ],
      buttonText: "Далее",
      action: handleNextClick,
    },
    individual: [
      {
        title: "К какой области относится вопрос",
        options: [
          "Банкротство",
          "Гражданское право",
          "Автоюрист",
          "Потребительское право",
          "Свой вариант",
        ],
        buttonText: "Далее",
        action: handleNextClick,
      },
      {
        title: "Комментарий (необязательно)",
        isComment: true,
        buttonText: "Далее",
        action: handleNextClick,
      },
    ],
    business: [
      {
        title: "К какой области относится вопрос",
        options: [
          "Банкротство",
          "Субсидиарная ответственность",
          "Споры с ФНС",
          "Ликвидация юр.лица",
          "Аутсорсинг",
          "Свой вариант",
        ],
        buttonText: "Далее",
        action: handleNextClick,
      },
      {
        title: "Комментарий (необязательно)",
        isComment: true,
        buttonText: "Далее",
        action: handleNextClick,
      },
    ],
    final: {
      title: "Первая личная консультация бесплатно!",
      description: "Получите бесплатную консультацию в офисе по вашему вопросу",
      buttonText: "Отправить",
      action: handleSubmit,
      isForm: true,
    },
  };

  const getCurrentStep = () => {
    if (step === 0) return steps.start;
    if (step === 1) return steps.userType;

    const lastStep =
      userType === "individual"
        ? 2 + steps.individual.length
        : 2 + steps.business.length;

    if (step === lastStep) return steps.final;

    if (userType === "individual") {
      return steps.individual[step - 2];
    } else if (userType === "business") {
      return steps.business[step - 2];
    }

    return null;
  };

  const getTotalSteps = () => {
    if (!userType) return 2;
    return (
      2 +
      (userType === "individual"
        ? steps.individual.length
        : steps.business.length) +
      1
    );
  };

  const isFormValid =
    isPhoneComplete(formData.phone) && formData.name.trim() && isAgreed;

  const renderStep = () => {
    const currentStep = getCurrentStep();
    if (!currentStep) return null;

    switch (step) {
      case 0:
        return (
          <>
            <img src="/common/quiz.jpeg" alt="quiz" />
            <div className={styles.quiz_text}>
              <h3>{currentStep.title}</h3>
              <h5>{currentStep.description}</h5>
              <button onClick={currentStep.action}>
                <p>{currentStep.buttonText}</p>
              </button>
            </div>
          </>
        );
      default:
        if (currentStep.isForm) {
          return (
            <div className={styles.quiz_form_final}>
              <div className={styles.quiz_final_form}>
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

                <form onSubmit={currentStep.action}>
                  {/* === Блок выбора города === */}
                  <div className={styles.city_selector}>
                    <label className={styles.city_option}>
                      <input
                        type="radio"
                        name="city"
                        value="kemerovo"
                        checked={cityKey === "kemerovo"}
                        onChange={(e) => setCityKey(e.target.value)}
                      />
                      <span>Кемерово</span>
                    </label>
                    <label className={styles.city_option}>
                      <input
                        type="radio"
                        name="city"
                        value="novosibirsk"
                        checked={cityKey === "novosibirsk"}
                        onChange={(e) => setCityKey(e.target.value)}
                      />
                      <span>Новосибирск</span>
                    </label>
                    <label className={styles.city_option}>
                      <input
                        type="radio"
                        name="city"
                        value="other"
                        checked={cityKey === "other"}
                        onChange={(e) => setCityKey(e.target.value)}
                      />
                      <span>Другое</span>
                    </label>
                  </div>
                  <div className={styles.form_group}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className={styles.form_group}>
                    <PhoneInputCustom
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </div>

                  <div className={styles.agreement_checkbox}>
                    <label>
                      <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        style={{ margin: 0 }}
                      />
                      Я согласен с{" "}
                      <Link href="/privacy" style={{ color: "#A47764" }}>
                        политикой обработки персональных данных
                      </Link>
                    </label>
                  </div>

                  <div className={styles.quiz_form_buttons}>
                    <button
                      type="submit"
                      className={styles.button_next}
                      disabled={isSending || !isFormValid}
                    >
                      {isSending ? "Отправка..." : currentStep.buttonText}
                    </button>
                    <button
                      onClick={handlePrevClick}
                      className={styles.button_prev}
                      type="button"
                    >
                      Назад
                    </button>
                  </div>
                </form>
              </div>
              <div className={styles.quiz_final_content}>
                <h3>{currentStep.title}</h3>
                <h5>{currentStep.description}</h5>
                {answers.topic && (
                  <div className={styles.selected_topic}>
                    <p>
                      Выбранная тема: <strong>{answers.topic}</strong>
                    </p>
                  </div>
                )}
                <div className={styles.footer_social}>
                  <Link href="https://api.whatsapp.com/send/?phone=79609309191&text&type=phone_number&app_absent=0">
                    <img
                      src="/svg/contacts/wa.svg"
                      className={styles.footer_svg}
                      alt="WhatsApp"
                    />
                  </Link>
                  <Link href="https://telegram.me/yurist42_kodeks">
                    <img
                      src="/svg/contacts/tg.svg"
                      className={styles.footer_svg}
                      alt="Telegram"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className={styles.quiz_form}>
            <h3>{currentStep.title}</h3>

            {currentStep.isComment ? (
              <>
                {answers.topic && (
                  <div className={styles.selected_topic}>
                    <p>
                      Выбранная тема: <strong>{answers.topic}</strong>
                    </p>
                  </div>
                )}
                <div className={styles.comment_container}>
                  <textarea
                    placeholder="Опишите вашу ситуацию..."
                    value={comment}
                    onChange={handleCommentChange}
                    className={styles.comment_input}
                  />
                </div>
              </>
            ) : (
              <div className={styles.quiz_form_inputs}>
                {currentStep.options.map((option, index) => {
                  const optionText =
                    typeof option === "string" ? option : option.text;
                  const optionValue =
                    typeof option === "string" ? option : option.value;

                  return (
                    <p
                      key={index}
                      className={
                        selectedOption === optionValue ? styles.active : ""
                      }
                      onClick={() =>
                        step === 1
                          ? handleUserTypeSelect(optionValue)
                          : handleOptionSelect(optionValue)
                      }
                    >
                      {optionText}
                    </p>
                  );
                })}
              </div>
            )}

            <div className={styles.quiz_form_bottom}>
              <p>
                Шаг {step} из {allSteps}
              </p>
              <div
                className={styles.progress_bar}
                style={{ "--progress": `${(step / allSteps) * 100}%` }}
              ></div>

              <div className={styles.quiz_form_buttons}>
                {step > 0 && (
                  <button
                    onClick={handlePrevClick}
                    className={styles.button_prev}
                    type="button"
                  >
                    <p>Назад</p>
                  </button>
                )}
                <button
                  onClick={currentStep.action}
                  disabled={!currentStep.isComment && !selectedOption}
                  type={currentStep.isForm ? "submit" : "button"}
                >
                  <p>{currentStep.buttonText}</p>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="section-main" id="quiz">
      <div className={styles.quiz}>{renderStep()}</div>
    </section>
  );
}
