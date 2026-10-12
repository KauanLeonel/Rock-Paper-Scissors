import { StyleSheet, Text, View } from 'react-native';

export default function Scoreboard({ score, rounds, dark = false }) {
  return (
    <View style={[styles.board, dark && styles.dark]}>
      {[['VOCÊ', score.win, '#62dec0'], ['EMPATES', score.draw, '#d6bc80'], ['RIVAL', score.lose, '#ff9b9b']].map(([label, value, color]) => (
        <View key={label} style={styles.cell}>
          <Text style={[styles.label, dark && styles.lightLabel]}>{label}</Text>
          <Text style={[styles.value, dark && { color }]}>{String(value).padStart(2, '0')}</Text>
        </View>
      ))}
      <View style={[styles.cell, styles.roundCell]}>
        <Text style={[styles.label, dark && styles.lightLabel]}>RODADAS</Text>
        <Text style={[styles.roundValue, dark && styles.light]}>{rounds}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: { flexDirection: 'row', borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e3e7ee', paddingVertical: 4 },
  dark: { backgroundColor: '#151c2a', borderColor: '#2b3548' },
  cell: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  label: { color: '#647084', fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  lightLabel: { color: '#a3aec1' },
  value: { fontSize: 18, fontWeight: '800', color: '#273349', fontVariant: ['tabular-nums'] },
  roundCell: { borderLeftWidth: 1, borderColor: '#66708540' },
  roundValue: { fontSize: 18, fontWeight: '700', color: '#536174' },
  light: { color: '#e5eaf3' },
});
