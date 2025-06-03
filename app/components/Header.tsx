import { TextInput, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-gray-100 shadow-md pt-20 ">
      <View className="flex-row items-center flex-1 border border-gray-300 rounded-3xl px-4 py-2 mr-4">
        <Ionicons name="search" size={20} color="gray" className="mr-2" />
        <TextInput
          className="flex-1 text-base"
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>

      <TouchableOpacity className="mr-4">
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require("../../assets/images/react-logo.png")} 
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;