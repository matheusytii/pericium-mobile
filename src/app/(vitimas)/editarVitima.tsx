import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { updateVitima, getVitimaById } from "../../service/vitima";
import { createvitimaDTO } from "../../interface/vitimaDTO";

// ... (importações inalteradas)

export default function EditarVitima() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [formData, setFormData] = useState<Partial<createvitimaDTO>>({});
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const descricaoInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const carregarDados = async () => {
      if (!id) return;
      try {
        const vitima = await getVitimaById(id as string);
        setFormData(vitima);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar os dados da vítima.");
      }
    };
    carregarDados();
  }, [id]);

  const handleChange = (key: keyof createvitimaDTO, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    if (
      !formData.nome ||
      !formData.genero ||
      !formData.documento ||
      !formData.endereco ||
      !formData.etnia
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      await updateVitima(id as string, formData);
      Alert.alert("Sucesso", "Vítima atualizada com sucesso.");
      router.back();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar a vítima.");
    } finally {
      setLoading(false);
    }
  };

  const onFocusDescricao = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F5F4" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }}
        >
          <View className="items-center mb-3 mt-3">
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
              <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
            </View>
          </View>

          <Text className="text-left text-2xl font-bold ml-2 mb-4">Editar Vítima</Text>

          <View className="bg-[#B6C0C7] rounded-xl p-4 mt-4 mb-4 mx-4">
            {[
              { label: "NIC", key: "NIC" },
              { label: "Nome", key: "nome" },
              {
                label: "CPF",
                key: "documento",
                keyboardType: "numeric" as KeyboardTypeOptions,
              },
              { label: "Etnia/Raça", key: "etnia" },
              { label: "Sexo", key: "genero" },
              { label: "Endereço", key: "endereco" },
            ].map(({ label, key, keyboardType }) => (
              <View key={key} className="mb-3">
                <Text className="font-bold ml-2">{label}</Text>
                <TextInput
                  className="bg-white rounded-md px-2 py-2 mt-1"
                  placeholder="Escreva aqui"
                  value={String(formData[key as keyof createvitimaDTO] || "")}
                  onChangeText={(value) => handleChange(key as any, value)}
                  keyboardType={keyboardType ?? "default"}
                />
              </View>
            ))}

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="rounded-md border border-[#15354B] w-32 h-12 justify-center items-center"
                onPress={() => router.back()}
                disabled={loading}
              >
                <Text className="font-semibold text-black">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`rounded-md w-32 h-12 justify-center items-center ${
                  loading ? "bg-gray-400" : "bg-[#15354B]"
                }`}
                onPress={handleUpdate}
                disabled={loading}
              >
                <Text className="font-semibold text-white">
                  {loading ? "Salvando..." : "Salvar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <View className="absolute bottom-16 right-5 items-end">
        {mostrarOpcoes && (
          <TouchableOpacity
            className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center"
            onPress={() =>
              router.push({
                pathname: "/odontogramas",
                params: { idVitimas: formData._id, vitimasNome: formData.nome },
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
    </KeyboardAvoidingView>
  );
}

