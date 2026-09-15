import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image, Alert } from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { api, contentApi } from "../api/api";

const LANGUAGES = [
  {
    code: "es",
    label: "Español",
    flag: require("../assets/images/flags/spain_flag.png"),
  },
  {
    code: "en",
    label: "English",
    flag: require("../assets/images/flags/brit_american_flag.png"),
  },
  {
    code: "fr",
    label: "Français",
    flag: require("../assets/images/flags/france_flag.png"),
  },
  {
    code: "de",
    label: "Deutsch",
    flag: require("../assets/images/flags/germany_flag.png"),
  },
  {
    code: "it",
    label: "Italiano",
    flag: require("../assets/images/flags/italy_flag.webp"),
  },
];

const MINUTES_OPTIONS = [1, 2, 3, 5];

const LEVELS = [
  {
    code: "flexible (A1-A2)",
    es: "Flexible (A1-A2)",
    en: "Flexible (A1-A2)",
    fr: "Flexible (A1-A2)",
    de: "Flexibel (A1-A2)",
    it: "Flessibile (A1-A2)",
  },
  {
    code: "moderate (B1-B2)",
    es: "Moderado (B1-B2)",
    en: "Moderate (B1-B2)",
    fr: "Modéré (B1-B2)",
    de: "Moderat (B1-B2)",
    it: "Moderato (B1-B2)",
  },
  {
    code: "strict (C1-C2)",
    es: "Estricto (C1-C2)",
    en: "Strict (C1-C2)",
    fr: "Strict (C1-C2)",
    de: "Strikt (C1-C2)",
    it: "Severo (C1-C2)",
  },
];

export default function LanguageTimePicker() {
  const { language, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [selectedMinutes, setSelectedMinutes] = useState<number>(5);
  const [selectedLevel, setSelectedLevel] = useState<string>("moderate");

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    changeLanguage(code);
  };

  const handleSubmit = async () => {
    // Objeto completo para el backend
    const payload = {
      language: selectedLanguage,
      durationMinutes: selectedMinutes,
      level: selectedLevel,
    };

    try {
      const response = await api.post("/api/v1/sessions", payload);

      const contentResponse = await contentApi.get("/api/v1/content/load", {
        params: {
          language: selectedLanguage,
          content_type: "topic",
          level: "A1",
        },
      });

      console.log("Respuesta del servidor:", contentResponse.data);

      Alert.alert(
        "Lingui42",
        `¡Sesión iniciada!\n\nServidor responde: ${response.data.message}`,
      );
    } catch (error: any) {
      console.error("Error al conectar:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }

    console.log("Enviando configuración al backend:", payload);

    const alertMessage =
      selectedLanguage === "en"
        ? `Configuration saved: Language: ${payload.language.toUpperCase()} | Duration: ${payload.durationMinutes} min | Level: ${payload.level}`
        : selectedLanguage === "fr"
          ? `Configuration enregistrée : Langue : ${payload.language.toUpperCase()} | Durée : ${payload.durationMinutes} min | Niveau : ${payload.level}`
          : selectedLanguage === "de"
            ? `Konfiguration gespeichert: Sprache: ${payload.language.toUpperCase()} | Dauer: ${payload.durationMinutes} Min. | Stufe: ${payload.level}`
            : selectedLanguage === "it"
              ? `Configurazione salvata: Lingua: ${payload.language.toUpperCase()} | Durata: ${payload.durationMinutes} min | Livello: ${payload.level}`
              : `Configuración guardada: Idioma: ${payload.language.toUpperCase()} | Tiempo: ${payload.durationMinutes} min | Nivel: ${payload.level}`;

    Alert.alert("Lingui42", alertMessage);
  };

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center bg-slate-50 p-6">
      <View className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-slate-100">
        <Text className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Lingui42
        </Text>

        {/* Subtítulo */}
        <Text className="text-sm text-center text-slate-500 mb-6">
          {selectedLanguage === "en"
            ? "Configure your study session"
            : selectedLanguage === "fr"
              ? "Configurez votre session d'étude"
              : selectedLanguage === "de"
                ? "Richten Sie Ihre Lerneinheit ein"
                : selectedLanguage === "it"
                  ? "Configura la tua sessione di studio"
                  : "Configura tu sesión de estudio"}
        </Text>

        {/* Seleccionar Idioma */}
        <View className="flex-row flex-wrap gap-2 justify-between mb-6">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => handleLanguageSelect(lang.code)}
                className={`flex-row items-center justify-center py-2.5 px-3.5 rounded-xl border w-[48%] mb-1 ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <Image
                  source={lang.flag}
                  style={{
                    width: 24,
                    height: 16,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                  resizeMode="contain"
                />
                <Text
                  className={`font-medium ${isSelected ? "text-white" : "text-slate-700"}`}
                >
                  {lang.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Seleccionar Minutos */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-slate-700 mb-3 text-center">
            {selectedLanguage === "en"
              ? "Duration (minutes):"
              : selectedLanguage === "fr"
                ? "Durée (minutes) :"
                : selectedLanguage === "de"
                  ? "Dauer (Minuten):"
                  : selectedLanguage === "it"
                    ? "Durata (minuti):"
                    : "Duración (minutos):"}
          </Text>

          <View className="items-center justify-center">
            <View className="flex-row items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-sm w-48">
              <Pressable
                onPress={() => {
                  const currentIndex = MINUTES_OPTIONS.indexOf(selectedMinutes);
                  if (currentIndex > 0) {
                    setSelectedMinutes(MINUTES_OPTIONS[currentIndex - 1]);
                  } else {
                    setSelectedMinutes(
                      MINUTES_OPTIONS[MINUTES_OPTIONS.length - 1],
                    );
                  }
                }}
                className="px-4 py-3 bg-slate-200 active:bg-slate-300"
              >
                <Text className="font-bold text-slate-700">◀</Text>
              </Pressable>

              <View className="flex-1 items-center justify-center py-3 bg-white">
                <Text className="font-bold text-lg text-slate-800">
                  {selectedMinutes} min
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  const currentIndex = MINUTES_OPTIONS.indexOf(selectedMinutes);
                  if (
                    currentIndex < MINUTES_OPTIONS.length - 1 &&
                    currentIndex !== -1
                  ) {
                    setSelectedMinutes(MINUTES_OPTIONS[currentIndex + 1]);
                  } else {
                    setSelectedMinutes(MINUTES_OPTIONS[0]);
                  }
                }}
                className="px-4 py-3 bg-slate-200 active:bg-slate-300"
              >
                <Text className="font-bold text-slate-700">▶</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Seleccionar Nivel de Exigencia (Nativo) */}
        <View className="mb-8">
          <Text className="text-base font-semibold text-slate-700 mb-3 text-center">
            {selectedLanguage === "en"
              ? "Strictness Level:"
              : selectedLanguage === "fr"
                ? "Niveau d'exigence :"
                : selectedLanguage === "de"
                  ? "Anforderungsniveau:"
                  : selectedLanguage === "it"
                    ? "Livello di rigore:"
                    : "Nivel de exigencia:"}
          </Text>

          <View className="flex-row justify-between gap-1">
            {LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl.code;
              const labelText =
                selectedLanguage === "en"
                  ? lvl.en
                  : selectedLanguage === "fr"
                    ? lvl.fr
                    : selectedLanguage === "de"
                      ? lvl.de
                      : selectedLanguage === "it"
                        ? lvl.it
                        : lvl.es;

              return (
                <Pressable
                  key={lvl.code}
                  onPress={() => setSelectedLevel(lvl.code)}
                  className={`flex-1 py-2.5 rounded-xl border items-center justify-center ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${isSelected ? "text-white" : "text-slate-700"}`}
                  >
                    {labelText}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Botón de Enviar */}
        <Pressable
          onPress={handleSubmit}
          className="bg-indigo-600 active:bg-indigo-800 py-4 rounded-xl shadow-sm"
        >
          <Text className="text-center text-white font-bold text-lg">
            {selectedLanguage === "en"
              ? "Start Lesson"
              : selectedLanguage === "fr"
                ? "Commencer la leçon"
                : selectedLanguage === "de"
                  ? "Lektion starten"
                  : selectedLanguage === "it"
                    ? "Inizia la lezione"
                    : "Comenzar Lección"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
