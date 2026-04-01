import React from "react";
import { SafeAreaView } from "react-native";
import MeuApp from "./BackEnd/app"; // importa o seu app.js

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MeuApp />
    </SafeAreaView>
  );
}
