import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import HeroBlock from "@/components/home-components/hero-block/hero-block";
import HomeDiplom from "@/components/home-components/home-diplom/home-diplome";
import HomeHelp from "@/components/home-components/home-help/home-help";
import HomePractice from "@/components/home-components/home-practice/home-practice";
import HomeProblems from "@/components/home-components/home-problems/home-problems";
import HomeTeam from "@/components/home-components/home-team/home-team";
import PurposeHome from "@/components/home-components/purpose-home/purpose-home";

export default function Home() {
  return (
    <>
      <HeroBlock
        heroTitle="Мы знаем про закон все <br> и немного больше"
        heroText="Юридическая помощь частным и корпоративным клиентам <br> Более 27 лет опыта в арбитраже и гражданских спорах"
        firstBlockText="лет юридической практики"
        secondBlockText="успешно выигранных дел"
        thirdBlockText="дел разрешаем в пользу клиента"
        firstBlockTextNumber="27"
        secondBlockTextNumber="1100+"
        thirdBlockTextNumber="95%"
        buttonText="Бесплатная консультация"
        backgroundImageLink={"/common/hero-background.jpg"}
      />
      <HomeHelp
        helpTitle="Помогаем юридическим <br> и физическим лицам"
        helpTitleLeftBlock="ГРАЖДАНАМ"
        helpTitleRightBlock="БИЗНЕСУ"
      />
      <HomePractice practiceTitle="Юридическая практика <br> с 1997 года" />
      <HomeProblems problemsTitle="Реашем ваши проблемы" />
      <PurposeHome
        purposeTitle="Наши ценности"
        purposeText="«КодексЪ» на страже ваших прав <br> с 1997 года, за это время в компании <br> сформировались следующие принципы:"
      />
      <HomeTeam teamTitle="Команда КодексЪ" />
      <HomeDiplom diplomTitle="Дипломы и сертификаты" />
      <ConsultationForm consultationTitle="Получите консультацию" consultationText="Оценим шансы, предложим решение и стоимость"/>
      <YandexMap />
    </>
  );
}
