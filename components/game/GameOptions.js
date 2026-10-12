import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DemoControls from './DemoControls';

export default function GameOptions({ dark = false, busy = false, animationOptions = false }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Pressable accessibilityRole="button" accessibilityLabel="Opções do jogo" onPress={() => setVisible(true)} style={[styles.button, dark && styles.darkButton]}>
        <FontAwesome name="sliders" size={18} color={dark ? '#d6bc80' : '#536174'} />
      </Pressable>
      <Modal transparent visible={visible} animationType="none" onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <Pressable accessibilityRole="button" accessibilityLabel="Fechar opções" onPress={() => setVisible(false)} style={StyleSheet.absoluteFill} />
          <View style={[styles.panel, dark && styles.darkPanel]} accessibilityViewIsModal>
            <View style={styles.heading}>
              <Text style={[styles.title, dark && styles.light]}>Opções do jogo</Text>
              <Pressable accessibilityRole="button" accessibilityLabel="Concluir opções" onPress={() => setVisible(false)} style={styles.button}>
                <FontAwesome name="close" size={18} color={dark ? '#d6bc80' : '#536174'} />
              </Pressable>
            </View>
            <DemoControls dark={dark} busy={busy} animationOptions={animationOptions} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e8ecf3', alignItems: 'center', justifyContent: 'center' },
  darkButton: { backgroundColor: '#d6bc8010', borderWidth: 1, borderColor: '#d6bc8040' },
  overlay: { flex: 1, backgroundColor: '#0009', justifyContent: 'center', alignItems: 'center', padding: 20 },
  panel: { width: '100%', maxWidth: 420, padding: 16, borderRadius: 20, backgroundColor: '#f4f6fa', gap: 12 },
  darkPanel: { backgroundColor: '#101724' },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: '#273349', fontSize: 18, fontWeight: '700' },
  light: { color: '#f3eee1' },
});
