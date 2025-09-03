import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import Quiz from "@/components/common/quiz/quiz";
import HomePractice from "@/components/home-components/home-practice/home-practice";
import HomeProblems from "@/components/home-components/home-problems/home-problems";
import ServicesMainBlock from "@/components/services-components/services-main-block/services-main-block";

export default function Services({ params }) {
  const isFizPage = params.slug === "fiz";
  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: "Услуги", path: "/services" },
    { label: isFizPage ? "Физическим лицам" : "Юридическим лицам" },
  ];

  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Услуги компании КодексЪ</h1>
        <ServicesMainBlock isFizPage={isFizPage} />
      </section>
      <Quiz />
      <HomeProblems problemsTitle="Решаем Ваши проблемы" />
      <HomePractice practiceTitle="Юридическая практика <br> с 1997 года" />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
