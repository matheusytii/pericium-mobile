import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getIdCaso } from "../../service/casos";
import { CreateCaseDTO } from "../../interface/casoDTO";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    { label: "Vítima", path: "/vitima" },
    { label: "Evidência", path: {
      pathname: "/evidenciadocaso",
      params: { id: caso._id }
    } },
  ];

  return (
    <View className="flex-1 bg-[#F5F5F4]">
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

        <Text className="text-black font-bold text-3xl mb-3">Caso</Text>

        {/* Card com os dados do caso */}
        <View className="bg-[#F4F6F8] rounded-xl p-4 border border-[#929292]">
          <Text className="font-semibold text-base mb-1">{caso._id}</Text>
          <Text className="text-base mb-1">
            {format(new Date(caso.dataAbertura), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </Text>

          <Text className="font-bold mt-3 text-base">Título:</Text>
          <Text className="text-base">{caso.titulo}</Text>

          <Text className="font-bold mt-3 text-base">Status:</Text>
          <Text className="bg-gray-300 w-fit px-2 py-1 mt-1 rounded-md text-base">
            {caso.status}
          </Text>

          <Text className="font-bold mt-3 text-base">
            Peritos responsáveis:
          </Text>
          <View className="mt-1 space-y-1">
            <Text className="bg-gray-300 w-fit px-2 py-1 rounded-md text-base">
              {caso.userId}
            </Text>
          </View>
          <Text className="font-bold mt-3 text-base">Descrição:</Text>
          <Text className="text-base mt-1">
            {caso.descricao}
          </Text>
        </View>
      </ScrollView>
      {menuOpen && (
        <View className="absolute bottom-32 right-4 space-y-2 items-end">
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
    </View>
  );
}
