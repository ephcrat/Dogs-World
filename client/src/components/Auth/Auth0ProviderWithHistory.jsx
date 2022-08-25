import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-zlz02sv5.us.auth0.com";
  const clientId = "x0bHFm7kSiDDsyVDD8L90h637KdsJPuL";
  const audience = "https://dev-zlz02sv5.us.auth0.com/api/v2/";
  const navigate = useNavigate();

  const onRedirectCallback = () => {
    navigate("../dogs", { replace: true });
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
