import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getEvidenciaById, updateEvidencia } from "../../service/evidencia";
import {
  buscarLaudo,
  assinarLaudo,
  criarLaudo,
  getByPdf,
} from "../../service/laudo";
import { parseJwt } from "../../types/parseJWT";
import { UpdateEvidenciaDTO } from "../../interface/evidenciaDTO";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as WebBrowser from "expo-web-browser";

interface EditarEvidenciaProps {
  evidencia?: UpdateEvidenciaDTO;
  id?: string;
}
interface visualizarLaudo {
  laudoId: string;
}

export default function EditarEvidenciaScreen({
  evidencia,
}: EditarEvidenciaProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [title, setTitle] = useState("");
  const [dateRegister, setDateRegister] = useState<Date>(new Date());
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("");
  const [peritoResponsavel, setPeritoResponsavel] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [laudoId, setLaudoId] = useState<string | null>(null);
  const [assinado, setAssinado] = useState(false);
  const [sucessoAssinatura, setSucessoAssinatura] = useState(false);
  const [evidencias, setEvidencias] = useState<UpdateEvidenciaDTO | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [editar, setEditar] = useState(false);
  const [editarTitulo, setEditarTitulo] = useState(false);
  const [editarLocal, setEditarLocal] = useState(false);
  const [editarTipo, setEditarTipo] = useState(false);
  const [editarDescricao, setEditarDescricao] = useState(false);
  const [editarData, setEditarData] = useState(false);
  const [laudoGerado, setLaudoGerado] = useState(false);
  const { id } = useLocalSearchParams();
  const route = useRouter();

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDateRegister(selectedDate);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const data = await getEvidenciaById(id as string);
        setEvidencias(data);
        setTitle(data.title || "");
        setTipo(data.tipo || "");
        setDateRegister(new Date(data.dateRegister));
        setLocal(data.local || "");
        setDescription(data.description);

        try {
          const laudo = await buscarLaudo(data._id);

          if (laudo && laudo._id) {
            setLaudoId(laudo._id);
            setLaudoGerado(true); // <-- importante!
            setSucessoAssinatura(laudo.assinado === true);
          } else {
            setLaudoGerado(false);
          }
        } catch (laudoErr: any) {
          console.log("Nenhum laudo encontrado.");
          setLaudoGerado(false);
        }
      } catch (err: any) {
        console.error("Erro ao buscar evidência:", err);
        Alert.alert(
          "Evidência não encontrada",
          err.response?.data?.message || "Erro desconhecido"
        );
      }
    };

    fetchData();
  }, [id]);

  const gerarLaudo = async (evidenciaId: string) => {
    if (!id) return null;

    try {
      await criarLaudo(evidenciaId);
      Alert.alert(
        "Laudo gerado com sucesso",
        "O laudo foi gerado com sucesso."
      );
      setLaudoGerado(true);
    } catch (error: any) {
      console.error("Erro ao gerar laudo:", error);

      let mensagem = "Erro ao gerar o laudo.";

      if (error.response?.data?.message) {
        const msg = error.response.data.message;
        mensagem = typeof msg === "string" ? msg : JSON.stringify(msg);
      }

      Alert.alert("Erro", mensagem);
    }
  };

  const handleUpdate = async () => {
    if (!id) return null;

    try {
      await updateEvidencia(id as string, {
        title,
        dateRegister: dateRegister.toISOString(),
        local,
        tipo,
        peritoResponsavel,
        description,
      });
      Alert.alert("Evidência atualizada com sucesso.");
      route.push("/evidenciadocaso");
    } catch (error) {}
  };

  useEffect(() => {
    if (evidencia) {
      async function fetchLaudo(evidenciaId: string) {
        try {
          const laudo = await buscarLaudo(evidenciaId);
          if (laudo.length > 0) {
            const primeiroLaudo = laudo[0];
            setLaudoId(primeiroLaudo._id);
            setLaudoGerado(true);

            if (primeiroLaudo.assinado === true) {
              setSucessoAssinatura(true);
            } else {
              setSucessoAssinatura(false);
            }
          } else {
            Alert.alert("Nenhum laudo encontrado para esta evidência.");
            setLaudoGerado(false);
          }
        } catch (error) {
          console.error("Erro ao buscar laudo", error);
        }
      }
      fetchLaudo(evidencia._id);
    }
  }, [evidencia]);

  const handleAssinatura = async () => {
    if (!laudoId) {
      Alert.alert("Laudo não encontrado.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    let peritoId: string | null = null;

    if (token) {
      const decoded = parseJwt(token);
      peritoId = decoded?.sub;

      if (!peritoId) {
        Alert.alert("Usuário não encontrado");
        return;
      }
    } else {
      Alert.alert("Usuário não autenticado");
      return;
    }

    if (!laudoId || !peritoId) {
      Alert.alert("Dados inválidos");
      return;
    }
    try {
      setAssinado(true);

      const response = await assinarLaudo(laudoId, peritoId);
      console.log(response);
      if (response.status === 200) {
        setSucessoAssinatura(true);
        Alert.alert("Laudo assinado com sucesso.");
      } else {
        Alert.alert("Erro ao assinar o laudo");
      }
    } catch (error) {
      Alert.alert("Não foi possível assinar o laudo.");
    } finally {
      setAssinado(true);
    }
  };

  const visualizarPdf = async (evidenciaId: string) => {
    try {
      const data = await getByPdf(evidenciaId);
      const pdfUrl = data?.pdfUrl;

      await WebBrowser.openBrowserAsync(pdfUrl);
    } catch (error) {
      console.error("Erro ao visualizar pdf", error);
      Alert.alert("Erro ao visualizar PDF");
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white pt-10 px-4">
        {/* Header */}
        <View className="items-center mb-2">
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
            <Text className="text-[#1B3A57] text-xl font-bold ml-2">
              Pericium
            </Text>
          </View>
        </View>
        <Text className="text-black font-bold text-lg mb-3 self-start">
          Detalhes da Evidência
        </Text>
        {/* Card maior */}
        <View className="bg-gray-200 rounded-xl px-4 py-8 space-y-4">
          {/* Mock da imagem */}
          <View className="w-full h-36 bg-gray-300 rounded-md items-center justify-center mb-1">
            <Text className="text-gray-600">Imagem da evidência</Text>
          </View>
          {/* Título */}
          <View>
            <View className="flex-row gap-4">
              <Text className="font-bold text-base text-black">Título</Text>
              <TouchableOpacity onPress={() => setEditarTitulo(!editarTitulo)}>
                <Ionicons
                  name="pencil"
                  size={20}
                  color={editarTitulo ? "#1B3A57" : "gray"}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              className={`rounded-md px-2 py-2 mt-1 ${
                editarTitulo ? "bg-white" : "bg-gray-300"
              }`}
              defaultValue="Faca do crime"
              value={title}
              onChangeText={setTitle}
              editable={editarTitulo}
            />
          </View>
          {/* Data */}
          <View>
            <Text className="font-bold text-base text-black">Data</Text>
            <TouchableOpacity
              onPress={() => editarData && setShowPicker(true)}
              className={`rounded-md px-2 py-2 mt-1 ${
                editarData ? "bg-white" : "bg-gray-300"
              }`}
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
          </View>
          {/* Local */}
          <View>
            <View className="flex-row gap-4">
              <Text className="font-bold text-base text-black">Local</Text>
              <TouchableOpacity onPress={() => setEditarLocal(!editarLocal)}>
                <Ionicons
                  name="pencil"
                  size={20}
                  color={editarLocal ? "#1B3A57" : "gray"}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              className={`rounded-md px-2 py-2 mt-1 ${
                editarLocal ? "bg-white" : "bg-gray-300"
              }`}
              value={local}
              onChangeText={setLocal}
              editable={editarLocal}
            />
          </View>
          <View>
            <View className="flex-row gap-4">
              <Text className="font-bold text-base text-black">Tipo</Text>
              <TouchableOpacity onPress={() => setEditarTipo(!editarTipo)}>
                <Ionicons
                  name="pencil"
                  size={20}
                  color={editarTipo ? "#1B3A57" : "gray"}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              className={`rounded-md px-2 py-2 mt-1 ${
                editarTipo ? "bg-white" : "bg-gray-300"
              }`}
              value={tipo}
              onChangeText={setTipo}
              editable={editarTipo}
            />
          </View>
          {/* Descrição */}
          <View>
            <View className="flex-row gap-4">
              <Text className="font-bold text-base text-black">Descrição</Text>
              <TouchableOpacity
                onPress={() => setEditarDescricao(!editarDescricao)}
              >
                <Ionicons
                  name="pencil"
                  size={20}
                  color={editarDescricao ? "#1B3A57" : "gray"}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              className={`rounded-md px-2 h-20 py-2 mt-1 ${
                editarDescricao ? "bg-white" : "bg-gray-300"
              }`}
              multiline
              value={description}
              onChangeText={setDescription}
              editable={editarDescricao}
            />
          </View>
          <View>
            <Text className="font-bold text-base text-black">
              Perito Responsável
            </Text>
            <TextInput
              className={`rounded-md px-2 py-2 mt-1 ${
                editar ? "bg-white" : "bg-gray-300"
              }`}
              value={peritoResponsavel}
              onChangeText={setPeritoResponsavel}
            />
          </View>
        </View>
        {/* Botões inferiores */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="bg-gray-300 px-4 py-2 rounded-md"
            onPress={() => route.back()}
          >
            <Text className="text-black font-medium">◀ Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#1B3A57] px-4 py-2 rounded-md"
            onPress={() => {
              setModalVisivel(true);
            }}
          >
            <Text className="text-white font-medium">Confirmar ▶</Text>
          </TouchableOpacity>
        </View>
        {/* Modal de confirmação */}
        <Modal
          visible={modalVisivel}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisivel(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50 px-4 z-50">
            <View className="bg-white p-5 rounded-xl w-full max-w-sm items-center">
              <Text className="text-lg font-bold text-center mb-5">
                Deseja fazer essa edição?
              </Text>
              <View className="flex-row justify-between w-full">
                <TouchableOpacity
                  className="border border-gray-400 px-5 py-2 rounded-md flex-row items-center"
                  onPress={() => setModalVisivel(false)}
                >
                  <Ionicons name="chevron-back" size={16} color="black" />
                  <Text className="text-black ml-1">Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#1B3A57] px-5 py-2 rounded-md flex-row items-center"
                  onPress={() => {
                    setModalVisivel(false);
                    handleUpdate();
                  }}
                >
                  <Text className="text-white mr-1">Sim</Text>
                  <Ionicons name="chevron-forward" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Menu flutuante do botão + */}
        {menuAberto && (
          <View className="absolute right-5 bottom-44 z-20 w-32 gap-2">
            <TouchableOpacity
              className={`px-3 py-2 rounded-md shadow items-center ${
                laudoGerado ? "bg-gray-400" : "bg-[#1B3A57]"
              }`}
              disabled={laudoGerado}
              onPress={() => gerarLaudo(id as string)}
            >
              <Text className="text-white text-sm font-medium">
                {laudoGerado ? "Laudo Já Gerado" : "Gerar Laudo"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-2 rounded-md shadow items-center ${
                sucessoAssinatura ? "bg-gray-400" : "bg-[#1B3A57]"
              }`}
              disabled={sucessoAssinatura}
              onPress={() => handleAssinatura()}
            >
              <Text className="text-white text-sm font-medium">
                {sucessoAssinatura ? "Laudo Assinado" : "Assinar Laudo"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#1B3A57] px-3 py-2 rounded-md shadow items-center"
              onPress={() => visualizarPdf(id as string)}
            >
              <Text className="text-white text-sm font-medium">
                Fazer Download do laudo
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Botão + */}
        <TouchableOpacity
          onPress={() => setMenuAberto(!menuAberto)}
          className="bg-[#1B3A57] w-12 h-12 rounded-full items-center justify-center absolute bottom-24 right-5 z-30 shadow"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
