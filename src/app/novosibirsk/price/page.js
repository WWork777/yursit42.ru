import BreadCrumble from "@/componentsSib/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/componentsSib/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsSib/common/map/map";
import Quiz from "@/componentsSib/common/quiz/quiz";
import PriceListTable from "@/componentsSib/price-list-components/price-list-table";

export const metadata = {
  title: "Цены на юридические услуги в Новосибирске | Прайс-лист юриста",
  description:
    "Стоимость юридических услуг в Новосибирске. Консультации, судебное представительство, сопровождение сделок. Прозрачные цены при 27-летнем опыте работы.",
  keywords:
    "цены юриста Новосибирск, стоимость юридических услуг, прайс-лист юриста, консультация юриста цена, услуги адвоката стоимость",
  alternates: {
    canonical: `https://yurist42.ru/novosibirsk/price`,
  },
  openGraph: {
    title: `Цены на юридические услуги в Новосибирске | Прайс-лист юриста`,
    description: `Стоимость юридических услуг в Новосибирске: консультации, сопровождение сделок, представительство в суде. Прозрачное ценообразование и доступные тарифы.`,
    url: `https://yurist42.ru/novosibirsk/price`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `Прайс-лист юридических услуг в Новосибирске - yurist42.ru`,
      },
    ],
  },
};

export default function PriceList() {
  const breadcrumbs = [
    { label: "Главная", path: "/novosibirsk/" },
    { label: "Прайс-лист" },
  ];
  return (
    <>
      <section className="section-main secondary-page">
        <BreadCrumble items={breadcrumbs} />
        <h1>Стоимость услуг</h1>
        <h5 style={{ marginTop: "20px" }}>
          Представленные цены не явлются офертой, а окончательная <br></br>{" "}
          стоимость услуг определяется при заключении договора.
        </h5>
        <PriceListTable />
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
