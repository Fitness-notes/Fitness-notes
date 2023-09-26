import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    addButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    listContainer: {
      paddingHorizontal: "10%",
      paddingBottom: 10,
    },
    exerciseContainer: {
      backgroundColor: "#FFFFFF",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    exerciseText: {
      fontSize: 18,
      color: "#333",
    },
    noWorkoutsText: {
      fontSize: 20,
      color: "#666",
    },
  });
