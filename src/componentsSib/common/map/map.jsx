"use client";

import styles from "./map.module.scss";
import "./map-second.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Link from "next/link";

export default function YandexMap() {
  return (
    <div className={styles.section_map}>
      <YMaps>
        <div className="ymaps">
          <Map
            className="map"
            defaultState={{ center: [55.039909, 82.941702], zoom: 15.5 }}
          >
            <Placemark
              geometry={[55.039909, 82.941702]}
              options={{ preset: "islands#darkBlueDotIcon" }}
            />
          </Map>
          <div className={styles.info_block}>
            <h3>Адрес</h3>
            <p>г Новосибирск, Ипподромская ул, 19</p>
            <h3>Мы на связи</h3>
            <Link href="mailto:kodeks_yrist@mail.ru">
              <p>kodeks_yrist@mail.ru</p>
            </Link>
            <h5>
              <Link href="tel:+79609309191">+7 (960) 930‒91‒91</Link>
            </h5>
            <div className={styles.info_block_bottom}>
              <Link
                href="https://api.whatsapp.com/send/?phone=79609309191&text&type=phone_number&app_absent=0"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/contacts/wa.svg" />
                <p>Whatsapp</p>
              </Link>
              <Link
                href="https://telegram.me/yurist42_kodeks"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/contacts/tg.svg" />
                <p>Telegram</p>
              </Link>
            </div>
          </div>
        </div>
      </YMaps>
    </div>
  );
}
