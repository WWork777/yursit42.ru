import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import styles from './contacts.module.scss'
import ContactPageYandexMap from "@/components/common/contact-page-map/map";
import ContactsTextBlock from "@/components/contacts-components/contacts-components";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";


export const metadata = {
  title: "Контакты юриста в Кемерово | Запись на консультацию",
  description: "Адрес, телефоны и форма обратной связи. Работаем ежедневно, включая выходные.",
  keywords:"контакты юриста, запись к юристу, юридическая консультация",
  alternates: {
    canonical: `https://yurist42.ru/contacts`
  },
  openGraph: {
      title: `Контакты юриста в Кемерово | Запись на консультацию`,
      description: `Адрес, телефоны и форма обратной связи. Работаем ежедневно, включая выходные.`,
      url: `https://yurist42.ru/contacts`,
      images: [
          {
              url: `/favicon/favicon-96x96.png`,
              alt: `yurist42.ru`,
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
        <p className={styles.contacts_title_text}>Нужна юридическая помощь? <br></br> Свяжитесь с нами удобным способом — мы ответим, <br></br> проконсультируем и запишем на приём.</p>
      </div>
    </section>
    <ContactPageYandexMap />
    <ContactsTextBlock />
    <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
    </>
   
  );
}
