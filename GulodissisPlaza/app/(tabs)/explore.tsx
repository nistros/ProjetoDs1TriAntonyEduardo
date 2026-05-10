import { Image } from 'expo-image';

import {
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import { useEffect, useState } from 'react';

import { useLocalSearchParams } from "expo-router";

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {

  const { role } = useLocalSearchParams();

  const [cardapio, setCardapio] = useState<any[]>([]);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    carregarCardapio();
  }, []);

  async function carregarCardapio() {

    const response = await fetch(
      'http://localhost:3001/cardapio'
    );

    const data = await response.json();

    setCardapio(data);
  }

  async function adicionarPizza() {

    await fetch('http://localhost:3001/cardapio', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        titulo,
        descricao,
        preco,
        imagem,
      }),
    });

    carregarCardapio();

    setTitulo('');
    setDescricao('');
    setPreco('');
    setImagem('');
  }

  async function deletarPizza(id: number) {

    await fetch(
      `http://localhost:3001/cardapio/${id}`,
      {
        method: 'DELETE',
      }
    );

    carregarCardapio();
  }

  return (

    <ParallaxScrollView
      headerBackgroundColor={{
        light: '#D0D0D0',
        dark: '#000000',
      }}

      headerImage={
        <Image
          source={require('@/assets/images/GulososPlazaIcon.png')}
          style={styles.headerImage}
          contentFit="contain"
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Nosso Cardápio!
        </ThemedText>
      </ThemedView>

      {role === 'chef' && (

        <>

          <TextInput
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />

          <TextInput
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            style={styles.input}
          />

          <TextInput
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            style={styles.input}
          />

          <TextInput
            placeholder="URL da imagem"
            value={imagem}
            onChangeText={setImagem}
            style={styles.input}
          />

          <Button
            title="Adicionar Pizza"
            onPress={adicionarPizza}
          />

        </>

      )}

      {cardapio.map((pizza) => (

        <ThemedView
          key={pizza.id}
          style={styles.card}>

          <Image
            source={{ uri: pizza.imagem }}
            style={styles.pizzaImage}
            contentFit="cover"
          />

          <ThemedText style={styles.item}>
            {pizza.titulo}
          </ThemedText>

          <ThemedText>
            {pizza.descricao}
          </ThemedText>

          <ThemedText>
            R$ {pizza.preco}
          </ThemedText>

          {role === 'chef' && (

            <Button
              title="Remover"
              onPress={() => deletarPizza(pizza.id)}
            />

          )}

        </ThemedView>

      ))}

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
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  card: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#222',
  },

  pizzaImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  item: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

});