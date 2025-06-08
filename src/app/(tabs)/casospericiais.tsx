import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const casos = [
  {
    id: "0111111",
    data: "19/05/25",
    titulo: "Allan foi assaltado",
    status: "Em andamento",
  },
  {
    id: "0111111",
    data: "19/05/25",
    titulo: "Allan está sem celular",
    status: "Em andamento",
  },
  {
    id: "0111111",
    data: "19/05/25",
    titulo: "Allan está triste",
    status: "Em andamento",
  },
  {
    id: "0111111",
    data: "19/05/25",
    titulo: "Allan se matou",
    status: "Em andamento",
  },
];

export default function CasosPericiais() {
  const [showNovo, setShowNovo] = useState(false);
  const [periodoSelecionado, setPeriodoSelecionado] = useState<
    "mes" | "semana" | "dia"
  >("mes");
  const router = useRouter();

  return (
    <View className="flex-1 bg-white pt-12 px-4 relative">
      {/* Cabeçalho com logo fake */}
      <View className="items-center mb-3">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">
            Pericium
          </Text>
        </View>
      </View>

      {/* Título */}
      <Text className="text-black font-bold text-xl mb-3">Casos Periciais</Text>

      {/* Barra de busca */}
      <View className="flex-row items-center bg-[#C2CDD6] rounded-md px-3 py-2 mb-3">
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#333"
          className="flex-1 text-base text-black"
        />
        <Ionicons name="search" size={18} color="#1B3A57" />
      </View>

      {/* Botões Mês, Semana, Dia */}
      <View className="flex-row justify-between mb-4">
        {["mes", "semana", "dia"].map((periodo) => (
          <TouchableOpacity
            key={periodo}
            onPress={() =>
              setPeriodoSelecionado(periodo as "mes" | "semana" | "dia")
            }
            className={`flex-1 mx-1 py-2 rounded-md items-center ${
              periodoSelecionado === periodo ? "bg-[#1B3A57]" : "bg-[#C2CDD6]"
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                periodoSelecionado === periodo ? "text-white" : "text-black"
              }`}
            >
              {periodo === "mes"
                ? "Mês"
                : periodo === "semana"
                ? "Semana"
                : "Dia"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {casos.map((caso, index) => (
          <View
            key={index}
            className="bg-[#D6DDE3] rounded-xl p-4 mb-4 relative border border-[#929292]"
          >
            <Text className="font-bold text-base">ID {caso.id}</Text>
            <Text className="text-base">Data: {caso.data}</Text>
            <Text className="text-base font-semibold">
              Título: {caso.titulo}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-base">Status:</Text>
              <Text className="ml-2 px-2 py-0.5 text-sm bg-white rounded">
                {caso.status}
              </Text>
            </View>
            <View className="flex-row justify-end mt-3">
              <TouchableOpacity
                onPress={() => console.log("Visualizar", caso.id)}
              >
                <Ionicons name="eye-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Deletar", caso.id)}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="red"
                  className="ml-[258px]"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {showNovo && (
        <TouchableOpacity
          className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-24 right-4 z-20"
          onPress={() => router.push("/novocaso")}
        >
          <Text className="text-white text-base">Novo Caso</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => setShowNovo(!showNovo)}
        className="bg-[#1B3A57] w-12 h-12 rounded-full items-center justify-center absolute bottom-10 right-4 z-10"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
