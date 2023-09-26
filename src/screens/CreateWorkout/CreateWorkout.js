import React, { useContext, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Exercise from "../../components/excersise/Exercise";
import { UserDataContext } from "../../context/user";
import CategoryDropdown from "../../components/categoryDropdown/CategoryDropdown";
import { exercisesServices } from "../../services/firestore";
import { useNavigation } from "@react-navigation/native";
import Spinner from "../../components/spinner/Spinner";
import { styles } from "./createWorkout.style";

export default function CreateWorkout() {
  const { userData, toggleRefreshData, formatedExercises } = useContext(UserDataContext);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const renderCategory = ({ item }) => (
    <CategoryDropdown title={item.category}>
      {item.exercises.map((exercise, index) => (
        <Exercise
          key={index}
          exercise={exercise}
          onPress={() => handleExercisePress(exercise)}
          selected={selectedExercise === exercise.name}
        />
      ))}
    </CategoryDropdown>
  );

  const handleExercisePress = (exercise) => {
    if (selectedExercise === exercise.name) {
      setSelectedExercise(null);
    } else {
      setSelectedExercise(exercise.name);
    }
  };

  const handleAddExercise = () => {
    if (!selectedExercise) {
      alert("Select and exercise");
      return;
    }
    setExercises([...exercises, selectedExercise]);
    setSelectedExercise(null);
    console.log(exercises);
  };

  const handleSaveWorkout = async () => {

    if (exercises.length < 2) {
      alert("You need to have at least 2 exercises for a workout");
      return;
    }
    if (workoutName.length === 0) {
      alert("Please give your workout a name");
      return;
    }
    try {
      setLoading(true)
      const isSaved = await exercisesServices.saveWorkout(userData.id, workoutName, exercises);
      if (isSaved) {
        alert("Workout saved!");
        toggleRefreshData();
        setWorkoutName("");
        setExercises([]);
        setSelectedExercise(null);
        navigation.navigate("Home");
      } else {
        alert("Error saving workout");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving workout");
      setLoading(false)
    }
    setLoading(false)
  };

  const renderAddedExercise = ({ item }) => (
    <View style={styles.addedExerciseContainer}>
      <Text style={styles.addedExerciseText}>{item}</Text>
    </View>
  );

  return (
    <>
    {loading ? <Spinner/> : <View style={{ flex: 1 }}>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
    </View>

    <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.addedExerciseListContainer}>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAddedExercise}
        contentContainerStyle={styles.addedExerciseList}
      />
    </View>

    <FlatList
      data={formatedExercises}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCategory}
      contentContainerStyle={{ padding: 10 }}
      scrollEnabled={true}
    />
  </View>}
  </>
  );
}
