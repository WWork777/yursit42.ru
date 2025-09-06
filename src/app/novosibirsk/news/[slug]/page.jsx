import styles from "./styles.module.scss";
import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";
import Link from "next/link";
import { notFound } from "next/navigation";
import newsData from "@/dataNsk/news.json";
import Quiz from "@/componentsSib/common/quiz/quiz";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";

function getNewsBySlug(slug) {
  return newsData.find((item) => item.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const news = getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Новость не найдена | nsk.yurist42.ru",
      description: "Страница новости не найдена.",
    };
  }

  return {
    title: `${news.seotitle} | Юридические новости в Новосибирске`,
    description: news.excerpt,
    keywords: news.keywords,
    alternates: {
      canonical: `https://yurist42.ru/novosibirsk/news/${slug}`,
    },
    openGraph: {
      title: news.title,
      description: news.excerpt,
      url: `https://yurist42.ru/novosibirsk/news/${slug}`,
      type: "article",
      publishedTime: news.date,
      images: [
        {
          url: `https://yurist42.ru${news.img}`,
          alt: news.title,
        },
      ],
    },
  };
}

// Генерация статических путей
export async function generateStaticParams() {
  return newsData.map((newsItem) => ({
    slug: newsItem.slug,
  }));
}

// Основной компонент
export default function NewsPost({ params }) {
  const { slug } = params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: "Новости", path: "/news" },
    {
      label:
        news.title.length > 30 ? `${news.title.slice(0, 30)}...` : news.title,
      path: "",
    },
  ];

  return (
    <>
      <section className="section-main secondary-page">
        <div className={styles.newsPost}>
          <div className={styles.featuredImage}>
            <img
              src={news.img}
              alt={news.title}
              loading="lazy"
              width="800"
              height="450"
            />
          </div>
          <header>
            <h1>{news.title}</h1>
            <time dateTime={news.date} className={styles.publishDate}>
              {new Date(news.date).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <div className={styles.content}>
            {news.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.backLink}>
            <Link href="/news">← Все новости</Link>
          </div>
        </div>
      </section>
      <Quiz />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
    </>
  );
}
