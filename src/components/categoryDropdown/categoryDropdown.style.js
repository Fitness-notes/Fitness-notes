import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "rgb(229,229,234)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    headerDropdown: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: "rgb(255, 255, 255)",
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
    },
    childrenContainer: {
      padding: 10,
      paddingHorizontal: 20,
    },
  });