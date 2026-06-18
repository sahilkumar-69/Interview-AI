import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import {
  login,
  register,
  logout,
  getCurrentUser,
} from "../services/auth.api.js";

export function useAuth() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userData = await login(email, password);
      console.log(userData);
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const userData = await register(username, email, password);
      setUser(userData?.user);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchCurrentUser,
  };
}
