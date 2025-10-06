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
            // Mobile (320-599)
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: false,
            },
            // Small tablets (600-849)
            600: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            },
            // Tablets (850-1199)
            850: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            // Small desktops (1200-1599)
            1200: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            // Large desktops (1600+)
            1600: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
          }}
        >
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome14.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome15.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome16.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/sertificate.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/sertificate2.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/certificate-1.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome17.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome3.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome4.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome5.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome6.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome7.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome8.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome9.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome10.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome11.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome12.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome13.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome1.webp" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <SliderCard sliderImageSrc="/home/diplome/diplome2.webp" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.custom_pagination}></div>
      </div>
    </section>
  );
}
