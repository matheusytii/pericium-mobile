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

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
  route: RouteProp<RootStackParamList, "Login">;
};

export default function Login({ navigation }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <View style={styles.fullScreen}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>Faça o login para poder</Text>
        <Text style={styles.description}>acessar o sistema</Text>
        <View style={styles.form}>
          <Text style={styles.titleInput}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            placeholderTextColor="#000000"
            keyboardType="numeric"
          />
          <Text style={styles.titleInput}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input2, { flex: 1 }]}
              placeholder="Digite sua senha"
              placeholderTextColor="#000000"
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: "#B6C0C7",
    flex: 1,
  },
  contentContainer: {
    marginTop: 190,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
  },
  form: {
    marginTop: 20,
    width: "100%",
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
  input2:{
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
    backgroundColor: "#15354B",
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
  text: {
    textAlign: "center",
    color: "#000000",
    paddingTop: 14,
  },
});
