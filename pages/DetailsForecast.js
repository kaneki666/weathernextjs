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
  WiDaySunny,
  WiDayFog,
  WiNightFog,
  WiNightCloudy,
  WiNightClear,
} from "react-icons/wi";
import { useSelector } from "react-redux";

import CardInfo from "../components/Cardinfo";

import styles from "../styles/Home.module.css";

const DetailsForecast = () => {
  const data = useSelector((state) => state.DetailsWeather.forecast);

  const convertTime = (time) => {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ":" + minutes.substr(-2);

    return formattedTime;
  };
  const convertDate = (time) => {
    let date = `${new Date(time * 1000)}`;
    return date.substring(0, 16);
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
            <p className={styles.descriptiontime}>{convertDate(data.dt)}</p>

            <CardInfo info={`${data.weather[0].description}`} />
            <CardInfo
              icon={
                data.weather[0].main === "Haze" ? (
                  <WiDayFog />
                ) : data.weather[0].main === "Clear" ? (
                  <WiDaySunny />
                ) : (
                  <WiCloudy />
                )
              }
              info={`${Math.round(data.temp.day - 273.15)}°C`}
            />

            <CardInfo
              icon={
                data.weather[0].main === "Haze" ? (
                  <WiNightFog />
                ) : data.weather[0].main === "Clear" ? (
                  <WiNightClear />
                ) : (
                  <WiNightCloudy />
                )
              }
              info={`${Math.round(data.temp.eve - 273.15)}°C`}
            />
            <CardInfo icon={<WiHumidity />} info={`${data.humidity}`} />
            <CardInfo icon={<WiWindy />} info={`${data.wind_speed}`} />
            <CardInfo icon={<WiCloudy />} info={`${data.clouds}%`} />
            <CardInfo
              icon={<WiSunrise />}
              info={`${convertTime(data.sunrise)}`}
            />
            <CardInfo
              icon={<WiSunset />}
              info={`${convertTime(data.sunset)}`}
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
export default DetailsForecast;
