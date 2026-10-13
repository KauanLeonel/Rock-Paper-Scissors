# Sons do duelo

Oito efeitos originais sintetizados por `scripts/generate-duel-sounds.cjs`: seleção, invocação, revelação, colisão, vitória, derrota, empate e retorno à mão.

Arquivos WAV PCM mono, 44.100 Hz e 16 bits, com picos normalizados e envelopes para suavizar entrada e saída. Não contêm samples de outros jogos nem dependem de downloads durante a partida.

Para gerar novamente: `node scripts/generate-duel-sounds.cjs`.
