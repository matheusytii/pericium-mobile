// src/app/vitima.tsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getVitimaByCaseId, deleteVitima } from "../../service/vitima";
import { useRouter, useLocalSearchParams } from "expo-router";
import { createvitimaDTO } from "../../interface/vitimaDTO";

export default function Vitimas() {
  const [vitimas, setVitimas] = useState<createvitimaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const router = useRouter();
  const { id, caseTitulo } = useLocalSearchParams();

  useEffect(() => {
    const carregarVitimas = async () => {
      try {
        const dados = await getVitimaByCaseId(id as string);
        setVitimas(dados);
      } catch (error) {
        console.error("Erro ao carregar vítimas:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarVitimas();
  }, [id]);

  const handleDelete = async (vitimaId: string) => {
    Alert.alert("Confirmar", "Deseja realmente excluir esta vítima?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteVitima(vitimaId);
            setVitimas((prev) => prev.filter((v) => v._id !== vitimaId));
          } catch (error) {
            console.error("Erro ao deletar vítima:", error);
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <View className="items-center mb-3">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
        </View>
      </View>
      <Text className="text-left text-3xl font-bold ml-6 mt-8">Vítimas</Text>

      <View className="flex-row items-center bg-gray-400 rounded-md mx-4 px-3 h-12 mt-3">
        <TextInput
          className="flex-1 h-14 px-0 text-black"
          placeholder="Buscar"
          placeholderTextColor="#000"
        />
        <View className="mr-2">
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View>

      <View className="bg-gray-400 mt-2 mx-4 p-2 rounded-md">
        <Text className="text-base font-bold text-black">ID do Caso: {id}</Text>
        <Text className="text-base font-bold text-black">
          Título do Caso: {caseTitulo}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" className="mt-8" />
      ) : (
        <FlatList
          data={vitimas}
          keyExtractor={(item) => item._id!}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mx-4 mt-3 rounded-xl border border-[#929292]">
              <Text className="text-base font-bold text-black">
                Nome: {item.nome}
              </Text>
              <Text className="text-base text-black">
                CPF: {item.documento}
              </Text>
              <Text className="text-base text-black">
                Etnia/Raça: {item.etnia}
              </Text>

              <View className="flex-row justify-between mt-3">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/editarVitima",
                      params: { id: item._id },
                    })
                  }
                >
                  <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item._id!)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <View className="absolute bottom-16 right-5 items-end">
        {mostrarOpcoes && (
          <TouchableOpacity
            className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center"
            onPress={() =>
              router.push({
                pathname: "/novaVitima",
                params: { caseId: id },
              })
            }
          >
            <Text className="text-white font-medium">Nova vítima</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-[#1B3A57] w-14 h-14 rounded-full items-center justify-center"
          onPress={() => setMostrarOpcoes(!mostrarOpcoes)}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
