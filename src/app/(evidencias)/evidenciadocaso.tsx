import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UpdateEvidenciaDTO } from "../../interface/evidenciaDTO";
import { deleteEvidencia, getEvidenciaByCaseId } from "../../service/evidencia";
import { CreateCaseDTO } from "../../interface/casoDTO";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getIdCaso } from "../../service/casos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export interface visualizarLaudo {
  laudoId: string;
}

export interface CaseidProps {
  caseId: CreateCaseDTO;
}

export default function EvidenciasDoCaso() {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [evidencias, setEvidencias] = useState<UpdateEvidenciaDTO[]>([]);
  const [caso, setCaso] = useState<CreateCaseDTO>();
  const [loading, setLoading] = useState(true);
  const [selectedEvidenciaId, setSelectedEvidenciaId] = useState<string | null>(
    null
  );
  const { id } = useLocalSearchParams();
  const route = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchEvidencias = async () => {
        try {
          const [evidenciaData, casoData] = await Promise.all([
            getEvidenciaByCaseId(id as string),
            getIdCaso(id as string),
          ]);
          setEvidencias(evidenciaData);
          setCaso(casoData);
        } catch (error) {
          console.error("Erro na busca de evidências.", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvidencias();
    }, [id])
  );

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar essa evidência?")) {
      try {
        await deleteEvidencia(id);
        Alert.alert("Evidencia deletada com sucesso.");
      } catch (error) {
        console.error("erro ao deletar evidência: ", error);
        Alert.alert("Erro ao deletar evidência");
      }
    }
  };

  return (
    <View className="flex-1 bg-[#F5F5F4] px-4 pt-10">
      {/* Header */}
      <View className="items-center mb-4">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-2xl font-bold ml-2">
            Pericium
          </Text>
        </View>
      </View>

      {/* Título */}
      <Text className="text-black font-extrabold text-3xl mb-2">
        Evidências do Caso
      </Text>

      {/* Campo de busca (maior e com nova cor) */}
      <View className="bg-[#CBD5E1] rounded-lg px-4 py-3 mb-4 flex-row items-center">
        <TextInput
          placeholder="Buscar"
          className="flex-1 text-base text-black"
        />
        <Ionicons name="search" size={20} color="#1B3A57" />
      </View>

      {/* ID do caso (mais alto) */}
      <View className="bg-[#CBD5E1] px-4 py-4 rounded-md mb-3">
        <Text className="text-2xs font-bold">ID {id}</Text>
        <Text className="text-2xs text-black font-medium">
          Titulo do caso: {caso!.titulo || "Carregando..."}
        </Text>
      </View>

      {/* Lista de evidências */}
      <FlatList
        data={evidencias}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-300 rounded-lg p-3 mb-3">
            <Text className="text-black text-base font-bold">
              Título: {item.title}
            </Text>
            <Text className="text-black text-base">
              Data:{" "}
              <Text className="text-base font-medium">
                {format(new Date(item.dateRegister), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </Text>
            </Text>
            <Text className="text-black text-base">Local: {item.local}</Text>
            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={() =>
                route.push({
                  pathname: "/evidencias",
                  params: { id: item._id },
                })
              }
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#1B3A57"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botões flutuantes */}
      <View className="absolute bottom-16 right-5 items-end">
        {mostrarOpcoes && (
          <>
            <TouchableOpacity
              className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center"
              onPress={() =>
                route.push({
                  pathname: "/criarevidencias",
                  params: { caseId: id },
                })
              }
            >
              <Text className="text-white font-medium">Nova evidência</Text>
            </TouchableOpacity>
          </>
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
