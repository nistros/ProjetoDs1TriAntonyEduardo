import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [role, setRole] = useState<"cliente" | "chef">("cliente");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newSenha, setNewSenha] = useState("");

  const router = useRouter();

  // Entrar
  const entrar = async () => {
    if (role === "cliente") {
      if (!name) return Alert.alert("Erro", "Digite seu nome");
      try {
        await fetch("http://192.168.56.1/cliente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: name }),
        });
        router.push("/explore");
      } catch (error: any) {
        Alert.alert("Erro", error.message);
      }
    } else {
      if (!email || !senha) return Alert.alert("Erro", "Digite email e senha");
      try {
        const response = await fetch("http://192.168.56.1/chef/login", {
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
      } catch (error: any) {
        Alert.alert("Erro", error.message);
      }
    }
  };

  // Registrar chef
  const registrarChef = async () => {
    if (!newEmail || !newSenha) return Alert.alert("Erro", "Preencha email e senha");
    try {
      const response = await fetch("http://192.168.56.1/chef/register", {
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
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.roleButtons}>
        <Button title="Sou Cliente" onPress={() => setRole("cliente")} />
        <Button title="Sou Chef" onPress={() => setRole("chef")} />
      </View>

      {role === "cliente" && (
        <>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </>
      )}

      {role === "chef" && (
        <>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
          />
          <Button title="Criar conta como Chef" onPress={() => setShowRegister(true)} />
        </>
      )}

      <Button title="Entrar" onPress={entrar} />

      {/* Modal de registro de chef */}
      <Modal visible={showRegister} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Registrar Chef</Text>
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
            <Button title="Registrar" onPress={registrarChef} />
            <Button title="Cancelar" onPress={() => setShowRegister(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#000" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#fff", textAlign: "center" },
  roleButtons: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 8, color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#222",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
});
