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

export default function infoOdontograma() {
  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <Text className="text-left text-2xl font-bold ml-6 mt-8">
        Odontograma
      </Text>
      <View className="bg-[#D6DDE3] rounded-xl p-4 mt-4 mb-4 relative ml-4 mr-4 border border-[#929292]">
        <Text className="text-base font-semibold">ID: 0111111</Text>
        <Text className="text-base font-semibold mt-2">Imagem:</Text>
        <Text>Haverá uma imagem...</Text>
        <Text className="text-base font-semibold mt-2">Nome:</Text>
        <Text>Incisivo Central</Text>
        <Text className="text-base font-semibold mt-2">Número:</Text>
        <Text>6</Text>
        <Text className="text-base font-semibold mt-2">Descrição:</Text>
        <Text>
          Apresenta-se íntegro, com cor compatível com os demais dentes
          adjacentes, sem evidência de fraturas coronárias ou radiculares. Não
          há presença de lesões cariosas ou restaurações visíveis. A estrutura
          coronária apresenta contorno anatômico preservado, com leve desgaste
          incisal compatível com a idade do indivíduo. Gengiva adjacente
          normocorada e sem sinais de inflamação. Mobilidade ausente à palpação
          digital e teste de percussão negativo para dor.
        </Text>
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
