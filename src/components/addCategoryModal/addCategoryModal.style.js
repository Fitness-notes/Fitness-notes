import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    modalContainer: {
      marginTop: "50%",
      marginHorizontal: 20,
      padding: 20,
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    addButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    cancelButton: {
      backgroundColor: "#f44336",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
  });