import { createContext, useState, useContext, useEffect, useCallback } from "react";

const AuthContext = createContext();
const URL = import.meta.env.VITE_BASE_SERVER_URL;

export const AuthProvider = ({ children }) => {
  const [authIsLoading, setAuthIsLoading] = useState(true);
  const [authData, setAuthData] = useState(null);
  const [authError, setAuthError] = useState(null);

  const normalizeUserData = (user) => {
    if (!user) return null;
    return {
      ...user,
      _id: user._id,
      name: user.name || "",
      surname: user.surname || "",
      avatar: user.avatar || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg?w=360",
      fullName: `${user.name} ${user.surname}`.trim()
    };
  };

  const clearError = useCallback(() => setAuthError(null), []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await fetch(`${URL}/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) {
        localStorage.removeItem('token');
        setAuthData(null);
        return;
      }
      const data = await response.json();
      setAuthData(normalizeUserData(data));
      return data;
    } catch (error) {
      console.error("Profile fetch failed", error.message);
    } finally {
      setAuthIsLoading(false);
    }
  };

  const loginAndGetToken = async (body) => {
    setAuthError(null);
    setAuthIsLoading(true);
    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        await getProfile();
      }
      return data;
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthData(null);
    setAuthError(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await getProfile();
      } else {
        setAuthIsLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authIsLoading, authData, authError, clearError, getProfile, loginAndGetToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);