import React, { useState, useContext } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { UserDataContext } from "../context/user";

function AddExerciseModal({ isVisible, onClose }) {
const { userData } = useContext(UserDataContext);
  const [exerciseName, setExerciseName] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExercise = () => {

    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={exerciseName}
          onChangeText={setExerciseName}
        />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            {/* Populate Picker items with available categories */}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={handleAddExercise} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: '50%',
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      },
  pickerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddExerciseModal;