import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router'


export default function App() {
    const router = useRouter()
  return (
    <View style={styles.container}>
        <Text style = {styles.title}> Login </Text>
        <Button color='#54799e' title='Login' onPress={() => router.push('/')}></Button>
                <Button color='#54799e' title='Entrar' onPress={() => router.push('/home')}></Button>

        <StatusBar style="auto"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#151515', justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16, }, card: { width: '100%', maxWidth: 400, backgroundColor: '#242424', padding: 35, borderRadius: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 10, }, emoji: { fontSize: 60, marginBottom: 15, }, title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 8, }, subtitle: { fontSize: 16, color: '#aaaaaa', textAlign: 'center', marginBottom: 30, }, button: { width: '100%', backgroundColor: '#ffdf4f', paddingVertical: 16, borderRadius: 14, alignItems: 'center', shadowColor: '#ffdf4f', shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5, }, buttonText: { color: '#151515', fontSize: 18, fontWeight: 'bold', }, });