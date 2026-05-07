import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#000000' }}
      headerImage={
        <Image
          source={require('@/assets/images/GulososPlazaIcon.png')}
          style={styles.headerImage}
          contentFit="contain"
        />
      }>
      
      <ThemedView style={styles.titleContainer}>\
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Nosso Cardápio!
        </ThemedText>
      </ThemedView>

      <Image
        source={require('@/assets/images/pizzaprimex.png')}
        style={styles.backgroundPizza}
        contentFit="cover"
      />

      <ThemedText style={styles.subtitle}>
        A seguir nossas mais gulosas opções:
      </ThemedText>

      <ThemedText style={styles.item}>
        🍕 Margherita - molho de tomate, mussarela e manjericão
      </ThemedText>
      <ThemedText style={styles.item}>
        🍕 Calabresa - calabresa fatiada, cebola e mussarela
      </ThemedText>
      <ThemedText style={styles.item}>
        🍕 Quatro Queijos - mussarela, gorgonzola, parmesão e provolone
      </ThemedText>
      <ThemedText style={styles.item}>
        🍕 Portuguesa - presunto, ovo, cebola, pimentão e azeitona
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    gap: 8,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  backgroundPizza: {
    position: 'absolute',
    right: 85,     
    top: 100,   
    width: 200,       
    height: 201,
    opacity: 0.2,     
  },
});
