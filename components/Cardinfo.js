import { IconContext } from "react-icons/lib";
import styles from "../styles/Home.module.css";
const CardInfo = ({ info, icon }) => {
  return (
    <IconContext.Provider
      value={{
        color: "white",
        className: "global-class-name",
        size: "3em",
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
        {icon}
        <h4 className={styles.description}>{info}</h4>
      </div>
    </IconContext.Provider>
  );
};

export default CardInfo;
