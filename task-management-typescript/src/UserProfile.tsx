//User Profile Component
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile: React.FC = () => {
  const {
    user, // User profile
    isAuthenticated,
  } = useAuth0();

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default UserProfile;