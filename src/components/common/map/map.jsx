"use client";

import styles from "./map.module.scss";
import "./map-second.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Link from "next/link";
// import { useGeo } from "@/components/layout-components/GeoProvider";

const MapData = {
  kemerovo: {
    point: [55.349312, 86.088006],
    center: [55.352312, 86.078006],
    address: "г. Кемерово, ул. Красная, д. 13",
  },
  novosibirsk: {
    point: [55.039909, 82.941702],
    center: [55.040909, 82.938702],
    address: "г Новосибирск, Ипподромская ул, 19",
  },
};

export default function YandexMap() {
  // const { cityKey, isLoaded } = useGeo();
  // if (!isLoaded) return null;
  // const activeData = MapData[cityKey];

  return (
    <YMaps>
      <div className={styles.maps_grid_container}>
        {/* Карта Кемерово */}
        <div className={styles.section_map}>
          <Map
            className={styles.map}
            defaultState={{ center: MapData.kemerovo.center, zoom: 14 }}
          >
            <Placemark
              geometry={MapData.kemerovo.point}
              options={{ preset: "islands#darkBlueDotIcon" }}
            />
          </Map>
          <div className={styles.info_block}>
            <h3>Филиал в г. Кемерово</h3>
            <p>{MapData.kemerovo.address}</p>
            <h3>Мы на связи</h3>
            <Link href="mailto:kodeks-yurist@yandex.ru">
              <p>kodeks-yurist@yandex.ru</p>
            </Link>
            <h5>
              <Link href="tel:+79609309191">+7 (960) 930‒91‒91</Link>
            </h5>
            <div className={styles.info_block_bottom}>
              <Link
                href="https://max.ru/u/f9LHodD0cOKU3qvldFKHsXB1Hs0cS8Ve_tQtUFZ5F6BOwi4vntNqXHG2MiA"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/contacts/max.svg" alt="Whatsapp" />
                <p>Max</p>
              </Link>
              <Link
                href="https://telegram.me/yurist42_kodeks"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/contacts/tg.svg" alt="Telegram" />
                <p>Telegram</p>
              </Link>
              <Link
                href="https://telegram.me/yurist42_kodeks"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/header/telegaDark.svg" alt="Telegram"  height={23} width={23}/>
                <p>Telega</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Карта Новосибирска */}
        <div className={styles.section_map}>
          <Map
            className={styles.map}
            defaultState={{ center: MapData.novosibirsk.center, zoom: 16 }}
          >
            <Placemark
              geometry={MapData.novosibirsk.point}
              options={{ preset: "islands#darkBlueDotIcon" }}
            />
          </Map>
          <div className={styles.info_block}>
            <h3>Филиал в г. Новосибирск</h3>
            <p>{MapData.novosibirsk.address}</p>
            <h3>Мы на связи</h3>
            <Link href="mailto:kodeks-yurist@yandex.ru">
              <p>kodeks-yurist@yandex.ru</p>
            </Link>
            <h5>
              <Link href="tel:+79609309191">+7 (960) 930‒91‒91</Link>
            </h5>
            <div className={styles.info_block_bottom}>
              <Link
                href="https://max.ru/u/f9LHodD0cOKU3qvldFKHsXB1Hs0cS8Ve_tQtUFZ5F6BOwi4vntNqXHG2MiA"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/contacts/max.svg" alt="Whatsapp" />
                <p>Max</p>
              </Link>
              <Link
                href="https://telegram.me/yurist42_kodeks"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/contacts/tg.svg" alt="Telegram" />
                <p>Telegram</p>
              </Link>
              <Link
                href="https://telegram.me/yurist42_kodeks"
                className={styles.info_block_bottom_item}
              >
                <img src="/svg/header/telegaDark.svg" alt="Telegram"  height={23} width={23}/>
                <p>Telega</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </YMaps>
  );
}
