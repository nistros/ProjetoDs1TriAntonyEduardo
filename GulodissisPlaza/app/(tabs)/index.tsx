import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/parallax-scroll-view";

const API_URL = "http://localhost:3000";

export default function HomeScreen() {
  const [role, setRole] = useState<"cliente" | "chef">("cliente");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newSenha, setNewSenha] = useState("");

  const router = useRouter();

  const entrar = async () => {
    try {
      if (role === "cliente") {
        if (!name) return Alert.alert("Erro", "Digite seu nome");

        const response = await fetch(`${API_URL}/cliente`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: name }),
        });

        if (response.ok) router.push("/explore");
        else Alert.alert("Erro", "Não foi possível registrar o cliente");
      } else {
        if (!email || !senha) return Alert.alert("Erro", "Digite email e senha");

        const response = await fetch(`${API_URL}/chef/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        });

        const result = await response.json();
        if (response.ok) {
          Alert.alert("Sucesso", result.message);
          router.push("/explore");
        } else {
          Alert.alert("Erro", result.message);
        }
      }
    } catch (error: any) {
      Alert.alert("Erro de Conexão", "A API está rodando no localhost:3000?");
    }
  };

  const registrarChef = async () => {
    if (!newEmail || !newSenha) return Alert.alert("Erro", "Preencha email e senha");
    try {
      const response = await fetch(`${API_URL}/chef/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, senha: newSenha }),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", result.message);
        setShowRegister(false);
      } else {
        Alert.alert("Erro", result.message);
      }
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#000000" }}
      headerImage={
        <Image
          source={require("../../assets/images/GulososPlazaIcon.png")}
          style={styles.headerImage}
          contentFit="contain"
        />
      }
    >
      <Text style={styles.title}>Sistema de Pizzaria</Text>

      <View style={styles.roleButtons}>
        <Button title="Sou Cliente" color={role === "cliente" ? "#ffca28" : "#ccc"} onPress={() => setRole("cliente")} />
        <Button title="Sou Chef" testID="btnCliente" color={role === "chef" ? "#ffca28" : "#ccc"} onPress={() => setRole("chef")} />
      </View>

      {role === "cliente" ? (
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Seu email"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
          />
          <View style={{ marginBottom: 10 }}>
            <Button title="Não tenho conta (Registrar Chef)" onPress={() => setShowRegister(true)} color="#444" />
          </View>
        </View>
      )}

      <Button title={role === "cliente" ? "Entrar como Cliente" : "Login Chef"} onPress={entrar} color="#28a745" />

      <Modal visible={showRegister} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Registrar Novo Chef</Text>
            <TextInput
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Novo email"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TextInput
              value={newSenha}
              onChangeText={setNewSenha}
              placeholder="Nova senha"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.input}
            />
            <View style={{ gap: 10 }}>
              <Button title="Confirmar Registro" onPress={registrarChef} color="#28a745" />
              <Button title="Cancelar" onPress={() => setShowRegister(false)} color="#dc3545" />
            </View>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#fff", textAlign: "center" },
  roleButtons: { flexDirection: "row", justifyContent: "space-around", marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 8, color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#111",
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    margin: 20,
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
});
