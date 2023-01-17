import { Container } from "./styles";
import { useAuth } from "@/hooks/useAuth";

const PersonalUrlContainer = () => {
  const { user } = useAuth();
  const handleCopy = async () =>
    await navigator.clipboard.writeText(
      `https://anymood.vercel.app/question/${user?.uid}`
    );

  return (
    <Container>
      <p>teste</p>
      <button onClick={handleCopy}>
        <img src="/icons/copy.svg" alt="Plus" />
      </button>
    </Container>
  );
};

export default PersonalUrlContainer;
