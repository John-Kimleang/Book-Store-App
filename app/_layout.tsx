import { Stack } from "expo-router";
import Header from "./components/Header"; // Import the Header component
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Header /> {/* Add the Header here */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}