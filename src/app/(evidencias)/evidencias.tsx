import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarEvidenciaScreen() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <View className="flex-1 bg-white pt-10 px-4">
      {/* Header */}
      <View className="items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      <Text className="text-black font-bold text-lg mb-3 self-start">Editar a Evidência</Text>

      {/* Card maior */}
      <View className="bg-gray-200 rounded-xl px-4 py-8 space-y-4">
        {/* Mock da imagem */}
        <View className="w-full h-36 bg-gray-300 rounded-md items-center justify-center mb-1">
          <Text className="text-gray-600">Imagem da evidência</Text>
        </View>

        {/* Título */}
        <View>
          <Text className="font-bold text-base text-black">Título<Text className="text-red-600">*</Text></Text>
          <TextInput
            className="bg-white rounded-md p-2 mt-1 text-base"
            defaultValue="Faca do crime"
          />
        </View>

        {/* Data */}
        <View>
          <Text className="font-bold text-base text-black">Data<Text className="text-red-600">*</Text></Text>
          <TextInput
            className="bg-white rounded-md p-2 mt-1 text-base"
            defaultValue="19/05/25"
          />
        </View>

        {/* Local */}
        <View>
          <Text className="font-bold text-base text-black">Local<Text className="text-red-600">*</Text></Text>
          <TextInput
            className="bg-white rounded-md p-2 mt-1 text-base"
            defaultValue="Shopping Boa Vista, R. do Giriquiti, 48"
          />
        </View>

        {/* Descrição */}
        <View>
          <Text className="font-bold text-base text-black">Descrição<Text className="text-red-600">*</Text></Text>
          <TextInput
            className="bg-white rounded-md p-2 mt-1 h-28 text-base"
            multiline
            defaultValue="A faca usada consta o DNA da vítima na área cortante e apresentava DNA do suspeito"
          />
        </View>
      </View>

      {/* Botões inferiores */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded-md">
          <Text className="text-black font-medium">◀ Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#1B3A57] px-4 py-2 rounded-md"
          onPress={() => {
            console.log("Abrindo modal...");
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
            <Text className="text-lg font-bold text-center mb-5">Deseja fazer essa edição?</Text>

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
                  // Aqui você pode adicionar navegação ou lógica de salvar a edição
                  console.log("Edição confirmada");
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
        <View className="absolute right-5 bottom-44 z-20 w-32">
          <TouchableOpacity className="bg-[#1B3A57] px-3 py-2 rounded-md shadow items-center">
            <Text className="text-white text-sm font-medium">Gerar Laudo</Text>
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
  );
}
