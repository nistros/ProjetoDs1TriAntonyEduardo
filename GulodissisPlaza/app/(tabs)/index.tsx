import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/GulososPlazaIcon.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Parte visual do formulário */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Nome:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
            padding: 10,
            borderRadius: 5,
          }}
        />

        <Text style={{ fontSize: 18, marginBottom: 8 }}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
            padding: 10,
            borderRadius: 5,
          }}
        />

        <Button title="Buscar dados (GET)" onPress={() => {}} />
        <View style={{ marginTop: 10 }}>
          <Button title="Enviar formulário (POST)" onPress={() => {}} />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
