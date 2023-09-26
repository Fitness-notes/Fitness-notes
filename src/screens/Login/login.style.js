import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F3F3',
      alignItems: "center",
      paddingTop: "30%",
    },
    title: {
      fontSize: 36,
      fontWeight: '700',
      color: '#333',
      marginBottom: 40,
    },
    inputContainer: {
      width: "80%",
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#FFFFFF',
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    button: {
      backgroundColor: '#00BFFF',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
  })