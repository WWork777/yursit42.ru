import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsSib/common/map/map";
import HeroBlock from "@/componentsSib/home-components/hero-block/hero-block";
import HomeDiplom from "@/componentsSib/home-components/home-diplom/home-diplome";
import HomeHelp from "@/componentsSib/home-components/home-help/home-help";
import HomePractice from "@/componentsSib/home-components/home-practice/home-practice";
import HomeProblems from "@/componentsSib/home-components/home-problems/home-problems";
import HomeTeam from "@/componentsSib/home-components/home-team/home-team";
import PurposeHome from "@/componentsSib/home-components/purpose-home/purpose-home";
import Quiz from "@/componentsSib/common/quiz/quiz";

export const metadata = {
  title: "Юрист в Новосибирске | Юридическая компания Кодексъ",
  description:
    "Юридические услуги в Новосибирске: консультации юриста, защита в суде, сопровождение сделок, банкротство, наследство и недвижимость. Бесплатная консультация юриста.",
  keywords:
    "юрист Новосибирск, адвокат Новосибирск, юридическая помощь, консультация юриста Новосибирск, услуги юриста, банкротство Новосибирск, наследственные споры, жилищные споры",
  alternates: {
    canonical: `https://nsk.yurist42.ru/`,
  },
  openGraph: {
    title: `Юрист в Новосибирске | Юридическая компания Кодексъ`,
    description: `Юридические услуги в Новосибирске: консультации, судебное сопровождение, банкротство, наследство, недвижимость. Бесплатная консультация юриста.`,
    url: `https://nsk.yurist42.ru/`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `yurist42.ru`,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroBlock
        heroTitle="Мы знаем про закон все <br> и немного больше"
        heroText="Юридическая помощь частным и корпоративным клиентам <br> Более 27 лет опыта в арбитраже и гражданских спорах"
        heroTextMobile="Юридическая помощь частным <br> и корпоративным клиентам"
        firstBlockText="лет юридической практики"
        secondBlockText="успешно выигранных дел"
        thirdBlockText="дел разрешаем в пользу клиента"
        firstBlockTextNumber="27"
        secondBlockTextNumber="1100+"
        thirdBlockTextNumber="95%"
        buttonText="Бесплатная консультация"
        backgroundImageLink={"/common/hero-background.webp"}
      />
      <Quiz />
      <HomeHelp
        helpTitle="Помогаем юридическим <br> и физическим лицам"
        helpTitleLeftBlock="ГРАЖДАНАМ"
        helpTitleRightBlock="БИЗНЕСУ"
      />
      <HomePractice practiceTitle="Юридическая практика <br> с 1997 года" />
      <HomeProblems problemsTitle="Решаем Ваши проблемы" />
      <PurposeHome
        purposeTitle="Наши ценности"
        purposeText="«КодексЪ» на страже ваших прав <br> с 1997 года, за это время в компании <br> сформировались следующие принципы:"
      />
      <HomeTeam teamTitle="Команда КодексЪ" />
      <HomeDiplom diplomTitle="Дипломы и сертификаты" />
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
