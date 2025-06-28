"use client";

import styles from "./map.module.scss";
import "./map-second.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function ContactPageYandexMap() {
  return (
    <div 
    className={styles.section_map}
    >
      <YMaps>
        <div className="ymaps">
          <Map
            className="map"
            defaultState={{ center: [55.349312, 86.088006], zoom: 15.5 }}
          >
            <Placemark
              geometry={[55.349312, 86.088006]}
              options={{ preset: "islands#darkBlueDotIcon" }}
            />
          </Map>
          <div className={styles.info_block}>
            <h3>Адрес</h3>
            <p>г. Кемерово, ул. Красная, д. 13</p>
            <h3>Мы на связи</h3>
            <p>kodeks_yrist@mail.ru</p>
            <h5>+7 (960) 930‒91‒91</h5>
            <div className={styles.info_block_bottom}>
              <div className={styles.info_block_bottom_item}>
                <img src="/svg/contacts/wa.svg" />
                <p>Whatsapp</p>
              </div>
              <div className={styles.info_block_bottom_item}>
                <img src="/svg/contacts/tg.svg" />
                <p>Telegram</p>
              </div>
            </div>
          </div>
        </div>
      </YMaps>
    </div>
  );
}
