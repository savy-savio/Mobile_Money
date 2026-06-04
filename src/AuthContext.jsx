import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';

const AuthContext = createContext(null);

// Helper function to decode token safely
const decodeToken = (token) => {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    return JSON.parse(atob(parts[1]));
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// Helper function to check if token is expired
const isTokenExpired = (token) => {
  const payload = decodeToken(token);

  if (!payload?.exp) return true;

  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [loginToken, setLoginToken] = useState(() => localStorage.getItem('loginToken'));
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);

  // Clear any existing auto logout timer
  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearLogoutTimer();

    setUserId(null);
    setLoginToken(null);

    localStorage.removeItem('userId');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userProfile');

    navigate('/login', { replace: true });
  }, [clearLogoutTimer, navigate]);

  // Sync userId to localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  // Schedule automatic logout based on token expiry
  const scheduleAutoLogout = useCallback(
    (token) => {
      const payload = decodeToken(token);

      if (!payload?.exp) {
        logout();
        return;
      }

      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = (payload.exp - currentTime) * 1000;

      if (timeUntilExpiry <= 0) {
        logout();
        return;
      }

      clearLogoutTimer();

      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, timeUntilExpiry);
    },
    [clearLogoutTimer, logout]
  );

  // Sync token to localStorage and schedule logout
  useEffect(() => {
    if (loginToken) {
      if (isTokenExpired(loginToken)) {
        logout();
        return;
      }

      localStorage.setItem('loginToken', loginToken);
      scheduleAutoLogout(loginToken);
    } else {
      localStorage.removeItem('loginToken');
      clearLogoutTimer();
    }
  }, [loginToken, logout, scheduleAutoLogout, clearLogoutTimer]);

  // Run token validation on first load
  useEffect(() => {
    if (loginToken) {
      if (isTokenExpired(loginToken)) {
        logout();
      } else {
        scheduleAutoLogout(loginToken);
      }
    }

    return () => {
      clearLogoutTimer();
    };
  }, [loginToken, logout, scheduleAutoLogout, clearLogoutTimer]);

  const value = useMemo(
    () => ({
      userId,
      loginToken,
      setUserId,
      setLoginToken,
      logout,
      isAuthenticated: !!loginToken && !isTokenExpired(loginToken),
    }),
    [userId, loginToken, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
