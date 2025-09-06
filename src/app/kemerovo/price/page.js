import BreadCrumble from "@/componentsKem/common/breadCrumble/breadCrumble";
import ConsultationForm from "@/componentsKem/common/consultation-form/comsultation-form";
import YandexMap from "@/componentsKem/common/map/map";
import Quiz from "@/componentsKem/common/quiz/quiz";
import PriceListTable from "@/componentsKem/price-list-components/price-list-table";

export const metadata = {
  title:
    "Цены на услуги юриста в Кемерово | Стоимость консультаций и судебной помощи",
  description:
    "Стоимость услуг юриста и адвоката в Кемерово. Прозрачный прайс на консультации, сопровождение в суде, помощь по банкротству, составление договоров и защиту прав граждан и бизнеса. Опыт 27 лет — юридическая компания «Кодексъ».",
  keywords:
    "цены на услуги юриста Кемерово, стоимость услуг юриста, прайс юриста, консультация адвоката, помощь юриста, юридическая компания, юридическое бюро Кемерово, судебный юрист, юрист по банкротству",
  alternates: {
    canonical: "https://yurist42.ru/kemerovo/price",
  },
  openGraph: {
    title:
      "Цены на услуги юриста в Кемерово | Стоимость консультаций и судебной помощи",
    description:
      "Прайс на юридические услуги компании «Кодексъ» в Кемерово: консультация юриста, помощь в суде, банкротство, договоры, защита прав граждан и бизнеса. Прозрачное ценообразование.",
    url: "https://yurist42.ru/kemerovo/price",
    images: [
      {
        url: "/favicon/favicon-96x96.png",
        alt: "Цены на юридические услуги - yurist42.ru",
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
