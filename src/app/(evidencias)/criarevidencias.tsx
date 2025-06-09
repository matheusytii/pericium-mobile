import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { criarEvidencia } from "../../service/evidencia";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

export default function CriarEvidenciaScreen() {
  const [title, setTitle] = useState("");
  const [dateRegister, setDateRegister] = useState<Date>(new Date());
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [descricao, setDescricao] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagem, setImagem] = useState(null);
  const { caseId } = useLocalSearchParams();

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDateRegister(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!title || !descricao || !tipo || !dateRegister) {
      setError("Preencha todos os campos obrigatoriamente");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("descricao", descricao);
      formData.append("tipo", tipo);
      formData.append("local", local);
      formData.append("dateRegister", dateRegister.toISOString());
      formData.append("caseId", caseId as string);
      formData.append("file", {
        uri: imagem,
        name: "evidencia.jpg",
        type: "image/jpeg",
      } as any);

      await criarEvidencia(formData);

      alert("Evidência criada com sucesso!");
    } catch (error) {
      setError("Erro ao criar evidência");
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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a câmera necessária!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log("Resultado da foto:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("URI da imagem tirada:", uri);
      setImagem(uri);
    } else {
      console.log("Usuário cancelou ou algo deu errado");
    }
  };

  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Logo */}
      <View className="items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">
            Pericium
          </Text>
        </View>
      </View>

      {/* Título */}
      <Text className="text-black font-bold text-xl mb-3">
        Criar a Evidência
      </Text>

      <ScrollView
        className="bg-[#D6DDE3] rounded-xl p-4 mb-4"
        contentContainerStyle={{ paddingBottom: 12 }}
        style={{ maxHeight: 460 }} // <- reduz altura total do card
      >
        {/* Imagem */}
        <View className="bg-gray-200 h-48 rounded-md mb-2 border-2 border-blue-400 items-center justify-center">
          {imagem ? (
            <Image
              source={{ uri: imagem }}
              className="w-full h-full rounded-md"
              resizeMode="cover"
            />
          ) : (
            <View className="items-center">
              <Ionicons name="image-outline" size={48} color="#888" />
              <Text className="text-gray-600">Nenhuma imagem selecionada</Text>
            </View>
          )}
        </View>

        {imagem && (
          <Text className="text-green-700 mb-4 text-center">
            📎 Imagem anexada com sucesso
          </Text>
        )}

        {/* Título */}
        <Text className="font-bold text-sm">
          Título<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          placeholder="Escreva aqui"
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-bold mt-2">
          Data de registro<Text className="text-red-600">*</Text>
        </Text>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="bg-white rounded-md px-2 py-2 mt-1"
        >
          <Text>{dateRegister.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={dateRegister}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}

        <Text className="font-bold text-sm">
          Tipo<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          placeholder="Escreva aqui"
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={tipo}
          onChangeText={setTipo}
        />

        {/* Local */}
        <Text className="font-bold text-sm">
          Local<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          placeholder="Escreva aqui"
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={local}
          onChangeText={setLocal}
        />

        {/* Descrição */}
        <Text className="font-bold text-sm">
          Descrição<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          placeholder="Escreva aqui"
          multiline
          numberOfLines={4}
          className="bg-white rounded-md px-2 py-2 mt-1 mb-3 h-24 text-top"
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Botões */}
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity className="bg-[#E4E9ED] px-4 py-2 rounded-md">
            <Text className="text-gray-800">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#1B3A57] px-4 py-2 rounded-md flex-row items-center"
            onPress={() => handleSubmit()}
          >
            <Text className="text-white mr-2">Criar</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="flex-row justify-between mb-4">
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

      {/* Botão "Evidência" flutuante */}
      {mostrarBotao && (
        <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-36 right-5 z-20">
          <Text className="text-white text-sm">Evidência</Text>
        </TouchableOpacity>
      )}

      {/* Botão + */}
      <TouchableOpacity
        onPress={() => setMostrarBotao(!mostrarBotao)}
        className="bg-[#1B3A57] w-12 h-12 rounded-full items-center justify-center absolute bottom-20 right-5 z-10"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
