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

export default function novaVitima() {
  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <Text className="text-left text-2xl font-bold ml-6 mt-8">
        Nova Vítima
      </Text>
      <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 relative ml-4 mr-4">
        <Text className="font-bold ml-2">NIC</Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="text-left text-sm ml-2">
          *Preencha caso a vítima esteja morta
        </Text>
        <Text className="font-bold ml-2 mt-2">
          Nova vítima
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          CPF
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          Etnia/Raça
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          Sexo
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          Idade
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          Endereço
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
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
