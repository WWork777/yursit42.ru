import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsSib/common/map/map";
import Quiz from "@/componentsSib/common/quiz/quiz";
import Practice from "@/componentsSib/practices-components/practice-list";

export const metadata = {
  title: "Наша практика | Выигранные дела юристов в Новосибирске",
  description:
    "Примеры выигранных судебных дел в Новосибирске. Более 27 лет успешной практики в арбитражных, гражданских и уголовных делах.",
  keywords:
    "юридическая практика Новосибирск, выигранные дела, судебные кейсы юриста, арбитражные дела Новосибирск, примеры судебных решений, опытный юрист Новосибирск",
  alternates: {
    canonical: `https://yurist42.ru/novosibirsk/practices`,
  },
  openGraph: {
    title: `Наша практика | Выигранные дела юристов в Новосибирске`,
    description: `Реальные примеры решённых судебных дел в Новосибирске. Более 27 лет юридической практики и успешных кейсов.`,
    url: `https://yurist42.ru/novosibirsk/practices`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `Практика юристов в Новосибирске - yurist42.ru`,
      },
    ],
  },
};

export default function Practices() {
  const breadcrumbs = [
    { label: "Главная", path: "/novosibirsk/" },
    { label: "Практики" },
  ];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Решенные дела</h1>
        <Practice />
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
