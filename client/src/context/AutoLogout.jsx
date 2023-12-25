import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Assuming you have an AuthContext

const AutoLogout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    let logoutTimer;

    const startLogoutTimer = () => {
      logoutTimer = setTimeout(() => {
        logout(); // Call your logout function from the context
      }, 3600000); // 30 seconds in milliseconds
    };

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      startLogoutTimer();
    };

    // Start the timer initially or reset it whenever there's activity
    startLogoutTimer();

    // Reset the timer on user activity, e.g., interacting with the app
    window.addEventListener('mousemove', resetLogoutTimer);
    window.addEventListener('keypress', resetLogoutTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keypress', resetLogoutTimer);
    };
  }, [logout]);

  return null; // No UI for this component
};

export default AutoLogout;
