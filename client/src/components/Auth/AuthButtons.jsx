import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./AuthButtons.module.css";

function AuthButtons() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
      <button className={styles.button} onClick={() => loginWithRedirect()}>
        Log In
      </button>
    );
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
      <button
        className={styles.button}
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log Out
      </button>
    );
  };

  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
}

export default AuthButtons;
