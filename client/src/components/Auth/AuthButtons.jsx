import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AuthButtons() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    );
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
      <button
        style={{
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
        className="btn btn-danger btn-block"
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
