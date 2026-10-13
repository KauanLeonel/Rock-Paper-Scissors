# Tríade — React Native × Moti

Um jogo de pedra, papel e tesoura em duas versões dentro do mesmo aplicativo, preparado para um seminário sobre Moti.

Os **slides interativos do seminário de 30 minutos sobre Moti** estão em [`seminario-moti/`](seminario-moti/README.md). Execute `npm run seminario` para ensinar instalação, componentes e propriedades da biblioteca, com laboratórios reais, votações em sala, desafios em dupla e exemplos do código do jogo.

- **Versão básica** (`/game`): `View`, `Text`, `Pressable`, `Image` e `StyleSheet`. As figuras são PNGs locais, sem carregamento de fontes para pedra, papel e tesoura.
- **Duelo Moti** (`/moti`): a carta viaja da mão até o campo e se amplia durante a batalha. A invocação tem anéis de energia, a revelação aproxima as duas cartas, a colisão dispara ondas de choque e fragmentos, e o vencedor ganha o centro da arena. Todas as animações são declaradas em Moti.
- **Início** (`/home`): escolha entre o jogo clássico e o duelo de cartas.

O botão **Batalhar** fica fixo acima das abas nas duas telas. O placar é compacto, e as configurações ficam em **Opções do jogo**, no ícone de ajustes do cabeçalho.

O duelo Moti tem efeitos sonoros originais de seleção, invocação, revelação, impacto, vitória, derrota, empate e retorno à mão, reproduzidos por `expo-audio`. **Opções do jogo → Efeitos sonoros** permite silenciar mesmo durante uma batalha. Os efeitos param ao reiniciar, trocar de tela ou colocar o app em segundo plano; a câmera lenta também reduz a velocidade dos sons. A versão básica não reproduz efeitos.

## Executar

```sh
npm install
npm start
```

Use um Expo Go compatível com SDK 54 ou um development build desse SDK. Abra o QR code no dispositivo. Para navegador: `npm run web`. Android: `npm run android` (emulador ou dispositivo configurado). iOS exige dispositivo com Expo Go ou ambiente macOS para simulador.

Se o Metro já estava aberto quando as bibliotecas foram instaladas, reinicie com `npx expo start --clear`.

## Roteiro para o seminário

1. Abra **Versão básica**, toque em **Opções do jogo** e ative **Modo seminário**. O rival segue tesoura → papel → pedra, em ciclo. A troca desse modo zera os jogos nas duas telas.
2. Mantenha pedra selecionada e jogue três vezes: vitória, derrota e empate. Mostre que os componentes mudam imediatamente.
3. Abra **Duelo Moti**, toque em pedra e observe a carta sair da mão e chegar ao campo. Use **Batalhar** para ver a sequência cinematográfica. Após cada resultado, **Voltar à mão** prepara a próxima escolha sem zerar o placar. Cada versão mantém seu placar independente.
4. Nas opções, ative **Câmera lenta** para observar a viagem da carta, revelação e ataque.
5. Ative **Reduzir movimento** para comparar o mesmo visual sem deslocamentos nem giro. A preferência de redução de movimento do sistema também é respeitada.
6. Desative o modo seminário para jogar contra escolhas aleatórias.

Ao trocar de aba durante uma animação, a rodada em andamento é cancelada e não pontua. Reiniciar também cancela os temporizadores. Empates são contabilizados separadamente, sem ponto para nenhum jogador.

## O que mostrar no código

| Arquivo | Assunto |
| --- | --- |
| `src/game/rules.js` | Mesmas regras e mesma sequência de demonstração nas duas versões |
| `src/game/useDuel.js` | Estado do jogo, placar e fases; a versão básica resolve imediatamente |
| `components/ChoiceDisplay.js` | Seleção com estilo estático em React Native |
| `components/game/MotiCard.js` | `from`, `animate`, `transition`, transformações e sequência de ataque |
| `components/game/DuelBoard.js` | Medição dos espaços da mão e do campo; o mesmo componente viaja entre eles |
| `components/game/BattleCinema.js` | Auras, anéis, raios, partículas e títulos cinematográficos, inteiramente em Moti |
| `components/game/ChoiceSymbol.js` | Figuras locais carregadas com `Image`, sem fontes de ícones na batalha |
| `components/game/DuelEffects.js` | Partículas e expansão do anel de impacto |
| `src/app/(tabs)/moti.js` | Seleção, chegada da carta e botão fixo de batalha |

Exemplo da ideia central:

```jsx
<MotiView
  from={{ opacity: 0, translateY: 35 }}
  animate={{ opacity: 1, translateY: selected ? -18 : 0 }}
  transition={{ type: 'timing', duration: 230 }}
/>
```

O Moti descreve os estados visuais e usa o Reanimated para executar as animações. O design das cartas vem dos estilos, ícones e gradientes. A aparência 3D é simulada com `perspective`, `rotateX`, `rotateY`, `rotateZ`, sombras e camadas: não há modelos nem motor 3D. React Native também permite animações sem Moti; aqui a versão básica é intencionalmente estática para demonstrar a API declarativa da biblioteca.

## Dependências e validação

Projeto em Expo SDK 54 / React Native 0.81 / React 19.1, com Moti 0.30, Reanimated `~4.1.1`, Worklets `0.5.1` e Expo LinearGradient `~15.0.8`. O `babel-preset-expo` configura o plugin de Worklets automaticamente no SDK 54; não foi adicionado o plugin antigo do Reanimated manualmente.

```sh
npm test
npx expo install --check
npx expo export --platform web
```

Os testes de regras cobrem as nove combinações, o ciclo do seminário, o sorteio, as descrições e escolhas inválidas. Para avaliar o desempenho e o efeito de profundidade, faça também uma apresentação em um dispositivo Android/iOS.

Documentação consultada: [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/), [Reanimated no SDK 54](https://docs.expo.dev/versions/v54.0.0/sdk/reanimated/), [instalação do Moti](https://moti.fyi/installation), [animações](https://moti.fyi/animations) e [transformações](https://moti.fyi/api/transforms).
