import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'casos') iconName = 'folder';
          else if (route.name === 'perfil') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="casos" options={{ title: 'Casos' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
