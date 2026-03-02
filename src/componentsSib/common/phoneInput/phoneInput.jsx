import { useState } from "react";
import styles from "./styles.module.scss";

export default function PhoneInputCustom({ value, onChange, error }) {
  const [isFocused, setIsFocused] = useState(false);

  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, "");
    const clean = digits.startsWith("7") ? digits.slice(1) : digits;
    const limited = clean.slice(0, 10);

    let result = "+7";

    if (limited.length > 0) result += " (" + limited.slice(0, 3);
    if (limited.length >= 3) result += ")";
    if (limited.length >= 4) result += " " + limited.slice(3, 6);
    if (limited.length >= 7) result += "-" + limited.slice(6, 8);
    if (limited.length >= 9) result += "-" + limited.slice(8, 10);

    return result;
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (!value || !value.startsWith("+7 (9")) {
      onChange("+7 (9");
      setTimeout(() => e.target.setSelectionRange(6, 6), 0);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value.length < 8) onChange("");
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, "");

    if (digits.length === 0) {
      onChange("");
      return;
    }

    if (!digits.startsWith("79")) return;

    onChange(formatPhone(input));
  };

  const handleKeyDown = (e) => {
    const cursorPos = e.target.selectionStart;
    const prefix = "+7 (9";

    // если пытаются удалить часть префикса — блокируем
    if (
      (e.key === "Backspace" && cursorPos <= prefix.length) ||
      (e.key === "Delete" &&
        cursorPos < prefix.length &&
        value.startsWith(prefix))
    ) {
      e.preventDefault();
      return;
    }

    // Дополнительно: если выделен префикс целиком — не даём стереть его
    const selection = window.getSelection?.().toString?.() ?? "";
    if (selection && selection.includes(prefix)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.phoneInputWrapper}>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Введите номер телефона"
        className={`${styles.phoneInput} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
