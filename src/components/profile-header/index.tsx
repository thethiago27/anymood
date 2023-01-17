import { Container } from "./styles";
import { useAuth } from "@/hooks/useAuth";

const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <Container data-testid="profile-header">
      <img src={user.user.photoURL} alt="Profile" />
      <p>{user.user.displayName}</p>
    </Container>
  );
};

export default ProfileHeader;
