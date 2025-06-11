import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createvitimaDTO } from "../interface/vitimaDTO";

export const criarVitima = async (dados: createvitimaDTO) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Token JWT não encontrado.");

  try {
    const response = await api.post("/vitimas/createvitima", dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro no Axios:", error.response?.data || error.message || error);
    throw error;
  }
};

export const getVitimaByCaseId = async (caseId: string) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado.");

  const response = await api.get(`/vitimas/bycase/${caseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getVitimaById = async (id: string) => {
  const token = await AsyncStorage.getItem("token");
  
  const response = await api.get(`/vitimas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data
}

export const updateVitima = async (id: string, data: Partial<createvitimaDTO>) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Token JWT não encontrado.");

  const response = await api.patch(`/vitimas/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteVitima = async (id: string) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Token JWT não encontrado.");

  const response = await api.delete(`/vitimas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
