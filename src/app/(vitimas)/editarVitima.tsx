// src/app/editarVitima.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardTypeOptions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { updateVitima, getVitimaByCaseId } from "../../service/vitima";
import { createvitimaDTO } from "../../interface/vitimaDTO";

export default function EditarVitima() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState<Partial<createvitimaDTO>>({});

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const vitimas = await getVitimaByCaseId(""); // Atualizar se necessário
        const vitima = vitimas.find((v: createvitimaDTO) => v._id === id);
        if (vitima) setFormData(vitima);
      } catch (error) {
        console.error("Erro ao carregar vítima:", error);
      }
    };
    carregarDados();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateVitima(id as string, formData);
      Alert.alert("Sucesso", "Vítima atualizada com sucesso.");
      router.back();
    } catch (error) {
      console.error("Erro ao atualizar vítima:", error);
      Alert.alert("Erro", "Não foi possível atualizar a vítima.");
    }
  };

  const handleChange = (key: keyof createvitimaDTO, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <ScrollView className="flex-1 bg-[#F5F5F4]">
      <View className="items-center mb-3 mt-3">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      <Text className="text-left text-2xl font-bold ml-6 mt-2">
        Editar Vítima
      </Text>

      <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 mx-4">
        {[
          { label: "NIC", key: "NIC" },
          { label: "Nome", key: "nome" },
          { label: "CPF", key: "documento", keyboardType: "numeric" as KeyboardTypeOptions },
          { label: "Etnia/Raça", key: "etnia" },
          { label: "Sexo", key: "genero" },
          { label: "Endereço", key: "endereco" },
        ].map(({ label, key, keyboardType }) => (
          <View key={key} className="mb-3">
            <Text className="font-bold ml-2">{label}</Text>
            <TextInput
              className="bg-white rounded-md px-2 py-2 mt-1"
              placeholder="Escreva aqui"
              value={String(formData[key as keyof createvitimaDTO] || "")}
              onChangeText={(value) => handleChange(key as any, value)}
              keyboardType={keyboardType ?? "default"}
            />
          </View>
        ))}

        <View className="flex-row justify-between mt-6">
          <TouchableOpacity
            className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center"
            onPress={() => router.back()}
          >
            <Text className="font-semibold text-black">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#15354B] rounded-md w-32 h-12 justify-center items-center"
            onPress={handleUpdate}
          >
            <Text className="font-semibold text-white">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
