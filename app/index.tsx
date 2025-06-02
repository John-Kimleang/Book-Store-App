import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-1 bg-white px-6 py-20">
      <Text className="text-3xl font-bold mb-6 mt-auto">Sign In</Text>
      <Text className="text-gray-500 mb-16">New User? <Text className="text-blue-600">Create an account</Text></Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-16 text-base"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text className="text-gray-500 mb-6">Forgot Password</Text>
      <TouchableOpacity className="w-full bg-blue-600 rounded-lg py-3 items-center mb-20">
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </TouchableOpacity>
      <Text className="text-blue-500 text-center mt-auto">Sign In as a business owner</Text>
    </View>
  );
}