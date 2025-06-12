import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Etnia } from "../../types/etnia";
import { criarVitima } from "../../service/vitima";
import { Picker } from "@react-native-picker/picker";

export default function NovaVitima() {
  const [NIC, setNIC] = useState("");
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [documento, setDocumento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [etnia, setEtnia] = useState<Etnia | "">(""); // pode começar vazio
  const [loading, setLoading] = useState(false);

  const { caseId } = useLocalSearchParams();
  const route = useRouter();

  const handleSubmit = async () => {
    if (!nome || !genero || !documento || !endereco || !etnia) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await criarVitima({
        NIC,
        nome,
        genero,
        documento: Number(documento),
        endereco,
        etnia,
        caseId: caseId as string,
      });
      Alert.alert("Vitima criada com sucesso!");
      route.push("/vitima");
    } catch (error) {
      console.error("Erro ao criar Vitima", error);
      Alert.alert("Erro", "Não foi possível criar a vítima.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100} // ajuste se precisar subir mais a view
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-[#F5F5F4]">
          <View className="items-center mb-4 pt-10">
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
              <Text className="ml-2 text-xl font-bold text-[#1B3A57]">
                Pericium
              </Text>
            </View>
          </View>

          <Text className="text-left text-2xl font-bold ml-6 mt-8">
            Nova Vítima
          </Text>

          <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 mx-4 relative">
            <Text className="font-bold ml-2">NIC</Text>
            <TextInput
              className="bg-white rounded-md px-2 py-2 mt-1"
              placeholder="Escreva aqui"
              value={NIC}
              onChangeText={setNIC}
              returnKeyType="done"
            />
            <Text className="text-left text-sm ml-2">
              *Preencha caso a vítima esteja morta
            </Text>

            <Text className="font-bold ml-2 mt-4">
              Nome Vítima
              <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              className="bg-white rounded-md px-2 py-2 mt-1"
              placeholder="Escreva aqui"
              value={nome}
              onChangeText={setNome}
              returnKeyType="done"
            />

            <Text className="font-bold ml-2 mt-4">
              CPF
              <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              className="bg-white rounded-md px-2 py-2 mt-1"
              placeholder="Escreva aqui"
              value={documento}
              onChangeText={setDocumento}
              keyboardType="numeric"
              returnKeyType="done"
            />

            <Text className="font-bold ml-2 mt-4">
              Etnia/Raça
              <Text className="text-red-600">*</Text>
            </Text>
            <View className="bg-white rounded-md mt-1">
              <Picker
                selectedValue={etnia}
                onValueChange={(itemValue) => setEtnia(itemValue)}
              >
                <Picker.Item label="Selecione" value="" />
                {Object.values(Etnia).map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>

            <Text className="font-bold ml-2 mt-4">
              Gênero
              <Text className="text-red-600">*</Text>
            </Text>
            <View className="bg-white rounded-md mt-1">
              <Picker
                selectedValue={genero}
                onValueChange={(itemValue) => setGenero(itemValue)}
              >
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Masculino" value="MASCULINO" />
                <Picker.Item label="Feminino" value="FEMININO" />
                <Picker.Item label="Outro" value="OUTRO" />
              </Picker>
            </View>

            <Text className="font-bold ml-2 mt-4">
              Endereço
              <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              className="bg-white rounded-md px-2 py-2 mt-1"
              placeholder="Escreva aqui"
              value={endereco}
              onChangeText={setEndereco}
              returnKeyType="done"
            />

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center"
                onPress={() => route.back()}
                disabled={loading}
              >
                <Text className="font-semibold text-black">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`rounded-md w-32 h-12 justify-center items-center ${
                  loading ? "bg-gray-400" : "bg-[#15354B]"
                }`}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text className="font-semibold text-white">
                  {loading ? "Criando..." : "Criar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
