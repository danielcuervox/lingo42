import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-100">
      <Text className="text-3xl font-bold text-indigo-600">Lingui42</Text>
      <Text className="text-base text-slate-500 mt-2">
        Tailwind CSS configurado correctamente
      </Text>
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
