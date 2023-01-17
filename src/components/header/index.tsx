import styles from "./styles.module.scss";
const Header = () => {
  return (
    <div className={styles.container} data-testid="header">
      <img src="/logo.svg" alt="AnyMood" />
    </div>
  );
};

export default Header;
