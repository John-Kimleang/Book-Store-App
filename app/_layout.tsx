import { Stack } from "expo-router";
import "../global.css";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";

export default function RootLayout() {
  return (
    <AudioPlayerProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AudioPlayerProvider>
  );
}