import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { UserDataContext } from "../../context/user";
import dataFormatHelper from "../../helpers/dataFormat";
import { styles } from "./addExerciseModal.style";
import { exercisesServices } from "../../services/firestore";
import Spinner from "../spinner/Spinner";

const newExerciseProps = { name: "", category: "chest", logs: [] };
function AddExerciseModal({ isVisible, onClose }) {
  const { userData, _, toggleRefreshData } = useContext(UserDataContext);
  const [errors, setErrors] = useState({ execiseNameError: true, exerciseCategoryError: false });
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newExercise, setNewExercise] = useState(newExerciseProps);
  const [Loading, setLoading] = useState(false);

  const handleAddExercise = async () => {
    setLoading(true)
    if (newExercise.name.trim().length < 3) {
      setErrors({ ...errors, exerciseNameError: true });
      return;
    }
    if (isNewCategory && newExercise.category.trim().length < 3) {
      setErrors({ ...errors, exerciseCategoryError: true });
      return;
    }
    let response = await exercisesServices.addExercise(userData.id, newExercise);
    if (response) {
      alert("Exercise Added!");
    } else {
      alert("Error adding exercise, check if exercise already exists");
    }
    setNewExercise(newExerciseProps);
    toggleRefreshData();
    setLoading(false)
    onClose();
  };

  const handleSwitchChange = () => {
    setIsNewCategory(!isNewCategory);
    if (!isNewCategory) setNewExercise({ ...newExercise, category: "chest" });
  };
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Add Exercise</Text>
          {errors.exerciseNameError && (
            <Text style={styles.errorLabel}>
              Exercise Name is required and must be at least 3 characters
            </Text>
          )}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors.exerciseNameError ? "red" : "#ddd",
            }}
            placeholder="Exercise Name"
            value={newExercise.name}
            onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
            onEndEditing={() => setErrors({ ...errors, exerciseNameError: false })}
          />
          <View style={styles.switchContainer}>
            <Switch value={isNewCategory} onValueChange={handleSwitchChange} />
            <Text style={styles.switchLabel}>
              {isNewCategory ? "New Category" : "Select Category"}
            </Text>
          </View>
          {isNewCategory ? (
            <>
              {errors.exerciseCategoryError && (
                <Text style={styles.errorLabel}>
                  Category is required and must be at least 3 characters
                </Text>
              )}
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: errors.exerciseCategoryError ? "red" : "#ddd",
                }}
                placeholder="New Category"
                value={newExercise.category}
                onChangeText={(text) => setNewExercise({ ...newExercise, category: text })}
                editable={isNewCategory}
                onEndEditing={() => setErrors({ ...errors, exerciseCategoryError: false })}
              />
            </>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newExercise.category}
                onValueChange={(text) => setNewExercise({ ...newExercise, category: text })}
                enabled={!isNewCategory}
              >
                {userData ? (
                  Object.keys(dataFormatHelper.groupByCategory(userData.exercises)).map((key) => (
                    <Picker.Item label={key} value={key} key={key} />
                  ))
                ) : (
                  <></>
                )}
              </Picker>
            </View>
          )}
          {Loading ? (
            <Spinner/>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AddExerciseModal;
