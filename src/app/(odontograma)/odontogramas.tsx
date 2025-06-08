import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function odontogramas() {
  const dados = [
    {
      id: "1",
      numero: "1",
      nome: "Incisivo Central",
    },
    {
      id: "2",
      numero: "9",
      nome: "Primeiro Molar",
    },
    {
      id: "3",
      numero: "2",
      nome: "Segundo Molar",
    },
    {
      id: "4",
      numero: "6",
      nome: "Canino",
    },
    {
      id: "5",
      numero: "5",
      nome: "Incisio Lateral",
    },
        {
      id: "6",
      numero: "5",
      nome: "Incisio Lateral",
    },
  ];
  return (
    <View className="flex-1 bg-gray-200">
      <Text className="text-left text-2xl font-bold ml-6 mt-8">Odontogramas</Text>
      <View className="flex-row items-center bg-gray-400 rounded-md mx-4 px-3 h-10 mt-3">
        <TextInput
          className="flex-1 h-10 px-0 text-black"
          placeholder="Buscar"
          placeholderTextColor="#000"
        />
        <View className="mr-2">
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View>
      <View className="bg-gray-400 mt-2 mx-4 p-2 rounded-md">
        <Text className="text-base font-bold text-black">ID da Vítima: </Text>
        <Text className="text-base font-bold text-black">Nome da Vítima: </Text>
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mx-4 mt-3 rounded-xl border border-[#929292]">
            <View>
              <Text className="text-base text-black">
                Número: {item.numero}
              </Text>
              <Text className="text-base font-bold text-black">
                Nome: {item.nome}
              </Text>
            </View>
            <View className="flex-row justify-end mt-3">
              <TouchableOpacity
                onPress={() => console.log("Visualizar", item.id)}
              >
                <Ionicons name="eye-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Deletar", item.id)}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="red"
                  className="ml-[256px]"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
