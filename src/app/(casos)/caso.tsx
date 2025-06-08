import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getIdCaso } from "../../service/casos";
import { CreateCaseDTO } from "../../interface/casoDTO";
export default function CaseScreen() {
  const { id } = useLocalSearchParams();
  const [caso, setCaso] = useState<CreateCaseDTO>();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getIdCaso(id as string)
        .then(setCaso)
        .catch((err) => console.error("Erro ao buscar caso:", err));
    }
  }, [id]);

  if (!caso) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Carregando caso...</Text>
      </View>
    );
  }
  const menuOptions = [
    { label: "Relatório", path: "/relatorio" },
    { label: "Editar Caso", path: "/editar" },
    { label: "Atribuir Funcionário", path: "/atribuir-funcionario" },
    { label: "Vítima", path: "/vitima" },
    { label: "Evidência", path: "/evidencia" },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Scroll principal */}
      <ScrollView className="flex-1 px-4 pt-12 pb-36">
        {/* Cabeçalho centralizado */}
        <View className="items-center mb-4">
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
            <Text className="ml-2 text-xl font-bold text-[#1B3A57]">
              Pericium
            </Text>
          </View>
        </View>

        <Text className="text-black font-bold text-base mb-3">Caso</Text>

        {/* Card com os dados do caso */}
        <View className="bg-[#F4F6F8] rounded-xl p-4">
          <Text className="font-semibold text-sm mb-1">{caso._id}</Text>
          <Text className="text-sm mb-1">{caso.dataAbertura}</Text>
          <Text className="text-sm mb-1"></Text>

          <Text className="font-semibold mt-3 text-sm">Título:</Text>
          <Text className="text-sm">{caso.titulo}</Text>

          <Text className="font-semibold mt-3 text-sm">Status:</Text>
          <Text className="bg-gray-300 w-fit px-2 py-1 mt-1 rounded-md text-sm">
            {caso.status}
          </Text>

          <Text className="font-semibold mt-3 text-sm">
            Peritos responsáveis:
          </Text>
          <View className="mt-1 space-y-1">
            <Text className="bg-gray-300 w-fit px-2 py-1 rounded-md text-sm">
              {caso.userId}
            </Text>
          </View>
          <Text className="font-semibold mt-3 text-sm">Descrição:</Text>
          <Text className="text-sm mt-1">
            {caso.descricao}
          </Text>
        </View>
      </ScrollView>

      {/* Botões do menu flutuante, reposicionados acima do botão + */}
      {menuOpen && (
        <View className="absolute bottom-36 right-4 space-y-2 items-end">
          {menuOptions.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              className="bg-[#1B3A57] px-4 py-2 rounded-md shadow-md"
              onPress={() => {
                setMenuOpen(false);
                router.push(option.path);
              }}
            >
              <Text className="text-white text-sm">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Botão flutuante de + */}
      <TouchableOpacity
        className="absolute bottom-20 right-4 w-12 h-12 bg-[#1B3A57] rounded-full items-center justify-center shadow-lg"
        onPress={() => setMenuOpen(!menuOpen)}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Navegação inferior */}
      <View className="flex-row justify-around bg-[#E4E9ED] py-3 absolute bottom-0 left-0 right-0">
        <TouchableOpacity className="items-center">
          <Ionicons name="bar-chart" size={24} color="#333" />
          <Text className="text-xs mt-1">Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="folder-open" size={24} color="#333" />
          <Text className="text-xs mt-1">Casos</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="people" size={24} color="#333" />
          <Text className="text-xs mt-1">Funcionários</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="person-circle" size={26} color="#1B3A57" />
          <Text className="text-xs mt-1 text-[#1B3A57] font-bold">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
