import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LaudoEvidencia() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mostrarBotaoDownload, setMostrarBotaoDownload] = useState(false);

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      {/* Header */}
      <View className="items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-2xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      {/* Título principal */}
      <Text className="text-black font-extrabold text-xl mb-2">Laudo de Evidência</Text>

      {/* Card de informações */}
      <View className="bg-white border border-gray-300 rounded-xl p-4">
        <Text className="text-sm text-black mb-2">ID do Caso: 0111111</Text>

        {/* Espaço para imagem */}
        <View className="bg-gray-200 h-32 mb-3 justify-center items-center rounded-md">
          <Text className="text-gray-600">Foto será exibida aqui</Text>
        </View>

        <Text className="text-black mb-1"><Text className="font-bold">Título:</Text> Faca do crime</Text>
        <Text className="text-black mb-1"><Text className="font-bold">Nome da Vítima:</Text> Allan Vitor Marques</Text>
        <Text className="text-black mb-1"><Text className="font-bold">Data:</Text> 19/05/2025</Text>
        <Text className="text-black mb-1"><Text className="font-bold">Endereço:</Text> Shopping Boa Vista, R. do Giriquiti, 48</Text>
        <Text className="text-black mt-1"><Text className="font-bold">Descrição:</Text> A faca usada consta o DNA da vítima na área cortante e apresentava DNA do suspeito.</Text>
      </View>

      {/* Botões flutuantes: "+" e Baixar Laudo */}
      <View className="absolute bottom-24 right-5 items-end">
        {mostrarBotaoDownload && (
          <TouchableOpacity
            className="bg-[#1B3A57] px-4 py-2 rounded-lg mb-2"
            onPress={() => {
              setModalVisivel(true);
              setMostrarBotaoDownload(false);
            }}
          >
            <Text className="text-white font-medium">Baixar Laudo</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="bg-[#1B3A57] w-14 h-14 rounded-full items-center justify-center"
          onPress={() => setMostrarBotaoDownload(!mostrarBotaoDownload)}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal de confirmação */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
          <View className="bg-white p-6 rounded-xl w-72 items-center">
            <Text className="text-lg font-bold text-center mb-4">Deseja baixar o laudo?</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                className="border border-gray-400 px-4 py-2 rounded-md flex-row items-center"
                onPress={() => setModalVisivel(false)}
              >
                <Ionicons name="close" size={16} color="black" />
                <Text className="ml-1 text-black">Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-[#1B3A57] px-4 py-2 rounded-md flex-row items-center"
                onPress={() => {
                  console.log("Download iniciado");
                  setModalVisivel(false);
                }}
              >
                <Text className="text-white mr-1">Sim</Text>
                <Ionicons name="download" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Barra de navegação inferior */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#D6DDE3] flex-row justify-around py-3">
        <TouchableOpacity className="items-center">
          <Ionicons name="bar-chart" size={24} color="#333" />
          <Text className="text-xs mt-1">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="folder-open" size={24} color="#1B3A57" />
          <Text className="text-xs mt-1 font-bold text-[#1B3A57]">Casos</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="people" size={24} color="#333" />
          <Text className="text-xs mt-1">Funcionários</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="person-circle" size={24} color="#333" />
          <Text className="text-xs mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
