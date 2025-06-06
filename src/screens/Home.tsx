import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
