import Head from "next/head";
import Link from "next/link";
import newsData from "@/dataNsk/news.json";
import styles from "./styles.module.scss";
import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";
import Quiz from "@/componentsSib/common/quiz/quiz";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";

export const metadata = {
  title:
    "Юридические новости Новосибирска | Изменения в законодательстве и судебная практика",
  description:
    "Актуальные юридические новости в Новосибирске и Новосибирской области. Изменения в законодательстве, свежая судебная практика, защита прав граждан и бизнеса. Консультации юриста с 27-летним опытом.",
  keywords:
    "юридические новости Новосибирск, новости юриста Новосибирск, изменения в законах 2025 Новосибирск, судебная практика Новосибирск, новости для бизнеса Новосибирская область, права граждан, юридическая консультация Новосибирск",
  alternates: {
    canonical: `https://yurist42.ru/novosibirsk/news`,
  },
  openGraph: {
    title: `Юридические новости Новосибирска | Изменения в законодательстве и судебная практика`,
    description: `Свежие юридические новости Новосибирска и Новосибирской области. Изменения в законах, судебная практика, защита прав граждан и бизнеса.`,
    url: `https://yurist42.ru/novosibirsk/news`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `Новости юриста в Новосибирске - yurist42.ru`,
      },
    ],
  },
};

export default function NewsList() {
  const breadcrumbs = [
    { label: "Главная", path: "/novosibirsk/" },
    { label: "Новости" },
  ];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Новости</h1>
        <h5 style={{ marginTop: "20px" }}>
          Актуальные юридические новости в Новосибирске — изменения <br></br> в
          законах и практике
        </h5>

        <div className={styles.newsList}>
          {newsData.map((news) => (
            <article
              key={news.id}
              className={styles.newsArticle}
              aria-label={news.title}
            >
              <img src={news.img} alt={news.title} loading="lazy" />
              <h2>
                <Link href={`/news/${news.slug}`}>{news.title}</Link>
              </h2>
              <time dateTime={news.date} aria-label="Дата публикации">
                {new Date(news.date).toLocaleDateString("ru-RU")}
              </time>
              <p>{news.excerpt}</p>
              <Link
                href={`/novosibirsk/news/${news.slug}`}
                className={styles.readMore}
              >
                Читать далее
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
    </>
  );
}
