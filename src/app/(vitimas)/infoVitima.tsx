import { useState } from "react";
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

export default function infoVitima() {
  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <Text className="text-left text-2xl font-bold ml-6 mt-8">Vítima</Text>
      <View className="bg-[#D6DDE3] rounded-xl p-4 mt-4 mb-4 relative ml-4 mr-4 border border-[#929292]">
        <Text className="text-base font-semibold">ID: 0111111</Text>
        <Text className="text-base font-semibold mt-2">NIC:</Text>
        <Text>Não informado</Text>
        <Text className="text-base font-semibold mt-2">Nome da Vítima</Text>
        <Text>Allan Vitor Marques dos Santos Almeida</Text>
        <Text className="text-base font-semibold mt-2">CPF:</Text>
        <Text>789.456.123-02</Text>
        <Text className="text-base font-semibold mt-2">Etnia/Raça:</Text>
        <Text>Índio</Text>
        <Text className="text-base font-semibold mt-2">Gênero:</Text>
        <Text>Masculino</Text>
        <Text className="text-base font-semibold mt-2">Idade:</Text>
        <Text>28 anos</Text>
        <Text className="text-base font-semibold mt-2">Endereço:</Text>
        <Text>Rua Rio Grande do Norte</Text>
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center">
            <Text className="font-semibold text-black">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#15354B] rounded-md w-32 h-12 justify-center items-center">
            <Text className="font-semibold text-white">Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
