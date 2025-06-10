import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getCaso, deleteCaso } from "../../service/casos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseJwt } from "../../types/parseJWT";
import { CreateCaseDTO } from "../../interface/casoDTO";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CasosPericiais({ reloadKey }: { reloadKey: number }) {
  const [showNovo, setShowNovo] = useState(false);
  const [casos, setCasos] = useState<CreateCaseDTO[]>([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState<
    "mes" | "semana" | "dia"
  >("mes");
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const carregarCasos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const usuario = token ? parseJwt(token) : null;

      const todoscasos = await getCaso();
      if (!usuario) {
        setCasos([]);
        return;
      }
      const casosFiltrados =
        usuario.role === "ADMIN"
          ? todoscasos
          : todoscasos.filter((casos: any) => casos.userId._id === usuario.sub);
      setCasos(casosFiltrados);
    } catch (error) {
      console.error("Casos não encontrados", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpencaso = (id: string) => {
    router.push(`/caso?id=${id}`);
  };

  const handleDeleteCaso = async (casoId: string) => {
    setLoading(true);
    try {
      await deleteCaso(casoId);
      Alert.alert("Caso deletado com sucesso.");
      carregarCasos();
    } catch (error) {
      Alert.alert("Erro ao deletar caso");
    } finally {
      setLoading(false);
    }
  };

  const confirmarDeleteCaso = (casoId: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja deletar este caso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => handleDeleteCaso(casoId),
        },
      ]
    );
  };

  useEffect(() => {
    carregarCasos();
  }, [reloadKey]);

  return (
    <View className="flex-1 bg-[#F5F5F4] pt-12 px-4 relative">
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
      <Text className="text-black font-bold text-3xl mb-3">
        Casos Periciais
      </Text>
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
              className={`text-sm font-semibold ${
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
          <Pressable key={caso._id} onPress={() => handleOpencaso(caso._id || "")}>
            <View
              key={index}
              className="bg-[#D6DDE3] rounded-xl p-4 mb-4 relative border border-[#929292]"
            >
              <Text className="font-bold text-base">ID {caso._id}</Text>
              <Text className="text-base font-bold">
                Data:{" "}
                <Text className="text-base font-medium">
                  {format(
                    new Date(caso.dataAbertura),
                    "dd/MM/yyyy 'às' HH:mm",
                    { locale: ptBR }
                  )}
                </Text>
              </Text>
              <Text className="text-base font-semibold">
                Título: {caso.titulo}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-base">Status:</Text>
                <Text className="ml-2 px-2 py-0.5 text-sm bg-white rounded">
                  {caso.status}
                </Text>
              </View>
              {/* <Pressable onPress={() => confirmarDeleteCaso(caso._id || "")}>
                <Ionicons name="trash-outline" size={24} color="red" className= "ml-[278px]" />
                </Pressable> */}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {showNovo && (
        <TouchableOpacity
          className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-24 right-4 z-20"
          onPress={() => router.push("/novocaso")}
        >
          <Text className="text-white text-sm">Novo Caso</Text>
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
