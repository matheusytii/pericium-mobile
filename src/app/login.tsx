import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Login:', { email, password });
    router.push('/teste');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-periciumWhite"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-8 justify-center">
          
          <View className="mb-12">
            <Text className="text-4xl font-bold text-periciumBlack mb-2">
              Bem-vindo
            </Text>
            <Text className="text-lg text-periciumGreenDark">
              Faça login para continuar
            </Text>
          </View>

          
          <View className="space-y-4">
            <View>
              <Text className="text-periciumBlack mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-white p-4 rounded-lg border border-periciumGreenLight/20"
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-periciumBlack mb-2 font-medium">Senha</Text>
              <TextInput
                className="bg-white p-4 rounded-lg border border-periciumGreenLight/20"
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable 
              className="bg-periciumGreen p-4 rounded-lg mt-6"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Entrar
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
} 