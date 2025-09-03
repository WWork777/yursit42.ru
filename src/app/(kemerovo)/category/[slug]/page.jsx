import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import HeroBlock from "@/components/home-components/hero-block/hero-block";
import servicesData from "@/data/gr-all-services.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./style.module.scss";
import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import Quiz from "@/components/common/quiz/quiz";

export async function generateMetadata({ params }) {
  const service = servicesData.find((item) => item.slug === params.slug);

  if (!service) return {};

  return {
    title: service.titleSeo || service.title,
    description: service.descriptionSeo || service.description,
    keywords: service.keywords || "",
    alternates: {
      canonical: `https://yurist42.ru/category/${params.slug}`,
    },
    openGraph: {
      title: service.titleSeo || service.title,
      description: service.descriptionSeo || service.description,
      url: `https://yurist42.ru/category/${params.slug}`,
      images: [
        {
          url: `/favicon/favicon-96x96.png`,
          alt: `yurist42.ru`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  try {
    if (!Array.isArray(servicesData)) {
      return [];
    }

    const slugs = servicesData.map((service) => ({ slug: service.slug }));
    return slugs;
  } catch (error) {
    console.error("Ошибка при генерации статических параметров:", error);
    return [];
  }
}

export default function Page({ params }) {
  if (!Array.isArray(servicesData)) {
    return notFound();
  }

  const service = servicesData.find((item) => item?.slug === params.slug);

  if (!service) {
    return notFound();
  }
  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: "Услуги физическим лицам", path: "/services?type=gr" },
    { label: service.title },
  ];
  return (
    <>
      <HeroBlock
        heroTitle={service.title}
        heroText={service.description}
        heroTextMobile={service.description}
        firstBlockText="лет юридической практики"
        secondBlockText="успешно выигранных дел"
        thirdBlockText="дел разрешаем в пользу клиента"
        firstBlockTextNumber="27"
        secondBlockTextNumber="1100+"
        thirdBlockTextNumber="95%"
        buttonText="Бесплатная консультация"
        backgroundImageLink="/common/hero-background2.webp"
      />

      <section className="section-main">
        <BreadCrumble items={breadcrumbs} />
        <h1>Ключевые услуги</h1>
        <div className={styles.service_list}>
          {service.items &&
            service.items.length > 0 &&
            service.items.map((itemGroup, index) => (
              <div key={index} className={styles.service_list_group}>
                {Object.entries(itemGroup).map(([serviceName, servicePath]) => (
                  <Link
                    key={servicePath}
                    href={`/${servicePath}`}
                    className={styles.service_list_item}
                  >
                    <p>{serviceName}</p>
                  </Link>
                ))}
              </div>
            ))}
        </div>
      </section>
      <Quiz />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
