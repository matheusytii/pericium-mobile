import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginPayload {
    cpf: string;
    password: string
}

export const login = async (payload: LoginPayload) => {
    try{
        const response = await api.post('/auth/login', payload);
        
        const access_token  = response.data.token;
        
        if (access_token) {
            await AsyncStorage.setItem('token', access_token);
     
        }
    
        return { access_token }
    
    } catch (error: any) {
        console.error('Error no login', error);
        throw error.response?.data?.message || 'Erro ao fazer login';
    }
};