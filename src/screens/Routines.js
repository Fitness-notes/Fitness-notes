import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Spinner from "../components/spinner/Spinner";
import Workout from "../components/Workout/Workout";
import { UserDataContext } from "../context/user";

export default function Exercises() {
  const { userData } = useContext(UserDataContext);

  const handleAddWorkout = () => {

    console.log('Add Workout');
  };
  return (
    <View style={styles.container}>
      {!userData ? (
        <Spinner/>
      ) : userData?.workouts?.length > 0 ? (
        <FlatList
          data={userData.workouts}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Workout workout={item} />}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noWorkoutsText}>No workouts yet</Text>
      )}
    <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: "10%",
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
