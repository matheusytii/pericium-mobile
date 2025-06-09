import api from "./api";
import { CreateLaudoDTO } from "../interface/laudoDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const criarLaudo =  async (dados: CreateLaudoDTO) => {
    const token = await AsyncStorage.getItem("token");

        if (!token) {
            throw new Error("Token JWT não encontrado.");
          }

          
          const response = await api.post("/laudos/createreport", dados, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
          return response.data;
    
}

export const assinarLaudo = async (laudoId: string, peritoId: string) => {

    return api.patch(`/laudos/sign/${laudoId}`,
        { peritoId }
    )
}

export const buscarLaudo = async (evidenciaId: string) => {
    const response = await api.get(`/laudos/evidence/${evidenciaId}`);
    return response.data;
}

export const getByPdf = async (laudoId: string) => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await api.get(`/laudos/pdf/${laudoId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data
}