import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const handlesubmit = async () => {
    setError("");

    try {
      const { access_token, user } = await login( cpf, password );
      if (access_token !== null && access_token !== undefined) {
        Alert.alert(`Seja bem vindo ${user.name}`)
        router.push("/casospericiais");
      } else {
        setError("Usuário ou senha inválidos.");
        Alert.alert("Erro", "Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("❌ Erro no login:", error);
      
      Alert.alert("Erro", "Erro ao fazer login");
    }
  };

  return (
    <View className="bg-periciumWhite flex-1 justify-center ">
      <View className="items-center justify-center">
        <Text className="text-center text-3xl font-bold p-3">Login</Text>
        <Text className="text-center text-xs">Faça o login para poder</Text>
        <Text className="text-center text-xs">acessar o sistema</Text>
        <View className="w-full m-10">
          <Text className="pl-6 pb-1 pt-2 text-sm font-bold text-periciumBlack">
            CPF
          </Text>

          <TextInput
            className="bg-[#EFEFEF] rounded-md pl-3 h-10 ml-4 mr-4"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
          <Text className="pl-6 pb-1 pt-2 text-sm font-bold text-periciumBlack">
            Senha
          </Text>
          <TextInput
            className="bg-[#EFEFEF] rounded-md pl-3 h-10 ml-4 mr-4"
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="mt-5 bg-periciumBlueDark rounded-lg mx-4 h-12 justify-center"
            onPress={handlesubmit}
          >
            <Text className="text-center text-white font-bold">Entrar</Text>
          </TouchableOpacity>
          <Text className="text-center text-periciumBlack pt-4">
            Esqueci a senha
          </Text>
        </View>
      </View>
    </View>
  );
}
