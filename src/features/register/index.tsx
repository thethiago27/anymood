import Layout from "@shared/layout";
import styles from "./styles.module.scss";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { track, useTrack } from "@shared/track";
import { useEffect } from "react";
import SignInButton from "@shared/sign-in-button";

const Register = () => {
  useTrack("User viewed register page");

  const { signInWithGoogle, currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.status === "authenticated") {
      track("User tried to access register page while being authenticated");
      navigate("/my-space");
    }
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <p className={styles.title}>
          Agora é sua vez! <br />
          crie o seu <span className={styles.logo}> AnyMood</span>
        </p>
        <SignInButton />
      </div>
    </Layout>
  );
};

export default Register;
