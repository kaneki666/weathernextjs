import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  WiWindy,
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiCloudy,
  WiDaySunny,
  WiNightClear,
  WiDayFog,
  WiNightFog,
  WiNightCloudy,
  WiDayCloudy,
} from "react-icons/wi";
import AsyncSelect from "react-select/async";
import CardInfo from "../components/Cardinfo";

import styles from "../styles/Home.module.css";
import { saveDetails } from "../redux/actions/saveDetails";
import { saveForecast } from "../redux/actions/saveForecast";
import { useDispatch } from "react-redux";
import { divisions } from "../constants/divisions";
import CardForecast from "../components/CardForecast";
import { IconContext } from "react-icons/lib";

const filterColors = (inputValue) => {
  return divisions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default function Home() {
  const dispatch = useDispatch();

  const [district, setDistrict] = useState("Dhaka");
  const [data, setData] = useState("");
  const [forecastdata, setForecastData] = useState("");

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=b58c79387854ecac0b83118557585b26`
    );
    const weather = await response.json();
    setData(weather);

    const districtfound = divisions.find(
      (element) => element.value === district
    );

    const responseforecast = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${districtfound.lat}&lon=${districtfound.long}&exclude=hourly,minutely&appid=b58c79387854ecac0b83118557585b26`
    );
    const weatherforecast = await responseforecast.json();
    setForecastData(weatherforecast);

    dispatch(saveDetails(weather));
  };

  useEffect(() => {
    fetchWeather();
  }, [district]);

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

      <main className={styles.main}>
        <div className={styles.select}>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            value={district}
            onChange={(e) => setDistrict(e.value)}
            placeholder="Choose divison"
          />
        </div>

        {data.message === "city not found" ? (
          <div className={styles.element}>
            <h2 className={styles.title}>{data.message}</h2>
          </div>
        ) : (
          <div className={styles.element}>
            {data.main && (
              <Link href="/DetailsCity">
                <div>
                  <h2 className={styles.title}>{data.name}</h2>
                  {data.weather[0].main === "Haze" ? (
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "global-class-name",
                        size: "10em",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          marginTop: "5px",
                        }}
                      >
                        <WiNightFog />
                      </div>
                    </IconContext.Provider>
                  ) : data.weather[0].main === "Clear" ? (
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "global-class-name",
                        size: "10em",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          marginTop: "5px",
                        }}
                      >
                        <WiNightClear />
                      </div>
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "global-class-name",
                        size: "10em",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          marginTop: "5px",
                        }}
                      >
                        <WiNightCloudy />
                      </div>
                    </IconContext.Provider>
                  )}
                  <CardInfo
                    icon={<WiThermometer />}
                    info={`${Math.round(data.main.temp - 273.15)}°C`}
                  />
                  <CardInfo icon={<WiWindy />} info={`${data.wind.speed}`} />
                  <CardInfo icon={<WiCloudy />} info={`${data.clouds.all}%`} />
                  <CardInfo
                    icon={<WiSunrise />}
                    info={`${convertTime(data.sys.sunrise)}`}
                  />
                  <CardInfo
                    icon={<WiSunset />}
                    info={`${convertTime(data.sys.sunset)}`}
                  />
                </div>
              </Link>
            )}
          </div>
        )}

        <div className={styles.marginTop}>
          {forecastdata &&
            forecastdata.daily.map((i, index) => (
              <Link href="/DetailsForecast" key={index}>
                <div
                  className={styles.elementforecast}
                  onClick={() => dispatch(saveForecast(i))}
                >
                  <p className={styles.description}>{`${convertDate(i.dt)}`}</p>
                  <CardForecast
                    icon={
                      i.weather[0].main === "Haze" ? (
                        <WiDayFog />
                      ) : i.weather[0].main === "Clear" ? (
                        <WiDaySunny />
                      ) : (
                        <WiDayCloudy />
                      )
                    }
                    info={`${Math.round(i.temp.day - 273.15)}°C`}
                  />

                  <CardForecast
                    icon={
                      i.weather[0].main === "Haze" ? (
                        <WiNightFog />
                      ) : i.weather[0].main === "Clear" ? (
                        <WiNightClear />
                      ) : (
                        <WiNightCloudy />
                      )
                    }
                    info={`${Math.round(i.temp.night - 273.15)}°C`}
                  />
                  <CardInfo
                    icon={<WiSunrise />}
                    info={`${convertTime(i.sunrise)}`}
                  />
                  <CardInfo
                    icon={<WiSunset />}
                    info={`${convertTime(i.sunset)}`}
                  />
                </div>
              </Link>
            ))}{" "}
        </div>
      </main>

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
}
