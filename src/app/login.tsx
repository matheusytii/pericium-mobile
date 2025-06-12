import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { formatCPF } from "../types/cpf";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handlesubmit = async () => {
    setError("");

    try {
      const { access_token, user } = await login(cpf, password);
      if (access_token !== null && access_token !== undefined) {
        Alert.alert(`Seja bem vindo ${user.name}`);
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
    <View className="bg-periciumWhite flex-1 justify-center">
      <View className="items-center justify-center">
        <Text className="text-center text-5xl font-bold p-3">Login</Text>
        <Text className="text-center text-base">Faça o login para poder</Text>
        <Text className="text-center text-base">acessar o sistema</Text>

        <View className="w-full m-8">
          <Text className="pl-6 pb-1 pt-2 text-base font-bold text-periciumBlack">
            CPF
          </Text>
          <TextInput
            className="bg-[#EFEFEF] rounded-lg px-3 h-14 mx-4 text-base text-black"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            value={formatCPF(cpf)}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, "");
              setCpf(cleaned);
            }}
          />

          <Text className="pl-6 pb-1 pt-4 text-base font-bold text-periciumBlack">
            Senha
          </Text>
          <View className="flex-row items-center bg-[#EFEFEF] rounded-lg mx-4 h-14 px-3">
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="Digite sua senha"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mt-5 bg-periciumBlueDark rounded-lg mx-4 h-12 justify-center"
            onPress={handlesubmit}
          >
            <Text className="text-center text-white font-bold text-base">
              Entrar
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-periciumBlack pt-4">
            Esqueci a senha
          </Text>
        </View>
      </View>
    </View>
  );
}
