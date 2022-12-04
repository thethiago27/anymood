import styles from "./styles.module.scss";
import logo from "./assets/logo.svg";

const TopBar = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default TopBar;
