import api from "./api";
import { odontogramaDTO } from "../interface/odontograma";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const criarOdontograma = async (dados: FormData) => {
  const token = await AsyncStorage.getItem("token"); // << CORRETO

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.post("/odontograma/createodontograma", dados, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);
  return response.data;
};

export const getOdontogramabyVitima = async (vitimaId: string) => {
  const token = AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.get(`/odontograma/vitima/${vitimaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
