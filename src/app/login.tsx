import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";


export default function Login() {
  const router = useRouter()
  return (
    <View className="bg-periciumWhite flex-1 justify-center ">
      <View className="items-center justify-center">
        <Text className="text-center text-3xl font-bold p-3">Login</Text>
        <Text className="text-center text-xs">Faça o login para poder</Text>
        <Text className="text-center text-xs">acessar o sistema</Text>
        <View className="w-full m-10">
          <Text className="pl-6 pb-1 pt-2 text-sm font-bold text-periciumBlack">CPF</Text>

          <TextInput
            className="bg-[#EFEFEF] rounded-md pl-3 h-10 ml-4 mr-4"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            />
          <Text className="pl-6 pb-1 pt-2 text-sm font-bold text-periciumBlack">Senha</Text>
          <TextInput
            className="bg-[#EFEFEF] rounded-md pl-3 h-10 ml-4 mr-4"
            placeholder="Digite sua senha"
            secureTextEntry
            />
          <TouchableOpacity className="mt-5 bg-periciumBlueDark rounded-lg mx-4 h-12 justify-center" onPress={() => router.push("/casospericiais")}>
            <Text className="text-center text-white font-bold">Entrar</Text>
          </TouchableOpacity>
          <Text className="text-center text-periciumBlack pt-4">Esqueci a senha</Text>
        </View>
      </View>
    </View>
  );
}
