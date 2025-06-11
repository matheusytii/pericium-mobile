import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { criarOdontograma } from "../../service/odontograma";

export default function novoOdontograma() {
  const [imagem, setImagem] = useState(null);
  const [dente, setDente] = useState("");
  const [tipoDente, setTipoDente] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const route = useRouter();

  const handleSubmit = async () => {
    if (!dente || !tipoDente || !observacoes) {
      setError("Preencha todos os campos obrigatoriamente");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("dentes", dente);
      formData.append("tipodente", tipoDente);
      formData.append("observacoes", observacoes);
      formData.append("vitimaId", id as string);
      if (imagem) {
        formData.append("file", {
          uri: imagem,
          name: "evidencia.jpg",
          type: "image/jpeg",
        } as any);
      }
      console.log(formData);
      await criarOdontograma(formData);
      alert("Odontograma criado com sucesso!");
      route.push("/odontogramas");
    } catch (error) {
      setError("Erro ao criar Odontograma");
      console.error(error);
    }
  };

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const { status, canAskAgain } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a câmera necessária!");
      return;
    }
    if (!canAskAgain) {
      alert("Vá até as configurações do app e ative a permissão da câmera.");
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImagem(uri);
    } else {
    }
  };

  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <Text className="text-left text-2xl font-bold ml-6 mt-8">
        Novo Odontograma
      </Text>
      <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 relative ml-4 mr-4">
        <View className="bg-gray-200 h-48 rounded-md mb-2 border-2 border-blue-400 items-center justify-center">
          {imagem ? (
            <Image
              source={{ uri: imagem }}
              className="w-full h-full rounded-md"
              resizeMode="cover"
            />
          ) : (
            <View className="items-center">
              <Ionicons name="image-outline" size={40} color="#888" />
              <Text className="text-gray-600">Nenhuma imagem selecionada</Text>
            </View>
          )}
        </View>

        {imagem && (
          <Text className="text-green-700 mb-4 text-center">
            📎 Imagem anexada com sucesso
          </Text>
        )}
        <Text className="font-bold ml-2 mt-2">
          Número do Dente
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
          value={dente}
          onChangeText={setDente}
        />
        <Text className="font-bold ml-2 mt-2">
          Tipo do Dente
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2"
          placeholder="Escreva aqui"
          value={tipoDente}
          onChangeText={setTipoDente}
        />
        <Text className="font-bold ml-2 mt-2">
          Descrição
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1 h-32"
          placeholder="Escreva aqui"
          multiline
          style={{ textAlignVertical: "top" }}
          numberOfLines={6}
          value={observacoes}
          onChangeText={setObservacoes}
        />
        <View className="flex-row justify-between mt-5">
          <TouchableOpacity
            onPress={escolherImagem}
            className="bg-[#1B3A57] px-3 py-2 rounded-md"
          >
            <Text className="text-white">Adicionar Imagem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={tirarFoto}
            className="bg-[#1B3A57] px-3 py-2 rounded-md"
          >
            <Text className="text-white">Tirar Foto</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center" onPress={() => route.back()}>
            <Text
              className="font-semibold text-black"

            >
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#15354B] rounded-md w-32 h-12 justify-center items-center"onPress={() => handleSubmit()}>
            <Text
              className="font-semibold text-white"
            >
              Criar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
