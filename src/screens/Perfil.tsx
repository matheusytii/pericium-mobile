import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/type";
import { Ionicons } from "@expo/vector-icons";

export default function Perfil() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.form}>
        <View style={styles.inside}>
          <Text style={styles.titleInput}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#000000"
          />
          <Text style={styles.titleInput}>Cargo</Text>
          <TextInput
            style={styles.input}
            placeholder="Admnistrador"
            placeholderTextColor="#000000"
          />
          <Text style={styles.titleInput}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="123.456.789-01"
            placeholderTextColor="#000000"
          />
          <Text style={styles.titleInput}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="vitinhodabanana@gmail.com"
            placeholderTextColor="#000000"
          />
          <Text style={styles.titleInput}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input2, { flex: 1 }]}
              placeholder="Senha"
              placeholderTextColor="#000000"
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Alterar a senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.textButton2}>Encerrar sessão</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: "#EFEFEF",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "justify",
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 20,
  },
  form: {
    marginTop: 20,
    width: "100%",
    flex: 3 / 4,
  },
  inside: {
    backgroundColor: "#B6C0C7",
    height: 522,
    width: 340,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    borderColor: "#000000",
  },
  titleInput: {
    paddingLeft: 24,
    paddingBottom: 5,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  input2: {
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    height: 40,
  },
  button: {
    marginTop: 20,
    marginLeft: 26,
    marginRight: 26,
    marginBottom: 5,
    backgroundColor: "#15354B",
    alignContent: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 10,
  },
  button2: {
    marginTop: 5,
    marginLeft: 26,
    marginRight: 26,
    marginBottom: 5,
    backgroundColor: "#EFEFEF",
    alignContent: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 10,
  },
  textButton: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  textButton2: {
    textAlign: "center",
    color: "#15354B",
    fontWeight: "bold",
    borderColor: "#15354B",
  },
});
