import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    workoutContainer: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      marginVertical: 8,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      width: '100%',
    },
    workoutTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    workoutDate: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    exercisesContainer: {
      marginTop: 10,
    },
    exerciseText: {
      fontSize: 16,
      color: '#333',
    },
  });