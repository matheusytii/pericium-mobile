import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AtribuirFuncionarioScreen() {
  const [showAtribuir, setShowAtribuir] = useState(false);

  return (
    <View className="flex-1 bg-[#F5F5F5] pt-12 px-4 relative">
      {/* Logo Pericium Centralizada */}
      <View className="items-center mb-3">
        <View className="flex-row items-center justify-center">
          <Ionicons name="shield-checkmark" size={28} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-2xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      {/* Título Maior */}
      <Text className="text-black font-bold text-lg mb-4">Atribuir Funcionário</Text>

      {/* Card Maior */}
      <View className="bg-[#C2CDD6] p-5 py-6 rounded-2xl mb-6">
        {/* Campo de busca */}
        <View className="flex-row items-center bg-white rounded-md px-3 py-2 mb-4">
          <TextInput
            placeholder="Buscar pelo funcionário"
            placeholderTextColor="#333"
            className="flex-1 text-sm text-black"
          />
          <Ionicons name="search" size={18} color="#1B3A57" />
        </View>

        {/* Campos */}
        <Text className="text-sm font-semibold mb-1">Nome<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-3 py-2 mb-4"
          value="Matheus Ramos"
        />

        <Text className="text-sm font-semibold mb-1">CPF<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-3 py-2 mb-4"
          value="12345678910"
        />

        <Text className="text-sm font-semibold mb-1">Cargo<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-3 py-2 mb-4"
          value="Perito"
        />

        <Text className="text-sm font-semibold mb-1">Email<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-3 py-2 mb-4"
          value="matheusramos@gmail"
        />

        {/* Botões de ação */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity className="bg-[#E4E9ED] px-4 py-2 rounded-md">
            <Text className="text-gray-800">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md flex-row items-center">
            <Text className="text-white mr-2">Atribuir</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão "Atribuir Caso" visível ao apertar "+" */}
      {showAtribuir && (
        <TouchableOpacity
          className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-36 right-6 z-10"
        >
          <Text className="text-white text-sm">Atribuir Caso</Text>
        </TouchableOpacity>
      )}

      {/* Botão "+" maior e mais acima */}
      <TouchableOpacity
        onPress={() => setShowAtribuir(!showAtribuir)}
        className="bg-[#1B3A57] w-14 h-14 rounded-full items-center justify-center absolute bottom-20 right-5 z-10"
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Tabs */}
      <View className="flex-row justify-around bg-[#E4E9ED] py-3 absolute bottom-0 left-0 right-0">
        <TouchableOpacity className="items-center">
          <Ionicons name="bar-chart" size={24} color="#333" />
          <Text className="text-xs mt-1">Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="folder-open" size={24} color="#1B3A57" />
          <Text className="text-xs mt-1 text-[#1B3A57] font-bold">Casos</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="people" size={24} color="#333" />
          <Text className="text-xs mt-1">Funcionários</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="person-circle" size={26} color="#333" />
          <Text className="text-xs mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
