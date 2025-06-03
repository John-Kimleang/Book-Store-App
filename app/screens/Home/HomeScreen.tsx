import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold mb-4">Welcome Home!</Text>

    </View>
  );
};

export default HomeScreen;
