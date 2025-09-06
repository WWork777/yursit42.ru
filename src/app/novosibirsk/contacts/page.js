import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";
import styles from "./contacts.module.scss";
import ContactPageYandexMap from "@/componentsSib/common/contact-page-map/map";
import ContactsTextBlock from "@/componentsSib/contacts-components/contacts-components";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";
import Quiz from "@/componentsSib/common/quiz/quiz";

export const metadata = {
  title: "Контакты юриста в Новосибирске | Консультация и запись",
  description:
    "Контакты юридической компании Кодексъ в Новосибирске: адрес офиса, телефоны, график работы и форма обратной связи. Запишитесь на бесплатную консультацию юриста.",
  keywords:
    "контакты юриста Новосибирск, запись к юристу Новосибирск, консультация юриста Новосибирск, телефон юриста, адрес юридической компании",
  alternates: {
    canonical: `https://yurist42.ru/novosibirsk/contacts`,
  },
  openGraph: {
    title: `Контакты юриста в Новосибирске | Консультация и запись`,
    description: `Адрес и телефоны юридической компании Кодексъ в Новосибирске. Работаем ежедневно, включая выходные. Запишитесь на бесплатную консультацию юриста.`,
    url: `https://yurist42.ru/novosibirsk/contacts`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `yurist42.ru`,
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Главная", path: "/novosibirsk/" },
    { label: "Контакты" },
  ];
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
