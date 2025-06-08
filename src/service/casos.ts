  import api from "../service/api";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { CreateCaseDTO } from "../interface/casoDTO";
  
  export const criarCaso = async (dados: CreateCaseDTO) => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }
    
    const payload = {
      ...dados,
      dataAbertura: new Date (dados.dataAbertura).toISOString(), // <-- conversão aqui
    };
    
    console.log("Dados enviados ao backend:", payload);
    console.log("Dados enviados ao backend:", dados); // 

    const response = await api.post("/cases/createcase", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  export const getCaso = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get("/cases/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const getIdCaso = async (id: string) => {

    if (!id) {
      throw new Error("ID do caso não foi fornecido.");
    }

    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.")
    }

    const response = await api.get(`/cases/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }
  
  export const updateCaso = async (casoId: string, casoData: any) => {
    const token = await AsyncStorage.getItem("token");
  
    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }
  
    const response = await api.put(`/cases/${casoId}`, casoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
  
  export const deleteCaso = async (casoId: string) => {
    const token = await AsyncStorage.getItem("token");
  
    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }
  
    const response = await api.delete(`/cases/${casoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };