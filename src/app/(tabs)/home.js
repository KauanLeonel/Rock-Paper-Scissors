import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { CHOICES } from '../../game/rules';

export default function Home() {
  const router = useRouter();
  const focused = useIsFocused();
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      {focused && <StatusBar style="light" />}
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <Text style={styles.brand}>TRÍADE ✦</Text>
          <View style={styles.hero}>
            <Text style={styles.headline}>Escolha sua arena.</Text>
            <Text style={styles.intro}>Pedra, papel ou tesoura. Seu próximo duelo começa aqui.</Text>
            <View pointerEvents="none" style={styles.preview}>
              {CHOICES.map((choice, index) => (
                <View key={choice.id} style={[styles.previewCard, { borderColor: `${choice.color}80`, backgroundColor: index === 1 ? '#25223b' : '#152737',
                  transform: [{ perspective: 700 }, { translateY: index === 1 ? -8 : 6 }, { rotateX: '12deg' }, { rotateZ: `${(index - 1) * 13}deg` }] }]}>
                  <Text style={[styles.previewElement, { color: choice.color }]}>{choice.element}</Text>
                  <View style={[styles.previewArt, { borderColor: `${choice.color}40` }]}><FontAwesome name={choice.icon} size={30} color={choice.color} /></View>
                  <Text style={styles.previewTitle}>{choice.title}</Text>
                </View>
              ))}
            </View>
          </View>
          <ModeCard title="Clássico" description="Faça sua escolha e desafie o rival." label="Jogar clássico" color="#9ab7ff" icon="hand-rock-o" onPress={() => router.navigate('/game')} />
          <ModeCard title="Duelo de cartas" description="Invoque seu elemento e entre na batalha." label="Jogar com cartas" color="#d6bc80" icon="bolt" onPress={() => router.navigate('/moti')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ModeCard({ title, description, label, color, icon, onPress }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.mode, { borderColor: `${color}40` }, pressed && { opacity: 0.75 }]}>
      <FontAwesome name={icon} color={color} size={25} />
      <View style={styles.modeCopy}><Text style={styles.modeTitle}>{title}</Text><Text style={styles.modeDescription}>{description}</Text><Text style={[styles.modeLink, { color }]}>{label}</Text></View>
      <FontAwesome name="angle-right" color={color} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b101b' },
  scroll: { flexGrow: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  content: { width: '100%', maxWidth: 640, gap: 16 },
  brand: { fontSize: 16, fontWeight: '800', letterSpacing: 4, color: '#d6bc80' },
  hero: { gap: 10 },
  headline: { color: '#f3eee1', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  intro: { color: '#a3aec1', fontSize: 13, lineHeight: 21 },
  preview: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 },
  previewCard: { width: 78, height: 115, borderWidth: 1, borderRadius: 8, padding: 7, gap: 7, marginHorizontal: 2 },
  previewElement: { fontSize: 7, fontWeight: '700', letterSpacing: 1 },
  previewArt: { flex: 1, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  previewTitle: { color: '#f3eee1', fontSize: 10, fontWeight: '700' },
  mode: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 16, borderWidth: 1, backgroundColor: '#151c2a' },
  modeCopy: { flex: 1, gap: 5 },
  modeTitle: { color: '#f3eee1', fontSize: 20, fontWeight: '700' },
  modeDescription: { color: '#a3aec1', fontSize: 12, lineHeight: 18 },
  modeLink: { fontSize: 11, fontWeight: '700', marginTop: 4 },
});
