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

export default function Vitimas() {
  const dados = [
    {
      id: "1",
      cpf: "123.456.789-00",
      nome: "João da Silva",
      etnia: "Parda",
      idade: 32,
    },
    {
      id: "2",
      cpf: "987.654.321-00",
      nome: "Maria Oliveira",
      etnia: "Branca",
      idade: 28,
    },
    {
      id: "3",
      cpf: "111.222.333-44",
      nome: "Pedro Santos",
      etnia: "Preta",
      idade: 45,
    },
    {
      id: "4",
      cpf: "111.222.333-44",
      nome: "Pedro Santos",
      etnia: "Preta",
      idade: 45,
    },
    {
      id: "5",
      cpf: "100.222.333-44",
      nome: "Allan Vitor",
      etnia: "Preta",
      idade: 28,
    },
  ];

  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <View className="items-center mb-3">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">
            Pericium
          </Text>
        </View>
      </View>
      <Text className="text-left text-3xl font-bold ml-6 mt-8">Vítimas</Text>

      <View className="flex-row items-center bg-gray-400 rounded-md mx-4 px-3 h-12 mt-3">
        <TextInput
          className="flex-1 h-14 px-0 text-black"
          placeholder="Buscar"
          placeholderTextColor="#000"
        />
        {/* Ionicons não aceita className diretamente */}
        <View className="mr-2">
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View>

      <View className="bg-gray-400 mt-2 mx-4 p-2 rounded-md">
        <Text className="text-base font-bold text-black">ID do Caso: </Text>
        <Text className="text-base font-bold text-black">Título do Caso: </Text>
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mx-4 mt-3 rounded-xl border border-[#929292]">
            <View>
              <Text className="text-base font-bold text-black">
                Nome: {item.nome}
              </Text>
              <Text className="text-base text-black">CPF: {item.cpf}</Text>
              <Text className="text-base text-black">
                Etnia/Raça: {item.etnia}
              </Text>
              <Text className="text-base text-black">Idade: {item.idade}</Text>
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
                  className="ml-[278px]"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
