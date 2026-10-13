import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';

const OPTIONS = { updateInterval: 500 };

export function useDuelSounds({ enabled, focused, phase, round, timeScale }) {
  const select = useAudioPlayer(require('../../assets/sounds/select.wav'), OPTIONS);
  const summon = useAudioPlayer(require('../../assets/sounds/summon.wav'), OPTIONS);
  const reveal = useAudioPlayer(require('../../assets/sounds/reveal.wav'), OPTIONS);
  const clash = useAudioPlayer(require('../../assets/sounds/clash.wav'), OPTIONS);
  const win = useAudioPlayer(require('../../assets/sounds/win.wav'), OPTIONS);
  const lose = useAudioPlayer(require('../../assets/sounds/lose.wav'), OPTIONS);
  const draw = useAudioPlayer(require('../../assets/sounds/draw.wav'), OPTIONS);
  const back = useAudioPlayer(require('../../assets/sounds/return.wav'), OPTIONS);
  const players = useMemo(() => ({ select, summon, reveal, clash, win, lose, draw, return: back }),
    [select, summon, reveal, clash, win, lose, draw, back]);
  const [appState, setAppState] = useState(AppState.currentState);
  const available = useRef(null);
  available.current = { enabled: enabled && focused && appState !== 'background' && appState !== 'inactive', timeScale };
  const generation = useRef(0);
  const lastCue = useRef(null);

  const stop = useCallback(() => {
    generation.current += 1;
    for (const player of Object.values(players)) {
      try { player.pause(); } catch { /* O hook do Expo pode já ter liberado o player no desmontar. */ }
    }
  }, [players]);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: false, shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers', allowsRecording: false }).catch(error => console.warn('Não foi possível configurar o áudio do duelo:', error.message));
    const subscription = AppState.addEventListener('change', setAppState);
    return () => { subscription.remove(); stop(); };
  }, [stop]);

  useEffect(() => {
    if (!enabled || !focused || appState === 'background' || appState === 'inactive') stop();
  }, [enabled, focused, appState, stop]);

  const play = useCallback((name) => {
    if (!available.current.enabled) return;
    const player = players[name];
    if (!player) return;
    stop();
    const token = generation.current;
    player.volume = name === 'clash' ? 0.55 : 0.65;
    player.setPlaybackRate(Math.max(0.5, Math.min(1, 1 / available.current.timeScale)));
    // Repetir um efeito requer voltar ao início. Cancelar invalida um seek pendente.
    player.seekTo(0).then(() => {
      if (token === generation.current && available.current.enabled) player.play();
    }).catch(error => console.warn('Não foi possível reproduzir o efeito do duelo:', error.message));
  }, [players, stop]);

  useEffect(() => {
    if (!round || phase === 'idle') { lastCue.current = null; return; }
    const cue = `${round.id}:${phase}`;
    if (lastCue.current === cue) return;
    lastCue.current = cue;
    // No movimento reduzido a rodada vai direto ao resultado, sem os sons dos atos intermediários.
    const sound = phase === 'result' ? round.outcome : phase;
    play(sound);
  }, [round, phase, play]);

  return { play, stop };
}
