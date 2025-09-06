"use client";
import { createContext, useContext, useState, useEffect } from "react";
import ChangeSite from "./changeSite";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isChangeSiteModalOpen, setIsChangeSiteModalOpen] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли уже сохраненный город
    const savedCity = localStorage.getItem("selectedCity");

    // Открываем модальное окно только если город еще не выбран
    if (!savedCity) {
      setIsChangeSiteModalOpen(true);
    }
  }, []);

  const openChangeSiteModal = () => setIsChangeSiteModalOpen(true);
  const closeChangeSiteModal = () => setIsChangeSiteModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isChangeSiteModalOpen,
        openChangeSiteModal,
        closeChangeSiteModal,
      }}
    >
      {children}
      {isChangeSiteModalOpen && <ChangeSite allowClose={true} />}
    </ModalContext.Provider>
  );
};
