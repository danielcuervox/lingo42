import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../api/api";

export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor introduce email y contraseña");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log("Login OK:", response.data);
      // Redirige al selector de tiempo/idioma tras el login correcto

      router.push("/LanguageTimePicker");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-slate-100 p-6">
      <View className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <Text className="text-3xl font-bold text-indigo-600 text-center">
          Lingui42
        </Text>
        <Text className="text-sm text-slate-500 text-center mt-1 mb-6">
          Micropíldoras de estudio para aprender idiomas
        </Text>

        <View className="mb-4">
          <Text className="text-xs font-semibold text-slate-600 mb-1">
            Email
          </Text>
          <TextInput
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <Text className="text-xs font-semibold text-slate-600 mb-1">
            Contraseña
          </Text>
          <TextInput
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className="bg-indigo-600 active:bg-indigo-800 py-3.5 rounded-xl shadow-sm items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-base">Acceder</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4F46E5",
  },
}); */
