import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={({ route }) => {
      const dark = route.name !== 'game';
      return {
        headerShown: false,
        tabBarActiveTintColor: dark ? '#d6bc80' : '#3658b3',
        tabBarInactiveTintColor: dark ? '#8895ad' : '#68758a',
        tabBarStyle: { backgroundColor: dark ? '#101724' : '#fff', borderTopColor: dark ? '#2b3548' : '#e3e7ee', height: 60 + insets.bottom, paddingTop: 5, paddingBottom: Math.max(5, insets.bottom) },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        sceneStyle: { backgroundColor: dark ? '#0b101b' : '#f4f6fa' },
      };
    }}>
      <Tabs.Screen name="home" options={{ title: 'Início', tabBarIcon: ({ color }) => <FontAwesome name="home" size={20} color={color} /> }} />
      <Tabs.Screen name="game" options={{ title: 'Versão básica', tabBarIcon: ({ color }) => <FontAwesome name="hand-rock-o" size={20} color={color} /> }} />
      <Tabs.Screen name="moti" options={{ title: 'Duelo Moti', tabBarIcon: ({ color }) => <FontAwesome name="bolt" size={22} color={color} /> }} />
    </Tabs>
  );
}
