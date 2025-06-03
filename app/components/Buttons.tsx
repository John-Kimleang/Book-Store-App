import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "back" | "next";
}

const Buttons: React.FC<ButtonProps> = ({ title, onPress, type = "next" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, type === "back" ? styles.backButton : styles.nextButton]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: "#007BFF",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Buttons;
