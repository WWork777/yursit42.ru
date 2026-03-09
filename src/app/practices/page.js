import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import Practice from "@/components/practices-components/practice-list";



export const metadata = {
  title: "Практика юристов в Кемерово | Судебные дела и выигранные процессы",
  description:
    "Юридическая компания «Кодексъ» — реальные примеры судебных дел и практики юристов в Кемерово и Кемеровской области. Опыт работы с 1997 года: выигранные процессы, защита интересов граждан и бизнеса, помощь в суде.",
  keywords:
    "практика юриста, судебный юрист Кемерово, юрист в суд, выигранные дела, опытные юристы, лучшие юристы Кемерово, юридическая компания, адвокатское бюро, защита интересов в суде",
  alternates: {
    canonical: "https://yurist42.ru/practices"
  },
  openGraph: {
    title: "Практика юристов в Кемерово | Судебные дела и выигранные процессы",
    description:
      "Реальные примеры выигранных дел компании «Кодексъ» в судах Кемерово и области. Опытные судебные юристы с 1997 года. Защита интересов граждан и бизнеса.",
    url: "https://yurist42.ru/practices",
    images: [
      {
        url: "/favicon/favicon-96x96.png",
        alt: "Практика юристов - yurist42.ru",
      },
    ],
  },
};


export default function Practices() {
  const breadcrumbs = [{ label: "Главная", path: "/" }, { label: "Практики" }];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Решенные дела</h1>
        <Practice />
      </section>
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
