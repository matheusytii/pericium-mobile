"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { login as loginService } from "../service/auth";
import api from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Role } from "../types/role";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  cpf: string;
}
interface LoginResponse {
  access_token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (cpf: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setLoading(false);
        } else {
          api
            .get("/auth/me")
            .then((res) => {
            
              setUser(res.data);
              AsyncStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch(() => logout())
            .finally(() => setLoading(false));
        }
      } else {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const login = async (cpf: string, password: string): Promise<LoginResponse> => {
    try {
      const { access_token } = await loginService({ cpf, password });

      await AsyncStorage.setItem("token", access_token);

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const response = await api.get("/auth/me");

     await AsyncStorage.setItem("user", JSON.stringify(response.data));

      setUser(response.data);
      router.push("/casospericiais");

      return {access_token, user: response.data}
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
