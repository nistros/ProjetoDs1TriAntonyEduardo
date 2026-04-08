import { Image } from 'expo-image';
import { StyleSheet, Alert } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Função GET
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const data = await response.json();
      Alert.alert("Dados recebidos!", JSON.stringify(data, null, 2));
    } catch (error: any) {
      Alert.alert("Erro ao buscar dados", error.message);
    }
  };

  // Função POST
  const sendForm = async () => {
    try {
      const response = await fetch("http://localhost:3000/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      Alert.alert("Formulário enviado!", JSON.stringify(result, null, 2));
    } catch (error: any) {
      Alert.alert("Erro ao enviar formulário", error.message);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#000000' }}
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
          style={styles.input}
        />

        <Text style={{ fontSize: 18, marginBottom: 8 }}>Email:</Text>
        <Text style={{ fontSize: 18, marginBottom: 8, color: "#fff" }}>Nome:</Text>
<TextInput
  value={name}
  onChangeText={setName}
  placeholder="Digite seu nome"
  placeholderTextColor="#aaa"
  style={{
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
    color: "#fff", // cor do texto digitado
  }}
/>


        <Button title="Buscar dados (GET)" onPress={fetchData} />
        <View style={{ marginTop: 10 }}>
          <Button title="Enviar formulário (POST)" onPress={sendForm} />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
  },
  reactLogo: {
    height: '95%',
    width:'85%', 
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

});
