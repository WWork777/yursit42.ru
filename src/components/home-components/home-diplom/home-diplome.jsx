"use client";
import styles from "./home-diplom.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderCard = ({ sliderImageSrc }) => {
  return (
    <div className={styles.home_diplom_slider_card_container}>
      <img
        src={sliderImageSrc}
        alt="diplom"
        className={styles.home_diplom_slider_card_image}
      />
    </div>
  );
};

export default function HomeDiplom({ diplomTitle }) {
  return (
    <section className={`section-main ${styles.diplom_section}`}>
      <div className={styles.title_container}>
        <h1 dangerouslySetInnerHTML={{ __html: diplomTitle }}></h1>
        <div className={styles.custom_navigation}>
          <div className={styles.custom_prev}></div>
          <div className={styles.custom_next}></div>
        </div>
      </div>

      <div className={styles.home_diplom_slider}>
        <Swiper
          modules={[Navigation, Pagination]}
          className={styles.mySwiper}
          spaceBetween={100}
          slidesPerView={3}
          navigation={{
            nextEl: `.${styles.custom_next}`,
            prevEl: `.${styles.custom_prev}`,
            disabledClass: "swiper-button-disabled",
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome1.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome1.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome1.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome1.png" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.custom_pagination}></div>
      </div>
    </section>
  );
}
