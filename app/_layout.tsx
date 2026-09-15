import "../global.css";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { LanguageProvider } from "../context/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </LanguageProvider>
  );
}
