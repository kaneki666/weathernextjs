import Head from "next/head";
import { useState } from "react";

import {
  WiWindy,
  WiThermometer,
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiFog,
  WiCloudy,
} from "react-icons/wi";
import { useSelector } from "react-redux";

import CardInfo from "../components/Cardinfo";

import styles from "../styles/Home.module.css";

const DetailsCity = () => {
  const data = useSelector((state) => state.DetailsWeather.data);

  const convertTime = (time) => {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ":" + minutes.substr(-2);

    return formattedTime;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Forecaster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data && (
        <main className={styles.main}>
          <div className={styles.element}>
            <h2 className={styles.title}>{data.name}</h2>
            <p className={styles.descriptiontime}>
              {new Date().toLocaleString()}
            </p>
            <CardInfo
              icon={
                data.weather[0].main === "haze" ? (
                  <WiFog />
                ) : data.weather[0].main === "clear" ? (
                  <WiDaySunny />
                ) : (
                  <WiCloudy />
                )
              }
              info={`${data.weather[0].description}`}
            />
            <CardInfo
              icon={<WiThermometer />}
              info={`${Math.round(data.main.temp - 273.15)}°C`}
            />
            <CardInfo icon={<WiHumidity />} info={`${data.main.humidity}`} />
            <CardInfo icon={<WiWindy />} info={`${data.wind.speed}`} />

            <CardInfo
              icon={<WiSunrise />}
              info={`${convertTime(data.sys.sunrise)}`}
            />
            <CardInfo
              icon={<WiSunset />}
              info={`${convertTime(data.sys.sunset)}`}
            />
          </div>
        </main>
      )}

      <footer className={styles.footer}>
        <a
          href="https://github.com/kaneki666"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Sadman
        </a>
      </footer>
    </div>
  );
};
export default DetailsCity;
