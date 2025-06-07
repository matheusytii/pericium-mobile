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

export default function Casos(){
  return(
    <View style={styles.fullScreen}>
      <Text style={styles.text}>
        Casos
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: "#EFEFEF",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text:{
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
  }
})