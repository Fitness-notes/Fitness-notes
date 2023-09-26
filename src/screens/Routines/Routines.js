import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View, FlatList } from "react-native";
import Spinner from "../../components/spinner/Spinner";
import Workout from "../../components/workout/Workout";
import { UserDataContext } from "../../context/user";
import { styles } from "./routines.style";

export default function Exercises() {
  const { userData } = useContext(UserDataContext);
  const navigation = useNavigation();

  const handleAddWorkout = () => {
    navigation.navigate("Create-workout");
    console.log("Add Workout");
  };
  return (
    <View style={styles.container}>
      {!userData ? (
        <Spinner />
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

