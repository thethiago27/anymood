import { useEffect } from "react";
import { getTranslation } from "@/services/translate";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import ProfileHeader from "@/components/profile-header";
import PersonalUrlContainer from "@/components/personal-url-container";
import { Container } from "./styles";

const MySpace = () => {
  const router = useRouter();
  const t = getTranslation(String(router.locale));

  const { user } = useAuth();

  useEffect(() => {
    if (user.status === "unauthenticated") router.push("/");
  }, [user, router]);

  return (
    <Layout>
      <Container>
        <ProfileHeader />
        <PersonalUrlContainer />
      </Container>
    </Layout>
  );
};

export default MySpace;
