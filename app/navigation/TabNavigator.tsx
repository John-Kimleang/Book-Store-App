import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Login/LoginScreen"; 

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
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
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
      <Tab.Screen name="AudioBook" component={LoginScreen} />
      <Tab.Screen name="Book" component={LoginScreen} />
      <Tab.Screen name="Cart" component={LoginScreen} />
      <Tab.Screen name="Favorite" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;