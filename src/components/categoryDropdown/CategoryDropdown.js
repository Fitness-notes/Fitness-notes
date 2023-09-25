import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./categoryDropdown.style";
export default function CategoryDropdown({ title, children }) {
  const [active, setActive] = useState(true);

  const handlePress = () => {
    setActive(!active);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.headerDropdown}>
        <Text style={styles.title}>{title}</Text>
        <AntDesign name={active ? "arrowdown" : "arrowup"} size={24} color="black" />
      </TouchableOpacity>
      {active && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
}

