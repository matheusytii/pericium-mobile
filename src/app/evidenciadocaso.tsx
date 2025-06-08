import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EvidenciasDoCaso() {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const evidencias = [
    { id: '1', titulo: 'Faca do crime', data: '19/05/25', local: 'Shopping Boa Vista, R. do Giriquiti, 48' },
    { id: '2', titulo: 'Faca do crime', data: '19/05/25', local: 'Shopping Boa Vista, R. do Giriquiti, 48' },
    { id: '3', titulo: 'Faca do crime', data: '19/05/25', local: 'Shopping Boa Vista, R. do Giriquiti, 48' },
  ];

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      {/* Header */}
      <View className="items-center mb-4">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-2xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      {/* Título */}
      <Text className="text-black font-extrabold text-xl mb-2">Evidências do Caso</Text>

      {/* Campo de busca (maior e com nova cor) */}
      <View className="bg-[#CBD5E1] rounded-lg px-4 py-3 mb-4 flex-row items-center">
        <TextInput
          placeholder="Buscar"
          className="flex-1 text-sm text-black"
        />
        <Ionicons name="search" size={20} color="#1B3A57" />
      </View>

      {/* ID do caso (mais alto) */}
      <View className="bg-[#CBD5E1] px-4 py-4 rounded-md mb-3">
        <Text className="text-xs font-bold text-[#1B3A57]">ID 011111</Text>
        <Text className="text-black font-medium">Título do caso: Allan foi assaltado</Text>
      </View>

      {/* Lista de evidências */}
      <FlatList
        data={evidencias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-300 rounded-lg p-3 mb-3">
            <Text className="text-black font-bold">Título: {item.titulo}</Text>
            <Text className="text-black">Data: {item.data}</Text>
            <Text className="text-black">Local: {item.local}</Text>
            <TouchableOpacity className="absolute top-2 right-2">
              <Ionicons name="document-text-outline" size={20} color="#1B3A57" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botões flutuantes */}
      <View className="absolute bottom-24 right-5 items-end">
        {mostrarOpcoes && (
          <>
            <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center">
              <Text className="text-white font-medium">Novo evidência</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center">
              <Text className="text-white font-medium">Vítima</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md mb-2 w-40 items-center">
              <Text className="text-white font-medium">Caso</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          className="bg-[#1B3A57] w-14 h-14 rounded-full items-center justify-center"
          onPress={() => setMostrarOpcoes(!mostrarOpcoes)}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Barra inferior */}
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
