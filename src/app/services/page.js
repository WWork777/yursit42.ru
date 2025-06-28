import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import HomePractice from "@/components/home-components/home-practice/home-practice";
import HomeProblems from "@/components/home-components/home-problems/home-problems";
import ServicesMainBlock from "@/components/services-components/services-main-block/services-main-block";

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
