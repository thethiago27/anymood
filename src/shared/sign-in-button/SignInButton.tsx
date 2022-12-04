import styles from "./styles.module.scss";
import google from "@features/register/assets/google.svg";
import { track, trackIncrement } from "@shared/track";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();

      track("User signed in with Google");
      trackIncrement("user-sign-in-with-google");

      navigate("/my-space");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button className={styles.socialLogin} onClick={handleSignInWithGoogle}>
      <img src={google} alt="Google" />
      <span>Continue com o Google</span>
    </button>
  );
};

export default SignInButton;
