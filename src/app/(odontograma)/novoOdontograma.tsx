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

export default function novoOdontograma() {
  const [imagem, setImagem] = useState(null);

  const escolherImagem = async () => {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da permissão para acessar suas fotos."
      );
      return;
    }

    // Abre a galeria
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };
  return (
    <View className="flex-1 bg-[#F5F5F4]">
      <Text className="text-left text-2xl font-bold ml-6 mt-8">
        Novo Odontograma
      </Text>
      <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 relative ml-4 mr-4">
        <Button title="Escolher imagem" onPress={escolherImagem} />

        {imagem && (
          <Image
            source={{ uri: imagem }}
            className="w-40 h-40 mt-4 rounded-md"
          />
        )}
        <Text className="font-bold ml-2">NIC</Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          Número do Dente
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
        />
        <Text className="font-bold ml-2 mt-2">
          Tipo do Dente
          <Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2"
          placeholder="Escreva aqui"
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
        />
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center">
            <Text className="font-semibold text-black">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#15354B] rounded-md w-32 h-12 justify-center items-center">
            <Text className="font-semibold text-white">Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
