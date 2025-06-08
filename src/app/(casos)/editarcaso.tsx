import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditCaseScreen() {
  const [titulo, setTitulo] = useState('Allan foi assaltado');
  const [status, setStatus] = useState('Em andamento');
  const [dataAbertura, setDataAbertura] = useState('19/05/2025');
  const [dataFechamento, setDataFechamento] = useState('');
  const [descricao, setDescricao] = useState(
    'Ele caminhava na Boa Vista e foi assaltado por um meliante que levava uma faca, o mesmo o deferiu um golpe na boca que foi rasgada de um canto a outro.'
  );

  const [mostrarBotaoCaso, setMostrarBotaoCaso] = useState(false);

  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Logo centralizada */}
      <View className="items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      {/* Título à esquerda */}
      <Text className="text-black font-bold text-xl mb-3 underline">Editar Caso</Text>

      {/* Card */}
      <ScrollView className="bg-[#D6DDE3] rounded-xl p-4 mb-4">
        <Text className="font-bold text-sm">Título<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text className="font-bold text-sm">Status<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={status}
          onChangeText={setStatus}
        />

        <Text className="font-bold text-sm">Data de abertura<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          value={dataAbertura}
          onChangeText={setDataAbertura}
        />

        <Text className="font-bold text-sm">Data de fechamento<Text className="text-red-600">*</Text></Text>
        <TextInput
          className="bg-white rounded-md px-2 py-2 mt-1 mb-2"
          placeholder="dd/mm/aaaa"
          value={dataFechamento}
          onChangeText={setDataFechamento}
        />

        <Text className="font-bold text-sm">Descrição<Text className="text-red-600">*</Text></Text>
        <TextInput
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
            <Text className="text-white mr-2">Editar</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botão "Caso" aparece acima do "+" */}
      {mostrarBotaoCaso && (
        <TouchableOpacity
          className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-36 right-5 z-20"
          onPress={() => {
            // ação do botão "Caso"
          }}
        >
          <Text className="text-white text-sm">Caso</Text>
        </TouchableOpacity>
      )}

      {/* Botão + mais para cima */}
      <TouchableOpacity
        onPress={() => setMostrarBotaoCaso(!mostrarBotaoCaso)}
        className="bg-[#1B3A57] w-12 h-12 rounded-full items-center justify-center absolute bottom-24 right-5 z-10"
      >
        <Ionicons name="add" size={28} color="white" />
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
