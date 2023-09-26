import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icons
import { styles } from "./exercise.style";
export default function Exercise({ exercise, onPress, selected }) {

  const containerStyle = selected
  ? [styles.container, styles.selectedContainer]
  : styles.container;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="dumbbell" size={24} color="#4A4A4A" />
      </View>
      <Text style={styles.exercise}>{exercise.name}</Text>
    </TouchableOpacity>
  );
}


