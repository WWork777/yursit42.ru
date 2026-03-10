"use client";
import { createContext, useContext, useEffect, useState } from "react";

const GeoContext = createContext();

const CITIES = {
  KEMEROVO: "kemerovo",
  NOVOSIBIRSK: "novosibirsk",
};

const NOVOSIBIRSK_ALIASES = new Set([
  "Стокгольм",
  "Stockholm",
  "Новосибирск",
  "Novosibirsk",
]);

// Рекомендуется хранить токен в переменных окружения (например, .env.local)
// и получать его через process.env.NEXT_PUBLIC_2IP_TOKEN
const API_TOKEN = "usq76yi91onwb45c";

const getCityKeyByCityName = (cityName) => {
  return NOVOSIBIRSK_ALIASES.has(cityName)
    ? CITIES.NOVOSIBIRSK
    : CITIES.KEMEROVO;
};

export function GeoProvider({ children }) {
  const [cityKey, setCityKey] = useState(CITIES.KEMEROVO);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchLocationByIP = () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      fetch(`https://api.2ip.io/?token=${API_TOKEN}&lang=ru`, {
        signal: controller.signal,
      })
        .then((res) => {
          clearTimeout(timeoutId);
          if (!res.ok) {
            return Promise.reject(new Error(`HTTP error! status: ${res.status}`));
          }
          return res.json();
        })
        .then((data) => {
          console.log("🌐 [IP API] Город определен:", data.city);
          setCityKey(getCityKeyByCityName(data.city));
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.warn("⏱️ [IP API] Таймаут (3 сек). Включаем Кемерово.");
          } else {
            console.error("❌ [IP API] Ошибка:", err);
          }
          setCityKey(CITIES.KEMEROVO);
        })
        .finally(() => setIsLoaded(true));
    };

    const handleGeolocationSuccess = async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
        );
        if (!response.ok) {
          throw new Error(
            `Nominatim request failed with status ${response.status}`
          );
        }
        const data = await response.json();
        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "";
        console.log("📍 [Браузер GPS] Город определен:", city);

        setCityKey(getCityKeyByCityName(city));
        setIsLoaded(true);
      } catch (err) {
        console.error(
          "❌ Ошибка расшифровки координат. Переходим к запасному плану.",
          err
        );
        fetchLocationByIP();
      }
    };

    const handleGeolocationError = (error) => {
      console.warn(
        "⛔ Доступ к гео запрещен или недоступен. Запускаем поиск по IP.",
        error.message
      );
      fetchLocationByIP();
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError,
        {
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.warn(
        "🌐 Геолокация не поддерживается браузером. Запускаем поиск по IP."
      );
      fetchLocationByIP();
    }
  }, []);

  return (
    <GeoContext.Provider value={{ cityKey, isLoaded }}>
      {children}
    </GeoContext.Provider>
  );
}

export function useGeo() {
  return useContext(GeoContext);
}