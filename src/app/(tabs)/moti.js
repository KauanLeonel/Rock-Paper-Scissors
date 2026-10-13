import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DuelBoard from '../../../components/game/DuelBoard';
import Scoreboard from '../../../components/game/Scoreboard';
import GameOptions from '../../../components/game/GameOptions';
import { useDuel } from '../../game/useDuel';
import { useGameSettings } from '../../game/GameSettings';
import { useDuelSounds } from '../../game/useDuelSounds';
import { getChoice } from '../../game/rules';

export default function MotiGame() {
  const duel = useDuel({ animated: true });
  const focused = useIsFocused();
  const { demo, timeScale, motionReduced, soundEnabled } = useGameSettings();
  const sound = useDuelSounds({ enabled: soundEnabled, focused, phase: duel.phase, round: duel.round, timeScale });
  const { width, height } = useWindowDimensions();
  const [deployedId, setDeployedId] = useState(null);
  const [travel, setTravel] = useState(null);
  const serial = useRef(0);
  const tight = height < 700;
  const small = height < 620;
  const cardWidth = Math.max(60, Math.min(width < 600 ? small ? 64 : tight ? 80 : 104 : 140, (width - 130) / 2));
  const handWidth = Math.max(60, Math.min(width < 600 ? small ? 64 : tight ? 70 : 88 : 116, (width - 88) / 3));

  useEffect(() => {
    serial.current += 1;
    setDeployedId(null);
    setTravel(null);
    sound.stop();
  }, [demo, sound.stop]);

  function choose(id) {
    if (duel.busy || travel) return;
    sound.play('select');
    duel.select(id);
    if (id !== deployedId && !motionReduced) setTravel({ choice: id, token: ++serial.current });
    setDeployedId(id);
  }

  function reset() {
    sound.stop();
    serial.current += 1;
    setTravel(null);
    setDeployedId(null);
    duel.reset();
  }

  function prepare() {
    sound.play('return');
    duel.prepare();
  }

  const disabled = duel.busy || !!travel || !deployedId;
  const buttonLabel = duel.busy ? 'Duelo em andamento…' : travel ? 'Posicionando carta…' : duel.phase === 'result' ? 'Voltar à mão' : deployedId ? `Batalhar com ${getChoice(deployedId).title.toLowerCase()}` : 'Escolha uma carta';

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      {focused && <StatusBar style="light" />}
      <LinearGradient colors={['#20223c', '#0b101b', '#0b101b']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={[styles.scroll, tight && { paddingVertical: 10 }]}>
        <View style={[styles.content, tight && { gap: 8 }]}>
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>VERSÃO 02 / MOTI</Text>
              <Text style={styles.title}>TRÍADE<Text style={styles.titleDot}> ✦</Text></Text>
            </View>
            <GameOptions dark busy={duel.busy || !!travel} animationOptions />
            <Pressable accessibilityRole="button" accessibilityLabel="Reiniciar duelo Moti" onPress={reset} style={styles.reset}>
              <FontAwesome name="repeat" size={18} color="#d6bc80" />
            </Pressable>
          </View>
          <Scoreboard score={duel.score} rounds={duel.rounds} dark />
          <DuelBoard duel={duel} deployedId={deployedId} travel={travel} onChoose={choose}
            onArrive={(token) => setTravel((previous) => previous?.token === token ? null : previous)}
            cardWidth={cardWidth} handWidth={handWidth} focused={focused} timeScale={timeScale} reduced={motionReduced} tight={tight} />
        </View>
      </ScrollView>
      <View style={styles.actionBar}>
        <Pressable testID="battle-button" accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={duel.phase === 'result' ? prepare : duel.play}
          style={({ pressed }) => [styles.play, (pressed || disabled) && { opacity: 0.6 }]}>
          <LinearGradient colors={['#ead2a0', '#c6a76b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.playFill}>
            <FontAwesome name="bolt" size={21} color="#272333" />
            <Text style={styles.playText}>{buttonLabel}</Text>
            <FontAwesome name="angle-right" size={23} color="#272333" />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b101b' },
  scroll: { flexGrow: 1, padding: 14, alignItems: 'center' },
  content: { width: '100%', maxWidth: 700, gap: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  headerCopy: { gap: 4, flex: 1 },
  eyebrow: { color: '#a9a3c8', fontSize: 9, letterSpacing: 2, fontWeight: '700' },
  title: { color: '#f3eee1', fontSize: 25, fontWeight: '900', letterSpacing: 4 },
  titleDot: { color: '#d6bc80', fontSize: 20 },
  reset: { height: 44, width: 44, borderRadius: 22, borderWidth: 1, borderColor: '#d6bc8040', backgroundColor: '#d6bc8010', alignItems: 'center', justifyContent: 'center' },
  actionBar: { paddingHorizontal: 14, paddingVertical: 7, alignItems: 'center', backgroundColor: '#0b101b', borderTopWidth: 1, borderColor: '#2b3548' },
  play: { width: '100%', maxWidth: 700, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#f1d9a7' },
  playFill: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, padding: 13, minHeight: 50 },
  playText: { color: '#272333', fontSize: 15, fontWeight: '800' },
});
