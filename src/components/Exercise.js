import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icons

export default function Exercise({ exercise }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Notes", { exercise });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="dumbbell" size={24} color="#4A4A4A" />
      </View>
      <Text style={styles.exercise}>{exercise.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    marginRight: 10,
  },
  exercise: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4A4A4A",
  },
});
