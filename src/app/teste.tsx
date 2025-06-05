import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function TesteScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-periciumWhite">
      <Image 
        source={require('../assets/images/logo.jpeg')}
        className="w-48 h-48 mb-8 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-periciumBlack mb-8">
        Pagina de teste 🤓
      </Text>
      <Text className="text-lg text-periciumGreenDark mb-8 text-center px-4">
        Parabéns vc logou meu amor 🫣, coisinha linda d papai do dedão
      </Text>
      <Pressable 
        className="bg-periciumGreen p-4 rounded-lg"
        onPress={() => router.back()}
      >
        <Text className="text-white font-semibold text-lg">
          Volta pro login, que eu vou voltar a comer meu galeto gelado 🍗
        </Text>
      </Pressable>
    </View>
  );
} 