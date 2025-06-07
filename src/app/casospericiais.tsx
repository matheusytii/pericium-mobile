import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const casos = [
  { id: '0111111', data: '19/05/25', titulo: 'Allan foi assaltado', status: 'Em andamento' },
  { id: '0111111', data: '19/05/25', titulo: 'Allan está sem celular', status: 'Em andamento' },
  { id: '0111111', data: '19/05/25', titulo: 'Allan está triste', status: 'Em andamento' },
  { id: '0111111', data: '19/05/25', titulo: 'Allan se matou', status: 'Em andamento' },
];

export default function CasosPericiais() {
  const [showNovo, setShowNovo] = useState(false);
  const [periodoSelecionado, setPeriodoSelecionado] = useState<'mes' | 'semana' | 'dia'>('mes');

  return (
    <View className="flex-1 bg-white pt-12 px-4 relative">
      {/* Cabeçalho com logo fake */}
      <View className="items-center mb-3">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#1B3A57" />
          <Text className="text-[#1B3A57] text-xl font-bold ml-2">Pericium</Text>
        </View>
      </View>

      {/* Título */}
      <Text className="text-black font-bold text-xl mb-3 underline">Casos Periciais</Text>

      {/* Barra de busca */}
      <View className="flex-row items-center bg-[#C2CDD6] rounded-md px-3 py-2 mb-3">
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#333"
          className="flex-1 text-sm text-black"
        />
        <Ionicons name="search" size={18} color="#1B3A57" />
      </View>

      {/* Botões Mês, Semana, Dia */}
      <View className="flex-row justify-between mb-4">
        {['mes', 'semana', 'dia'].map((periodo) => (
          <TouchableOpacity
            key={periodo}
            onPress={() => setPeriodoSelecionado(periodo as 'mes' | 'semana' | 'dia')}
            className={`flex-1 mx-1 py-2 rounded-md items-center ${
              periodoSelecionado === periodo ? 'bg-[#1B3A57]' : 'bg-[#C2CDD6]'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                periodoSelecionado === periodo ? 'text-white' : 'text-black'
              }`}
            >
              {periodo === 'mes' ? 'Mês' : periodo === 'semana' ? 'Semana' : 'Dia'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Casos */}
      <ScrollView className="mb-40">
        {casos.map((caso, index) => (
          <View key={index} className="bg-[#D6DDE3] rounded-xl p-4 mb-4 relative">
            <Text className="font-bold text-sm text-[#1B3A57]">ID {caso.id}</Text>
            <Text className="text-sm">Data: {caso.data}</Text>
            <Text className="text-sm font-semibold">Título: {caso.titulo}</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-sm font-medium">Status:</Text>
              <Text className="ml-2 px-2 py-0.5 text-sm bg-white rounded">{caso.status}</Text>
            </View>
            <View className="absolute top-2 right-2 flex-row space-x-2">
              <Ionicons name="eye-outline" size={20} color="#1B3A57" />
              <Ionicons name="trash-outline" size={20} color="#1B3A57" />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botão "Novo Caso" logo acima do "+" */}
      {showNovo && (
        <TouchableOpacity className="bg-[#1B3A57] px-4 py-2 rounded-md absolute bottom-36 right-4 z-20">
          <Text className="text-white text-sm">Novo Caso</Text>
        </TouchableOpacity>
      )}

      {/* Botão "+" flutuante */}
      <TouchableOpacity
        onPress={() => setShowNovo(!showNovo)}
        className="bg-[#1B3A57] w-12 h-12 rounded-full items-center justify-center absolute bottom-20 right-4 z-10"
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
