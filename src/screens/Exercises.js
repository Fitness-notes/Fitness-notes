import React, { useContext, useState, useMemo } from "react";
import { View, Text, SafeAreaView, ActivityIndicator, FlatList, Button } from "react-native";
import CategoryDropdown from "../components/CategoryDropdown";
import Exercise from "../components/Exercise";
import { UserDataContext } from "../context/user";
import dataFormatHelper from "../helpers/dataFormat";
import AddCategoryModal from "../components/AddCategoryModal";
import AddExerciseModal from "../components/AddExerciseModal";
export default function Exercises() {
  const { userData } = useContext(UserDataContext);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);

  const exercisesData = useMemo(() => {
    if (!userData) return [];
    const exercisesObj = dataFormatHelper.groupByCategory(userData.exercises);
    return Object.keys(exercisesObj).map((key) => ({
      category: key,
      exercises: exercisesObj[key],
    }));
  }, [userData]);

  const renderCategory = ({ item }) => (
    <CategoryDropdown title={item.category}>
      {item.exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </CategoryDropdown>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!userData ? (
        <ActivityIndicator size="large" color="#00BFFF" style={{ marginTop: "50%" }} />
      ) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <Button title="New Category" onPress={() => setCategoryModalVisible(true)} />
            <Button title="New Exercise" onPress={() => setExerciseModalVisible(true)} />
          </View>
          <FlatList
            data={exercisesData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCategory}
            contentContainerStyle={{ padding: 10 }}
          />
        </>
      )}
      <AddCategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
      />
      <AddExerciseModal
        isVisible={isExerciseModalVisible}
        onClose={() => setExerciseModalVisible(false)}
      />
    </SafeAreaView>
  );
}
