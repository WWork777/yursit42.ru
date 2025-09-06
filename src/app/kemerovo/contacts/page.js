import BreadCrumble from "@/componentsKem/common/breadCrumble/breadCrumble";
import styles from "./contacts.module.scss";
import ContactPageYandexMap from "@/componentsKem/common/contact-page-map/map";
import ContactsTextBlock from "@/componentsKem/contacts-components/contacts-components";
import ConsultationForm from "@/componentsKem/common/consultation-form/comsultation-form";
import Quiz from "@/componentsKem/common/quiz/quiz";

export const metadata = {
  title:
    "Контакты юриста Кемерово | Юридическая компания Кодексъ — бесплатная консультация",
  description:
    "Контакты юридической компании «Кодексъ» в Кемерово: адрес, телефон бесплатного юриста, запись на консультацию и помощь по юридическим вопросам. Приём клиентов в офисе и онлайн для жителей Кемеровской области.",
  keywords:
    "контакты юриста Кемерово, телефон бесплатного юриста, консультация юриста Кемерово, запись к юристу, юридическая компания, юридическая помощь, адвокат Кемерово",
  alternates: {
    canonical: "https://yurist42.ru/kemerovo/contacts",
  },
  openGraph: {
    title:
      "Контакты юриста Кемерово | Юридическая компания Кодексъ — бесплатная консультация",
    description:
      "Юридическая компания «Кодексъ» в Кемерово. Адрес офиса, телефон бесплатного юриста, запись на консультацию и юридическая помощь жителям Кемеровской области.",
    url: "https://yurist42.ru/kemerovo/contacts",
    images: [
      {
        url: "/favicon/favicon-96x96.png",
        alt: "yurist42.ru",
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbs = [{ label: "Главная", path: "/" }, { label: "Контакты" }];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <div className={styles.contacts_title}>
          <h1>Контакты</h1>
          <p className={styles.contacts_title_text}>
            Нужна юридическая помощь? <br></br> Свяжитесь с нами удобным
            способом — мы ответим, <br></br> проконсультируем и запишем на
            приём.
          </p>
        </div>
      </section>
      <ContactPageYandexMap />
      <ContactsTextBlock />
      <Quiz />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
    </>
  );
}
