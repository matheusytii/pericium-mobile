import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { criarCaso } from "../../service/casos";
import { parseJwt } from "../../types/parseJWT";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Status } from "../../types/status";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Router, useRouter } from "expo-router";

export default function CreateCaseScreen() {
  const [titulo, setTitulo] = useState("");
  const [status, setStatus] = useState<Status>("PENDENTE");
  const [dataAbertura, setDataAbertura] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter()
  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDataAbertura(selectedDate);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }
    const decoded = parseJwt(token);
    const userId = decoded?.sub;

    try {
      await criarCaso({
        titulo,
        descricao,
        status,
        dataAbertura: dataAbertura.toISOString(),
        userId,
      });
      Alert.alert("Caso criado com sucesso!");
      route.push("/casospericiais")
    } catch (error) {
      console.error("Erro ao criar caso:", error);
      Alert.alert("Erro", "Não foi possível criar o caso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F4F6F8] pt-12 px-4">
      <Text className="text-lg font-bold mb-2">Novo Caso</Text>

      <View className="bg-[#D6DDE3] rounded-xl p-4">
        {/* Título */}
        <Text className="font-bold mt-2">
          Título<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Status */}
        <Text className="font-bold mt-2">
          Status<Text className="text-red-600">*</Text>
        </Text>
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value as Status)}
        >
          <Picker.Item label="Pendente" value="PENDENTE" />
        </Picker>
        {/* Data */}
        <Text className="font-bold mt-2">
          Data de abertura<Text className="text-red-600">*</Text>
        </Text>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="bg-white rounded-md px-2 py-2 mt-1"
        >
          <Text>{dataAbertura.toLocaleDateString()}</Text>
        </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={dataAbertura}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

        {/* Descrição */}
        <Text className="font-bold mt-2">
          Descrição<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1 h-24 text-top"
          placeholder="Escreva aqui"
          multiline
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Botões */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity className="bg-[#E4E9ED] px-5 py-2 rounded-md">
            <Text className="text-gray-800">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#1B3A57] px-5 py-2 rounded-md flex-row items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white mr-1">Criar</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
