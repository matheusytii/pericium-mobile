import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput as RNTextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { criarEvidencia } from "../../service/evidencia";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CriarEvidenciaScreen() {
  const [title, setTitle] = useState("");
  const [dateRegister, setDateRegister] = useState<Date>(new Date());
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("");
  const [description, setDescription] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagem, setImagem] = useState(null);
  const { caseId } = useLocalSearchParams();
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);
  const descInputRef = useRef<RNTextInput>(null);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDateRegister(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !tipo || !dateRegister) {
      setError("Preencha todos os campos obrigatoriamente");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
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
    } finally {
      setLoading(false);
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

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const scrollToDescription = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 200); // tempo para esperar o teclado aparecer
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        ref={scrollRef}
        className="flex-1 bg-white px-4 pt-12"
        contentContainerStyle={{ paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-2">
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
            <Text className="text-[#1B3A57] text-xl font-bold ml-2">
              Pericium
            </Text>
          </View>
        </View>

        <Text className="text-black font-bold text-xl mb-3">
          Criar a Evidência
        </Text>

        <View className="bg-[#D6DDE3] rounded-xl p-3 mb-4">
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
                <Text className="text-gray-600">
                  Nenhuma imagem selecionada
                </Text>
              </View>
            )}
          </View>

          {imagem && (
            <Text className="text-green-700 mb-4 text-center">
              📎 Imagem anexada com sucesso
            </Text>
          )}

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

          <Text className="font-bold text-sm mt-2">
            Tipo<Text className="text-red-600">*</Text>
          </Text>
          <TextInput
            placeholder="Escreva aqui"
            className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
            value={tipo}
            onChangeText={setTipo}
          />

          <Text className="font-bold text-sm">
            Local<Text className="text-red-600">*</Text>
          </Text>
          <TextInput
            placeholder="Escreva aqui"
            className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
            value={local}
            onChangeText={setLocal}
          />

          <Text className="font-bold text-sm">
            Descrição<Text className="text-red-600">*</Text>
          </Text>
          <TextInput
            ref={descInputRef}
            onFocus={scrollToDescription}
            placeholder="Escreva aqui"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-white rounded-md px-2 py-2 mt-1 mb-3 h-24"
            value={description}
            onChangeText={setDescription}
          />

          <View className="flex-row justify-between">
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

          <View className="flex-row justify-between mt-2">
            <TouchableOpacity
              className="bg-[#E4E9ED] px-4 py-2 rounded-md"
              onPress={() => router.back()}
            >
              <Text className="text-gray-800">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#1B3A57] px-4 py-2 rounded-md flex-row items-center"
              onPress={handleSubmit}
            >
              <Text className="text-white mr-2">Criar</Text>
              <Ionicons name="chevron-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
