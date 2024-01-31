// AutoLogout.js
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AutoLogout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        // No token, user is not logged in
        return;
      }

      // Decode the token to get the expiration time
      const decodedToken = jwt.decode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

      if (Date.now() >= expirationTime) {
        // Token has expired, log the user out
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [logout]);

  return null;
};

export default AutoLogout;
