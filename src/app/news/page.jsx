import Head from "next/head";
import Link from "next/link";
import newsData from "@/data/news.json";
import styles from "./styles.module.scss";
import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import Quiz from "@/components/common/quiz/quiz";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";

export const metadata = {
  title:
    "Юридические новости в Кемерово | Актуальные изменения в законодательстве",
  description:
    "Актуальные новости юриспруденции в Кемерово и Кемеровской области. Изменения в законах, судебная практика, права граждан и бизнеса. Консультации от юриста с 27-летним опытом.",
  keywords:
    "новости юриста Кемерово, юридические новости, изменения в законах 2025, новости для бизнеса, права граждан, судебная практика, юридическая консультация Кемерово",
  alternates: {
    canonical: `https://yurist42.ru/news`,
  },
  openGraph: {
    title: `Юридические новости в Кемерово | Актуальные изменения в законодательстве`,
    description: `Актуальные новости юриспруденции в Кемерово и Кемеровской области. Изменения в законах, судебная практика, права граждан и бизнеса. Консультации от юриста с 27-летним опытом.`,
    url: `https://yurist42.ru/news`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `yurist42.ru`,
      },
    ],
  },
};

export default function NewsList() {
  const breadcrumbs = [{ label: "Главная", path: "/" }, { label: "Новости" }];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Новости</h1>
        <h5 style={{ marginTop: "20px" }}>
          Актуальные юридические новости в Кемерово — изменения <br></br> в
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
              <Link href={`/news/${news.slug}`} className={styles.readMore}>
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
