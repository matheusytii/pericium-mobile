import * as ImagePicker from "expo-image-picker";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditarOdontograma() {
  const [imagem, setImagem] = useState<string | null>(null);
  const [nic, setNic] = useState("");
  const [numeroDente, setNumeroDente] = useState("");
  const [tipoDente, setTipoDente] = useState("");
  const [descricao, setDescricao] = useState("");

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da permissão para acessar suas fotos."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const cancelarEdicao = () => {
    // Reseta os campos ou navega para outra tela
    setNic("");
    setNumeroDente("");
    setTipoDente("");
    setDescricao("");
    setImagem(null);
  };

  const salvarEdicao = () => {
    // Aqui você pode colocar lógica para salvar os dados, enviar para backend, etc.
    if (!numeroDente || !tipoDente || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Odontograma editado com sucesso!");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F5F4" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="items-center mb-4 pt-10">
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
            <Text className="ml-2 text-xl font-bold text-[#1B3A57]">Pericium</Text>
          </View>
        </View>

        <Text className="text-left text-2xl font-bold ml-6 mt-8">Editar Odontograma</Text>

        <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 mx-4 relative">
          <Button title="Escolher imagem" onPress={escolherImagem} />
          {imagem && (
            <Image
              source={{ uri: imagem }}
              className="w-40 h-40 mt-4 rounded-md"
              style={{ alignSelf: "center" }}
            />
          )}

          <Text className="font-bold ml-2 mt-4">NIC</Text>
          <TextInput
            className="bg-white rounded-md px-2 py-2 mt-1"
            placeholder="Escreva aqui"
            value={nic}
            onChangeText={setNic}
            returnKeyType="done"
          />

          <Text className="font-bold ml-2 mt-4">
            Número do Dente
            <Text className="text-red-600">*</Text>
          </Text>
          <TextInput
            className="bg-white rounded-md px-2 py-2 mt-1"
            placeholder="Escreva aqui"
            value={numeroDente}
            onChangeText={setNumeroDente}
            keyboardType="numeric"
            returnKeyType="done"
          />

          <Text className="font-bold ml-2 mt-4">
            Tipo do Dente
            <Text className="text-red-600">*</Text>
          </Text>
          <TextInput
            className="bg-white rounded-md px-2 py-2 mt-1"
            placeholder="Escreva aqui"
            value={tipoDente}
            onChangeText={setTipoDente}
            returnKeyType="done"
          />

          <Text className="font-bold ml-2 mt-4">
            Descrição
            <Text className="text-red-600">*</Text>
          </Text>
          <TextInput
            className="bg-white rounded-md px-2 py-2 mt-1 h-32"
            placeholder="Escreva aqui"
            multiline
            style={{ textAlignVertical: "top" }}
            numberOfLines={6}
            value={descricao}
            onChangeText={setDescricao}
            returnKeyType="done"
          />

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center"
              onPress={cancelarEdicao}
            >
              <Text className="font-semibold text-black">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#15354B] rounded-md w-32 h-12 justify-center items-center"
              onPress={salvarEdicao}
            >
              <Text className="font-semibold text-white">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
