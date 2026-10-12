const { test } = require('node:test');
const assert = require('node:assert/strict');
const { CHOICES, getChoice, getOutcome, getOpponent, describeRound } = require('../src/game/rules');

test('as nove combinações seguem as regras de pedra, papel e tesoura', () => {
  const expected = { rock: ['draw', 'lose', 'win'], paper: ['win', 'draw', 'lose'], scissors: ['lose', 'win', 'draw'] };
  for (const player of CHOICES) {
    CHOICES.forEach((opponent, index) => assert.equal(getOutcome(player.id, opponent.id), expected[player.id][index]));
  }
});

test('o modo seminário reproduz vitória, derrota e empate e repete o ciclo', () => {
  const opponents = Array.from({ length: 6 }, (_, index) => getOpponent(index, true));
  assert.deepEqual(opponents.map((choice) => choice.id), ['scissors', 'paper', 'rock', 'scissors', 'paper', 'rock']);
  assert.deepEqual(opponents.slice(0, 3).map((choice) => getOutcome('rock', choice.id)), ['win', 'lose', 'draw']);
});

test('o sorteio alcança todas as escolhas e respeita os limites', () => {
  assert.equal(getOpponent(0, false, () => 0).id, 'rock');
  assert.equal(getOpponent(0, false, () => 0.5).id, 'paper');
  assert.equal(getOpponent(0, false, () => 0.999999).id, 'scissors');
});

test('a descrição identifica quem venceu e informa empate sem pontuação', () => {
  assert.equal(describeRound(getChoice('rock'), getChoice('scissors'), 'win'), 'Pedra vence tesoura.');
  assert.equal(describeRound(getChoice('paper'), getChoice('scissors'), 'lose'), 'Tesoura vence papel.');
  assert.match(describeRound(getChoice('rock'), getChoice('rock'), 'draw'), /Ninguém pontua/);
});

test('escolhas inválidas falham antes de produzir um resultado incorreto', () => {
  assert.throws(() => getOutcome('invalid', 'rock'), /Escolha inválida/);
  assert.throws(() => getOutcome('rock', 'invalid'), /Escolha inválida/);
});
