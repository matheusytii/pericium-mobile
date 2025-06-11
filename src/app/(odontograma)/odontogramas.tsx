import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { odontogramaDTO } from "../../interface/odontograma";
import { getOdontogramabyVitima } from "../../service/odontograma";
import { getVitimaById } from "../../service/vitima";
export default function odontogramas() {
  const [odontogramas, setOdontogramas] = useState<odontogramaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [vitimas, setVitimas] = useState("");


  const router = useRouter();
  const { idVitimas, vitimasNome } = useLocalSearchParams();

  console.log("id", idVitimas, "nome da vitima", vitimasNome);

  useEffect(() => {
    if (!idVitimas) {
      return;
    }
    const fetchEvidencias = async () => {
      try {
        const [odontogramaData, vitimaData] = await Promise.all([
          getOdontogramabyVitima(idVitimas as string),
          getVitimaById(idVitimas as string),
        ]);
        setOdontogramas(odontogramaData);
        setVitimas(vitimaData);
      } catch (error) {
        console.error("Erro na busca de evidências.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidencias();
  }, [idVitimas]);

  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <View className="items-center mb-4">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="ml-2 text-xl font-bold text-[#1B3A57]">
            Pericium
          </Text>
        </View>
      </View>
      <Text className="text-left text-2xl font-bold ml-6 mt-8">
        Odontogramas
      </Text>
      <View className="flex-row items-center bg-gray-400 rounded-md mx-4 px-3 h-10 mt-3">
        <TextInput
          className="flex-1 h-10 px-0 text-black"
          placeholder="Buscar"
          placeholderTextColor="#000"
        />
        <View className="mr-2">
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View>
      <View className="bg-gray-400 mt-2 mx-4 p-2 rounded-md">
        <Text className="text-base font-bold text-black">
          ID da Vítima: {idVitimas}
        </Text>
        <Text className="text-base font-bold text-black">
          Nome da Vítima: {vitimasNome}
        </Text>
      </View>
      
      <FlatList
        data={odontogramas}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mx-4 mt-3 rounded-xl border border-[#929292]">
            <View>
              <Text className="text-base text-black">
                Número do dente: {item.dentes}
              </Text>
              <Text className="text-base font-bold text-black">
                Tipo do dente: {item.tipodente}
              </Text>
            </View>
            <View className="flex-row justify-end mt-3">
              <TouchableOpacity
                onPress={() => console.log("Visualizar", item._id)}
              >
                <Ionicons name="eye-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Deletar", item._id)}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="red"
                  className="ml-[256px]"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View className="absolute bottom-16 right-5 items-end">
        {mostrarOpcoes && (
          <TouchableOpacity
            className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center"
            onPress={() =>
              router.push({
                pathname: "/novoOdontograma",
                params: { id: idVitimas },
              })
            }
          >
            <Text className="text-white font-medium">Odontogramas</Text>
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
