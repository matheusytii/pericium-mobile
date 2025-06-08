import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-gray-400">
      <View className="mt-[190px] justify-center items-center">
        <Text className="text-4xl font-bold pb-2 text-center">Login</Text>
        <Text className="text-base text-center">Faça o login para poder</Text>
        <Text className="text-base text-center">acessar o sistema</Text>

        <View className="w-full mt-5">
          <Text className="pl-6 pb-1 pt-2 text-sm font-bold text-black">
            CPF
          </Text>
          <TextInput
            className="bg-gray-200 rounded px-3 h-10 mx-4 text-black"
            placeholder="Digite seu CPF"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />

          <Text className="pl-6 pb-1 pt-3 text-sm font-bold text-black">
            Senha
          </Text>
          <View className="flex-row items-center mx-4 bg-gray-200 rounded h-10">
            <TextInput
              className="flex-1 px-2 text-black"
              placeholder="Digite sua senha"
              placeholderTextColor="#000"
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mt-5 bg-periciumBlueDark rounded-lg mx-4 h-12 justify-center"
            onPress={() => router.push("/casospericiais")}
          >
            <Text className="text-center text-white font-bold">Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-center text-black pt-4">Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
