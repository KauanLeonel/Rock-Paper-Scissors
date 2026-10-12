import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import ChoiceDisplay from '../../../components/ChoiceDisplay';
import ChoiceSymbol from '../../../components/game/ChoiceSymbol';
import Scoreboard from '../../../components/game/Scoreboard';
import GameOptions from '../../../components/game/GameOptions';
import { useDuel } from '../../game/useDuel';
import { CHOICES, OUTCOMES, getChoice } from '../../game/rules';

export default function BasicGame() {
  const duel = useDuel();
  const focused = useIsFocused();
  const compact = useWindowDimensions().height < 700;
  const selectedChoice = getChoice(duel.selected);
  const outcome = duel.round && OUTCOMES[duel.round.outcome];
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      {focused && <StatusBar style="dark" />}
      <ScrollView contentContainerStyle={[styles.scroll, compact && { paddingVertical: 10 }]}>
        <View style={[styles.content, compact && { gap: 10 }]}>
          <View style={styles.heading}>
            <View style={styles.headingCopy}>
              <Text style={styles.eyebrow}>{compact ? 'REACT NATIVE' : 'VERSÃO 01 / REACT NATIVE'}</Text>
              <Text style={[styles.title, compact && { fontSize: 20 }]}>O jogo original.</Text>
              {!compact && <Text style={styles.subtitle}>Pedra, papel e tesoura. Direto ao ponto.</Text>}
            </View>
            <GameOptions />
            <Pressable accessibilityRole="button" accessibilityLabel="Reiniciar jogo básico" onPress={duel.reset} style={styles.reset}>
              <FontAwesome name="repeat" size={18} color="#536174" />
            </Pressable>
          </View>
          <Scoreboard score={duel.score} rounds={duel.rounds} />
          <View style={[styles.arena, compact && { padding: 12, gap: 12 }]}>
            <View style={styles.players}>
              <BasicChoice label="VOCÊ" choice={duel.round?.player || selectedChoice} testID="basic-player-choice" compact={compact} />
              <Text style={styles.vs}>VS</Text>
              <BasicChoice label="RIVAL" choice={duel.round?.opponent} testID="basic-rival-choice" compact={compact} />
            </View>
            <View style={[styles.result, compact && { paddingTop: 8 }]} accessibilityLiveRegion="polite">
              <Text style={[styles.resultTitle, compact && { fontSize: 14 }]}>{outcome ? outcome.title : duel.rounds ? 'Pronto para a próxima rodada' : 'Escolha sua jogada'}</Text>
              <Text style={styles.resultDetail}>{duel.round ? duel.round.description : 'Escolha e toque em batalhar.'}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Qual é a sua escolha?</Text>
            <View style={styles.choices}>
              {CHOICES.map((choice) => <ChoiceDisplay key={choice.id} escolha={choice} selected={choice.id === duel.selected} onPress={() => duel.select(choice.id)} />)}
            </View>
          </View>
          {!compact && <Text style={styles.rules}>Pedra vence tesoura · Tesoura vence papel · Papel vence pedra</Text>}
        </View>
      </ScrollView>
      <View style={styles.actionBar}>
        <Pressable testID="battle-button" accessibilityRole="button" onPress={duel.play} style={({ pressed }) => [styles.play, pressed && { opacity: 0.8 }]}>
          <Text style={styles.playText}>Batalhar com {selectedChoice.title.toLowerCase()}</Text>
          <FontAwesome name="arrow-right" size={16} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function BasicChoice({ label, choice, testID, compact }) {
  return (
    <View style={styles.choice} testID={testID}>
      <Text style={styles.playerLabel}>{label}</Text>
      <View style={[styles.symbol, compact && { width: 52, height: 52, borderRadius: 26 }]}><ChoiceSymbol choice={choice} size={compact ? 40 : 52} color="#536174" /></View>
      <Text style={styles.choiceName}>{choice?.title || 'Aguardando'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f6fa' },
  scroll: { flexGrow: 1, padding: 16, alignItems: 'center' },
  content: { width: '100%', maxWidth: 700, gap: 14 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  headingCopy: { flex: 1, gap: 6 },
  eyebrow: { fontSize: 10, letterSpacing: 2, color: '#68758a', fontWeight: '700' },
  title: { fontSize: 23, fontWeight: '800', color: '#24324a' },
  subtitle: { fontSize: 13, color: '#68758a', lineHeight: 19 },
  reset: { width: 46, height: 46, backgroundColor: '#e8ecf3', borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  arena: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e3e7ee', borderRadius: 16, padding: 16, gap: 14 },
  players: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 8 },
  choice: { flex: 1, alignItems: 'center', gap: 8 },
  playerLabel: { fontSize: 11, fontWeight: '700', color: '#68758a', letterSpacing: 1 },
  symbol: { height: 68, width: 68, borderRadius: 34, backgroundColor: '#f0f3f8', alignItems: 'center', justifyContent: 'center' },
  choiceName: { fontSize: 14, fontWeight: '600', color: '#273349' },
  vs: { fontSize: 14, fontWeight: '800', color: '#97a2b3' },
  result: { borderTopWidth: 1, borderColor: '#e3e7ee', paddingTop: 12, alignItems: 'center', gap: 6 },
  resultTitle: { color: '#273349', fontSize: 16, fontWeight: '700', textAlign: 'center' },
  resultDetail: { color: '#68758a', fontSize: 13, textAlign: 'center', lineHeight: 19 },
  section: { gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#273349' },
  choices: { flexDirection: 'row', gap: 10 },
  actionBar: { paddingHorizontal: 16, paddingVertical: 7, borderTopWidth: 1, borderColor: '#e3e7ee', backgroundColor: '#f4f6fa', alignItems: 'center' },
  play: { width: '100%', maxWidth: 700, backgroundColor: '#3658b3', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, minHeight: 50 },
  playText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  rules: { color: '#68758a', fontSize: 11, textAlign: 'center', lineHeight: 18, paddingBottom: 8 },
});
