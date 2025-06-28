import BreadCrumble from "@/components/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/components/common/consultation-form/comsultation-form";
import YandexMap from "@/components/common/map/map";
import PriceListTable from "@/components/price-list-components/price-list-table";
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
      <ConsultationForm
        consultationTitle="Получите консультацию"
        consultationText="Оценим шансы, предложим решение и стоимость"
      />
      <YandexMap />
    </>
  );
}
