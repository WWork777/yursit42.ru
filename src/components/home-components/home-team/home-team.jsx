"use client";
import styles from "./home-team.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderCard = ({
  sliderImageSrc,
  sliderTitle,
  sliderText,
  imageClass,
}) => {
  return (
    <div className={styles.home_team_slider_card_container}>
      <div className={styles.home_team_slider_card}>
        <img
          src={sliderImageSrc}
          alt="team"
          className={`${styles.home_team_slider_card_image} ${imageClass}`}
        />
      </div>
      <div className={styles.home_team_slider_card_text}>
        <h6 className={styles.home_team_slider_card_text_title}>
          {sliderTitle}
        </h6>
        <h5>{sliderText}</h5>
      </div>
    </div>
  );
};

export default function HomeTeam({ teamTitle }) {
  return (
    <section className={`section-main ${styles.team_section}`}>
      <div className={styles.title_container}>
        <h1 dangerouslySetInnerHTML={{ __html: teamTitle }}></h1>
        <div className={`${styles.custom_navigation}`}>
          <div className={`${styles.custom_prev}`}></div>
          <div className={`${styles.custom_next}`}></div>
        </div>
      </div>

      <div className={styles.home_team_slider}>
        <Swiper
          modules={[Navigation, Pagination]}
          className={styles.mySwiper}
          spaceBetween={300}
          slidesPerView="auto"
          loop
          navigation={{
            nextEl: `.${styles.custom_next}`,
            prevEl: `.${styles.custom_prev}`,
            disabledClass: "swiper-button-disabled",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            850: {
              slidesPerView: 2,
              spaceBetween: 200,
            },
            1000: {
              slidesPerView: 2,
              spaceBetween: 250,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 350,
            },
            1400: {
              slidesPerView: 2,
              spaceBetween: 350,
            },
            1600: {
              slidesPerView: 3,
              spaceBetween: 350,
            }
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          <SwiperSlide>
            <SliderCard
              sliderImageSrc="/home/team/team1.webp"
              sliderTitle="Прозоров Александр"
              sliderText="Юрист с более чем 27-ми летним опытом юридической практики, имеет высшее юридическое образование московского ВУЗа"
              imageClass={styles.team_img1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard
              sliderImageSrc="/home/team/team2.webp"
              sliderTitle="Масленников Дмитрий"
              sliderText="Самый педантичный и внимательный юрист. Имеет разносторонний опыт по юридической специальности"
              imageClass={styles.team_img2}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard
              sliderImageSrc="/home/team/team3.webp"
              sliderTitle="Котилевская Диана"
              sliderText="Специалист в области права с акцентом на семейные и корпоративные дела. Обладает уникальным подходом к каждому клиенту."
              imageClass={styles.team_img3}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderCard
              sliderImageSrc="/home/team/team4.webp"
              sliderTitle="Саймойлова Веста"
              sliderText="Хранитель процессуального кодекса. Отлично владеет знанием законодательства, идеально подбирает судебную практику"
              imageClass={styles.team_img4}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
