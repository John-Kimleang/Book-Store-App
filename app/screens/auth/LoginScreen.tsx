import Assets from "@/app/components/Assets";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <View className="items-center justify-center p-10">
        <Image
        source={Assets.medicalLogo}
        className=""
        />
      </View>
      <Text className="text-3xl font-bold mb-10">Log In</Text>
      <Text className="text-bold mb-4">
        Email <Text className="text-red-500">*</Text>
      </Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text className="text-bold mb-4">
        Password <Text className="text-red-500">*</Text>
      </Text>
      <View className="relative">
        <TextInput
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-4"
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mt-4">
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          className="mr-2"
        >
          <Ionicons
            name={showPassword ? "checkbox" : "square-outline"}
            size={24}
            color="blue"
          />
        </TouchableOpacity>
        <Text className="text-gray-500">Show Password</Text>
      </View>
      <TouchableOpacity className="w-full bg-blue-600 rounded-lg py-3 items-center my-10">
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </TouchableOpacity>
      <Text className="text-blue-500 text-lg text-center underline">
        Forgot Password?
      </Text>
      <Text className="text-blue-500 text-lg text-center my-10 underline">
        Register New Account
      </Text>
    </View>
    
  );
}
export default LoginScreen