import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import Quiz from "@/components/common/quiz/quiz";
import PriceListTable from "@/components/price-list-components/price-list-table";

export const metadata = {
  title: "Цены на юридические услуги в Кемерово | Прайс-лист",
  description:
    "Прозрачное ценообразование на юридические услуги. Доступные цены при 27-летнем опыте работы.",
  keywords: "стоимость услуг юриста, прайс юриста, цены на юридические услуги",
  alternates: {
    canonical: `https://yurist42.ru/price-list`,
  },
  openGraph: {
    title: `Цены на юридические услуги в Кемерово | Прайс-лист`,
    description: `Прозрачное ценообразование на юридические услуги. Доступные цены при 27-летнем опыте работы.`,
    url: `https://yurist42.ru/price-list`,
    images: [
      {
        url: `/favicon/favicon-96x96.png`,
        alt: `yurist42.ru`,
      },
    ],
  },
};

export default function PriceList() {
  const breadcrumbs = [
    { label: "Главная", path: "/" },
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
