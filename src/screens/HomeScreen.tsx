import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function CreateCaseScreen() {
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Novo Caso</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva aqui"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Status<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva aqui"
          value={status}
          onChangeText={setStatus}
        />

        <Text style={styles.label}>Data de abertura<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/aaaa"
          value={dataAbertura}
          onChangeText={setDataAbertura}
        />

        <Text style={styles.label}>Descrição<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva aqui"
          value={descricao}
          multiline
          numberOfLines={4}
          onChangeText={setDescricao}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createText}>Criar</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="bar-chart" size={24} color="#333" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="folder-open" size={24} color="#333" />
          <Text style={styles.navText}>Casos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="users" size={22} color="#333" />
          <Text style={styles.navText}>Funcionários</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={26} color="#333" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#D6DDE3',
    borderRadius: 10,
    padding: 16,
  },
  label: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#E4E9ED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  cancelText: {
    color: '#333',
  },
  createButton: {
    backgroundColor: '#1B3A57',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  createText: {
    color: '#fff',
    marginRight: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E4E9ED',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    backgroundColor: '#1B3A57',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
