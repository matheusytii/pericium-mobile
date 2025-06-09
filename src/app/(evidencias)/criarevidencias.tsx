import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CriarEvidenciaScreen() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mostrarBotao, setMostrarBotao] = useState(false);

  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Logo */}
      <View className="items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      {/* Título */}
      <Text className="text-black font-bold text-xl mb-3">Criar a Evidência</Text>

      <ScrollView
        className="bg-[#D6DDE3] rounded-xl p-4 mb-4"
        contentContainerStyle={{ paddingBottom: 12 }}
        style={{ maxHeight: 460 }} // <- reduz altura total do card
      >
        {/* Imagem */}
        <View className="bg-gray-300 h-28 rounded-md mb-4 border-2 border-blue-400" />

        {/* Título */}
        <Text className="font-bold text-sm">Título<Text className="text-red-600">*</Text></Text>
        <TextInput
          placeholder="Escreva aqui"
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Data */}
        <Text className="font-bold text-sm">Data<Text className="text-red-600">*</Text></Text>
        <TextInput
          placeholder="dd/mm/aaaa"
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={data}
          onChangeText={setData}
        />

        {/* Local */}
        <Text className="font-bold text-sm">Local<Text className="text-red-600">*</Text></Text>
        <TextInput
          placeholder="Escreva aqui"
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={local}
          onChangeText={setLocal}
        />

        {/* Descrição */}
        <Text className="font-bold text-sm">Descrição<Text className="text-red-600">*</Text></Text>
        <TextInput
          placeholder="Escreva aqui"
          multiline
          numberOfLines={4}
          className="bg-white rounded-md px-2 py-2 mt-1 mb-3 h-24 text-top"
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Botões */}
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity className="bg-[#E4E9ED] px-4 py-2 rounded-md">
            <Text className="text-gray-800">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md flex-row items-center">
            <Text className="text-white mr-2">Criar</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botão "Evidência" flutuante */}
      {mostrarBotao && (
        <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-36 right-5 z-20">
          <Text className="text-white text-sm">Evidência</Text>
        </TouchableOpacity>
      )}

      {/* Botão + */}
      <TouchableOpacity
        onPress={() => setMostrarBotao(!mostrarBotao)}
        className="bg-[#1B3A57] w-12 h-12 rounded-full items-center justify-center absolute bottom-20 right-5 z-10"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
