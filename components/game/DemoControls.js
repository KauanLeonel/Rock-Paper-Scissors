import { StyleSheet, Switch, Text, View } from 'react-native';
import { useGameSettings } from '../../src/game/GameSettings';

export default function DemoControls({ dark = false, busy = false, animationOptions = false }) {
  const { demo, setDemo, slow, setSlow, reduceMotion, setReduceMotion } = useGameSettings();
  return (
    <View style={[styles.box, dark && styles.dark]}>
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={[styles.title, dark && styles.light]}>Modo seminário</Text>
          <Text style={[styles.note, dark && styles.muted]}>Rival: tesoura → papel → pedra. Repete nas duas versões.</Text>
        </View>
        <Switch accessibilityLabel="Modo seminário, rival com sequência previsível" value={demo} onValueChange={setDemo} disabled={busy} trackColor={{ false: '#667085', true: '#417665' }} thumbColor={demo ? '#9ef2d8' : '#edf0f5'} />
      </View>
      {animationOptions && (
        <View style={styles.options}>
          <View style={styles.row}>
            <Text style={[styles.title, dark && styles.light]}>Câmera lenta</Text>
            <Switch accessibilityLabel="Câmera lenta" value={slow} onValueChange={setSlow} disabled={busy} trackColor={{ false: '#667085', true: '#417665' }} thumbColor="#edf0f5" />
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, dark && styles.light]}>Reduzir movimento</Text>
            <Switch accessibilityLabel="Reduzir movimento" value={reduceMotion} onValueChange={setReduceMotion} disabled={busy} trackColor={{ false: '#667085', true: '#417665' }} thumbColor="#edf0f5" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#e3e7ee', backgroundColor: '#fff', gap: 8 },
  dark: { backgroundColor: '#151c2a', borderColor: '#2b3548' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 40 },
  copy: { flex: 1, gap: 5 },
  title: { fontSize: 13, fontWeight: '600', color: '#273349', flexShrink: 1 },
  note: { fontSize: 12, color: '#68758a', lineHeight: 18 },
  light: { color: '#e5eaf3' },
  muted: { color: '#a3aec1' },
  options: { borderTopWidth: 1, borderColor: '#66708540', paddingTop: 8, gap: 4 },
});
