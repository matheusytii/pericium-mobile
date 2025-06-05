import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
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
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#000000"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Esqueci a senha</Text>
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
    marginTop: 250,
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