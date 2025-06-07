import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateCaseScreen from "./screens/Home";
import Casos from "./screens/Casos";
import Perfil from "./app/(tabs)/perfil";
import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();

export default function Routes() {
  const router = useRouter()
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={CreateCaseScreen} />
      <Tab.Screen name="Casos" component={Casos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
