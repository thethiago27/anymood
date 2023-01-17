import { useRouter } from "next/router";
import { getTranslation } from "@/services/translate";
import { Button } from "./styles";
import { useAuth } from "@/hooks/useAuth";

const SignInButton = () => {
  const router = useRouter();
  const t = getTranslation(String(router.locale));

  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();

      await router.push("/my-space");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button onClick={handleSignInWithGoogle}>
      <img src="/icons/google.svg" alt="Google Logo" />
      <span>{t.signInWithGoogle}</span>
    </Button>
  );
};

export default SignInButton;
