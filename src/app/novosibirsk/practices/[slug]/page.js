import practiceData from "@/dataNsk/practice.json";
import styles from "./style.module.scss";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsSib/common/map/map";
import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";

export async function generateMetadata({ params }) {
  const practice = practiceData.find((item) => item.slug === params.slug);

  return {
    title: practice.title,
    description: practice.description,
    keywords: practice.keywords,
    alternates: {
      canonical: `https://yurist42.ru/novosibirsk/practices/${params.slug}`,
    },
    openGraph: {
      title: practice.title,
      description: practice.description,
      url: `https://yurist42.ru/novosibirsk/practices/${params.slug}`,
      images: [
        {
          url: `/favicon/favicon-96x96.png`,
          alt: `yurist42.ru`,
        },
      ],
    },
  };
}

export default function PracticePage({ params }) {
  // Находим практику по slug из параметров
  const practice = practiceData.find((item) => item.slug === params.slug);

  // Если практика не найдена, можно вернуть заглушку
  if (!practice) {
    return <div>Практика не найдена</div>;
  }
  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: "Практики", path: "/practices" },
    { label: practice.practice },
  ];
  return (
    <>
      <section className="section-main secondary-page">
        <div className={styles.practice_container}>
          <BreadCrumble items={breadcrumbs} />
          <h1 className={styles.practice_title}>{practice.practice}</h1>
          <h3 className={styles.practice_subtitle}>{practice.practiceTitle}</h3>
          <p className={styles.practice_date}>Дата: {practice.practiceDate}</p>
          <div
            className={styles.practice_text}
            dangerouslySetInnerHTML={{ __html: practice.practiceText }}
          />
        </div>
      </section>
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
