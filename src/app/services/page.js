import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import HomePractice from "@/components/home-components/home-practice/home-practice";
import HomeProblems from "@/components/home-components/home-problems/home-problems";
import ServicesMainBlock from "@/components/services-components/services-main-block/services-main-block";


export const metadata = {
  title: "Юридические услуги в Кемерово | Консультации, защита в суде, оформление документов",
  description: "Профессиональные юридические услуги в Кемерово для физических и юридических лиц. Консультации, представительство в суде, составление договоров, защита прав. Опытные юристы с индивидуальным подходом к каждому клиенту.",
  keywords:"юрист Кемерово, юридические услуги, консультация юриста, адвокат Кемерово, помощь юриста, судебные споры, оформление документов, защита прав, юридическая помощь, семейный юрист, трудовые споры, жилищные вопросы",
  alternates: {
    canonical: `https://yurist42.ru/services`
  },
  openGraph: {
      title: `Юридические услуги в Кемерово | Консультации, защита в суде, оформление документов`,
      description: `Профессиональные юридические услуги в Кемерово для физических и юридических лиц. Консультации, представительство в суде, составление договоров, защита прав. Опытные юристы с индивидуальным подходом к каждому клиенту.`,
      url: `https://yurist42.ru/services`,
      images: [
          {
              url: `/favicon/favicon-96x96.png`,
              alt: `yurist42.ru`,
          },
      ],
  },
};

export default function Services({ pageTitle, searchParams }) {
  const selectedType = searchParams.type || null;
  const breadcrumbs = [{ label: "Главная", path: "/" }, { label: "Услуги" }];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Услуги компании КодексЪ</h1>
        <ServicesMainBlock selectedType={selectedType} />
      </section>
      <HomeProblems problemsTitle="Решаем ваши проблемы" />
      <HomePractice practiceTitle="Юридическая практика <br> с 1997 года" />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
