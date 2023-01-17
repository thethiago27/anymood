import Layout from "@/components/layout";
import { NextRouter, withRouter } from "next/router";
import { getTranslation } from "@/services/translate";
import SignInButton from "@/components/sign-in-button";
import { Container, Title } from "@/styles/styles";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
interface WithRouterProps {
  router: NextRouter;
}

const Home = ({ router }: WithRouterProps) => {
  const { locale } = router;
  const t = getTranslation(String(locale));

  const { user } = useAuth();

  useEffect(() => {
    if (user.status === "authenticated") router.push("/my-space");
  }, [user, router]);

  return (
    <Layout>
      <Container>
        <Title>{t.welcomeHomePage}</Title>
        <SignInButton />
      </Container>
    </Layout>
  );
};

export default withRouter(Home);
