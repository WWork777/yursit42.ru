import { notFound } from "next/navigation";
import servicesGrData from "@/data/services-gr.json";
import servicesBzData from "@/data/services-bz.json";
import HeroBlock from "@/componentsKem/home-components/hero-block/hero-block";
import WeCan from "@/componentsKem/service-detail-page-components/wecan/wecan";
import HomePractice from "@/componentsKem/home-components/home-practice/home-practice";
import Etaps from "@/componentsKem/service-detail-page-components/etaps/eteps";
import ConsultationForm from "@/componentsKem/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsKem/common/map/map";
import BreadCrumble from "@/componentsKem/common/breadCrumble/breadCrumble";
import Quiz from "@/componentsKem/common/quiz/quiz";

export async function generateMetadata({ params }) {
  const allItems = [...servicesGrData, ...servicesBzData];
  const service = allItems
    .flatMap((c) => c.items)
    .find((item) => item.slug === params.slug);

  if (!service) return {};

  return {
    title: service.title || `${service.text} | Юридические услуги в Кемерово`,
    description: service.descriptionSeo || service.description,
    keywords: service.keywordsSeo || "",
    alternates: {
      canonical: `https://yurist42.ru/kemerovo/services/${params.slug}`,
    },
    openGraph: {
      title: service.title || `${service.text} | Юридические услуги в Кемерово`,
      description: service.descriptionSeo || service.description,
      url: `https://yurist42.ru/kemerovo/services/${params.slug}`,
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
  const allItems = [...servicesGrData, ...servicesBzData];
  const slugs = allItems.flatMap((category) =>
    category.items.map((item) => ({ slug: item.slug }))
  );
  return slugs;
}

export default function ServicePage({ params }) {
  const allItems = [...servicesGrData, ...servicesBzData];

  const service = allItems
    .flatMap((c) => c.items)
    .find((item) => item.slug === params.slug);
  if (!service) {
    return notFound();
  }

  const helpBlocks = [
    service.helpblock1,
    service.helpblock2,
    service.helpblock3,
    service.helpblock4,
    service.helpblock5,
    service.helpblock6,
    service.helpblock7,
    service.helpblock8,
  ];
  const breadcrumbs = [
    { label: "Главная", path: "/kemerovo/" },
    { label: "Практики" },
  ];
  return (
    <div>
      <HeroBlock
        heroTitle={service.text}
        heroText={service.description}
        heroTextMobile={service.description}
        firstBlockText="лет юридической практики"
        secondBlockText="успешно выигранных дел"
        thirdBlockText="дел разрешаем в пользу клиента"
        firstBlockTextNumber="27"
        secondBlockTextNumber="1100+"
        thirdBlockTextNumber="95%"
        buttonText="Бесплатная консультация"
        backgroundImageLink={"/common/hero-background2.webp"}
      />
      <WeCan weCanTitle="Мы поможем" helpBlocks={helpBlocks} />
      <Quiz />
      <HomePractice practiceTitle="Юридическая практика <br> с 1997 года" />
      <Etaps
        etapsTitle="Этапы нашей <br> с вами работы"
        etapsText="В зависимости от вашей ситуации этапы могут отличаться, но мы выделили ключевые шаги, чтобы вы заранее понимали, как проходит работа и на чём строится результат"
      />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </div>
  );
}
