import { Image } from 'react-native';

// PNGs transparentes incluídos no aplicativo: sem fontes ou URLs em tempo de execução.
const IMAGES = {
  rock: require('../../assets/choices/rock.png'),
  paper: require('../../assets/choices/paper.png'),
  scissors: require('../../assets/choices/scissors.png'),
  unknown: require('../../assets/choices/unknown.png'),
};

export default function ChoiceSymbol({ choice, size = 40, color = '#536174' }) {
  return <Image key={choice?.id || 'unknown'} source={IMAGES[choice?.id] || IMAGES.unknown}
    accessibilityLabel={choice?.title || 'Aguardando escolha'} resizeMode="contain"
    style={{ width: size, height: size, tintColor: color, flexShrink: 0 }} />;
}
