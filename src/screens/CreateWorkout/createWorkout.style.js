import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    inputContainer: {
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
    input: {
      height: 40,
      borderColor: "#4CAF50",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      alignItems: "center",
    },
    button: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    saveButton: {
      backgroundColor: "#FFA500",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
    addedExerciseListContainer: {
      maxHeight: 100, // Adjust the maximum height as needed
      overflow: "hidden",
    },
    addedExerciseList: {
      padding: 10,
      backgroundColor: "#f0f0f0",
    },
    addedExerciseContainer: {
      padding: 10,
      backgroundColor: "#fff",
      marginBottom: 5,
      borderRadius: 5,
      borderColor: "#ddd",
      borderWidth: 1,
    },
    addedExerciseText: {
      fontSize: 16,
    },
  });