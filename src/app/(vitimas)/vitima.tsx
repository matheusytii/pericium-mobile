import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVitimaByCaseId, deleteVitima } from "../../service/vitima";

interface Vitima {
  id: string;
  nome: string;
  documento: number;
  etnia: "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA";
  // Adicione outros campos se houver
}

export default function Vitimas() {
  const [vitimas, setVitimas] = useState<Vitima[]>([]);
  const [loading, setLoading] = useState(true);
  const [caseId, setCaseId] = useState("123"); // Substitua por caseId real

  useEffect(() => {
    const carregarVitimas = async () => {
      try {
        const dados = await getVitimaByCaseId(caseId);
        setVitimas(dados);
      } catch (error) {
        console.error("Erro ao carregar vítimas:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarVitimas();
  }, [caseId]);

  const handleDelete = async (id: string) => {
    try {
      await deleteVitima(id);
      setVitimas((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Erro ao deletar vítima:", error);
    }
  };


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
        <View className="mr-2">
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View>

      <View className="bg-gray-400 mt-2 mx-4 p-2 rounded-md">
        <Text className="text-base font-bold text-black">ID do Caso: {caseId}</Text>
        <Text className="text-base font-bold text-black">Título do Caso: Caso Exemplo</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" className="mt-8" />
      ) : (
        <FlatList
          data={vitimas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mx-4 mt-3 rounded-xl border border-[#929292]">
              <Text className="text-base font-bold text-black">Nome: {item.nome}</Text>
              <Text className="text-base text-black">CPF: {item.documento}</Text>
              <Text className="text-base text-black">Etnia/Raça: {item.etnia}</Text>

              <View className="flex-row justify-between mt-3">
                <TouchableOpacity onPress={() => console.log("Visualizar", item.id)}>
                  <Ionicons name="eye-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>

            </View>
          )}
        />
      )}
    </View>
  );
}
