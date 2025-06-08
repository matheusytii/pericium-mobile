import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function CreateCaseScreen() {
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [descricao, setDescricao] = useState('');

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
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="Escreva aqui"
          value={status}
          onChangeText={setStatus}
        />

        {/* Data */}
        <Text className="font-bold mt-2">
          Data de abertura<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1"
          placeholder="dd/mm/aaaa"
          value={dataAbertura}
          onChangeText={setDataAbertura}
        />

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

          <TouchableOpacity className="bg-[#1B3A57] px-5 py-2 rounded-md flex-row items-center">
            <Text className="text-white mr-1">Criar</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View className="flex-row justify-around bg-[#E4E9ED] py-3 absolute bottom-0 left-0 right-0">
        <TouchableOpacity className="items-center">
          <Ionicons name="bar-chart" size={24} color="#333" />
          <Text className="text-xs mt-1">Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="folder-open" size={24} color="#333" />
          <Text className="text-xs mt-1">Casos</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <FontAwesome name="users" size={22} color="#333" />
          <Text className="text-xs mt-1">Funcionários</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="person-circle" size={26} color="#333" />
          <Text className="text-xs mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Flutuante */}
      <TouchableOpacity className="bg-[#1B3A57] w-12 h-12 rounded-full justify-center items-center absolute bottom-16 right-5">
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
