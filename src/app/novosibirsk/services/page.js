import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsSib/common/map/map";
import Quiz from "@/componentsSib/common/quiz/quiz";
import HomePractice from "@/componentsSib/home-components/home-practice/home-practice";
import HomeProblems from "@/componentsSib/home-components/home-problems/home-problems";
import ServicesMainBlock from "@/componentsSib/services-components/services-main-block/services-main-block";

export default function Services({ params }) {
  const isFizPage = params.slug === "fiz";
  const breadcrumbs = [
    { label: "Главная", path: "/novosibirsk/" },
    { label: "Услуги", path: "/novosibirsk/services" },
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
