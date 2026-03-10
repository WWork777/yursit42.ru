"use client";
import { createContext, useContext, useEffect, useState } from "react";

const GeoContext = createContext();

export function GeoProvider({ children }) {
  const [cityKey, setCityKey] = useState("kemerovo");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // === ЗАПАСНОЙ ПЛАН: Определение по IP (ваш предыдущий код) ===
    const fetchLocationByIP = () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      fetch('https://api.2ip.io/?token=usq76yi91onwb45c&lang=ru', {
        signal: controller.signal
      })
        .then(res => {
          clearTimeout(timeoutId);
          return res.ok ? res.json() : Promise.reject(res);
        })
        .then(data => {
          console.log("🌐 [IP API] Город определен:", data.city);
          const currentCityKey = (
            data.city === "Стокгольм" || 
            data.city === "Stockholm" || 
            data.city === "Новосибирск" || 
            data.city === "Novosibirsk"
          ) ? "novosibirsk" : "kemerovo";
          
          setCityKey(currentCityKey);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.warn("⏱️ [IP API] Таймаут (3 сек). Включаем Кемерово.");
          } else {
            console.error("❌ [IP API] Ошибка:", err);
          }
          setCityKey("kemerovo");
        })
        .finally(() => setIsLoaded(true));
    };

    // === ОСНОВНОЙ ПЛАН: Запрос геолокации у браузера ===
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        // 1. Успех: пользователь разрешил доступ
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Переводим координаты в название города через OpenStreetMap (Nominatim)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
            );
            const data = await response.json();
            
            // В объекте address город может лежать в разных ключах
            const city = data.address.city || data.address.town || data.address.village || "";
            console.log("📍 [Браузер GPS] Город определен:", city);

            const currentCityKey = (
              city === "Стокгольм" || 
              city === "Stockholm" || 
              city === "Новосибирск" || 
              city === "Novosibirsk"
            ) ? "novosibirsk" : "kemerovo";

            setCityKey(currentCityKey);
            setIsLoaded(true); // Завершаем загрузку, всё прошло успешно
          } catch (err) {
            console.error("❌ Ошибка расшифровки координат. Переходим к запасному плану.", err);
            fetchLocationByIP();
          }
        },
        // 2. Ошибка: пользователь нажал "Блокировать" или пропала связь
        (error) => {
          console.warn("⛔ Доступ к гео запрещен или недоступен. Запускаем поиск по IP.", error.message);
          fetchLocationByIP();
        },
        // 3. Настройки браузерного запроса
        {
          // Важно! Если пользователь просто проигнорирует всплывающее окно (не нажмет ни Да, ни Нет), 
          // через 5 секунд мы перестаем ждать и запускаем поиск по IP.
          timeout: 5000, 
          maximumAge: 0
        }
      );
    } else {
      // Если старый браузер вообще не знает, что такое геолокация
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