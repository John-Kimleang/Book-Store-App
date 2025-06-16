import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";
import BookScreen from "../screens/books/BookScreen";
import AudioBookScreen from "../screens/audios/AudioBookScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AudioBook") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "Book") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else {
            iconName = "ellipse"; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray", 
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AudioBook" component={AudioBookScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="Cart" component={LoginScreen} />
      <Tab.Screen name="Bookmark" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;