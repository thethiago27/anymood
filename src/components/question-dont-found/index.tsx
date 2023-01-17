import { Container, Title } from "./styles";
import SignInButton from "@/components/sign-in-button";
import { useRouter } from "next/router";
import { getTranslation } from "@/services/translate";

const QuestionDontFound = () => {
  const router = useRouter();

  const { locale } = router;
  const t = getTranslation(String(locale));

  return (
    <Container>
      <Title>{t.questionDontFoundText}</Title>
      <SignInButton />
    </Container>
  );
};

export default QuestionDontFound;
