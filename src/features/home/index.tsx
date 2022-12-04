import Layout from "@shared/layout";
import styles from "./styles.module.scss";
import SignInButton from "@shared/sign-in-button";

const Home = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <p>Receba respostas anônimas agora mesmo!</p>
        <p>
          Crie seu <span className={styles.anymood}>AnyMood</span>
        </p>
        <SignInButton />
      </div>
    </Layout>
  );
};

export default Home;
