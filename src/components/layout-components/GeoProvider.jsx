"use client";
import { createContext, useContext, useEffect, useState } from "react";

const GeoContext = createContext();

export function GeoProvider({ children }) {
  const [cityKey, setCityKey] = useState("kemerovo");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Создаем контроллер для прерывания запроса
    const controller = new AbortController();
    
    // 2. Запускаем таймер на 3 секунды (3000 миллисекунд)
    const timeoutId = setTimeout(() => {
      controller.abort(); // Если через 3 сек ответ не пришел — убиваем запрос!
    }, 3000);

    // Передаем сигнал контроллера в fetch
    fetch('https://api.2ip.io/?token=usq76yi91onwb45c&lang=ru', {
      signal: controller.signal
    })
      .then(res => {
        // Если ответ пришел вовремя, отменяем наш 3-секундный таймер
        clearTimeout(timeoutId);
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then(data => {
        // console.log("📦 Полный ответ от API 2ip:", data); 
        // console.log("🌐 IP:", data.ip);
        // console.log("🏙️ Город определен:", data.city);
        
        const currentCityKey = (
          data.city === "Стокгольм" || 
          data.city === "Stockholm" || 
          data.city === "Новосибирск" || 
          data.city === "Novosibirsk"
        ) ? "novosibirsk" : "kemerovo";
        
        setCityKey(currentCityKey);
      })
      .catch(err => {
        // Сюда код попадет, если А) API выдало ошибку или Б) сработал наш timeout
        if (err.name === 'AbortError') {
          console.warn("⏱️ Превышено время ожидания (3 сек). Включаем Кемерово.");
        } else {
          console.error("❌ Ошибка гео-сервиса:", err);
        }
        // По умолчанию у нас и так стоит Кемерово, но на всякий случай дублируем
        setCityKey("kemerovo");
      })
      .finally(() => {
        // В любом случае (успех, ошибка или таймаут) говорим сайту, что загрузка окончена
        setIsLoaded(true);
      });

    // Очистка при размонтировании компонента
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
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