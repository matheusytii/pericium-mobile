import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import {
  UpdateEvidenciaDTO,
} from "../interface/evidenciaDTO";

export const criarEvidencia = async (dados: FormData) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  try {
    const response = await api.post("/evidencias/createevidence", dados, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro no Axios:",
      error.response?.data || error.message || error
    );
    throw error;
  }
};

export const getEvidencia = async (caseId: string) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.get("/evidencias/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: caseId ? { caseId } : {},
  });
  return response.data;
};

export const getEvidenciaByCaseId = async (caseId: string) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.get(`/evidencias/bycase/${caseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function getEvidenciaById(id: string) {
  return api.get(`/evidencias/${id}`).then((res) => res.data);
}

// Atualizar Evidência
export const updateEvidencia = async (
  id: string,
  data: Partial<UpdateEvidenciaDTO>
) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.patch(`/evidencias/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Deletar Evidência
export const deleteEvidencia = async (id: string) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.delete(`/evidencias/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
