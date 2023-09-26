import React, { useContext, useState, useMemo } from "react";
import { View, SafeAreaView, FlatList, Button } from "react-native";
import CategoryDropdown from "../../components/categoryDropdown/CategoryDropdown";
import Exercise from "../../components/excersise/Exercise";
import { UserDataContext } from "../../context/user";
import AddExerciseModal from "../../components/addExerciseModal/AddExerciseModal";
import Spinner from "../../components/spinner/Spinner";
import { useNavigation } from "@react-navigation/native";
export default function Exercises() {
  const { userData, formatedExercises } = useContext(UserDataContext);
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);
  const navigation = useNavigation();

  const renderCategory = ({ item }) => (
    <CategoryDropdown title={item.category}>
      {item.exercises.map((exercise, index) => (
        <Exercise key={index} exercise={exercise} onPress={()=>handleExercisePress(exercise)} />
      ))}
    </CategoryDropdown>
  );

  const handleExercisePress = (exercise) => {
    navigation.navigate("Notes", { exercise });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!userData ? (
        <Spinner />
      ) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <Button title="New Exercise" onPress={() => setExerciseModalVisible(true)} />
          </View>
          <FlatList
            data={formatedExercises}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCategory}
            contentContainerStyle={{ padding: 10 }}
          />
        </>
      )}
      <AddExerciseModal
        isVisible={isExerciseModalVisible}
        onClose={() => setExerciseModalVisible(false)}
      />
    </SafeAreaView>
  );
}
