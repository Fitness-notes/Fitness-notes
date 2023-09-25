import React, { useContext, useState } from "react";
import { Modal, View, TextInput, Text, TouchableOpacity, StyleSheet ,TouchableWithoutFeedback, Keyboard } from "react-native";
import UserContext from "../../context/user";
import { exercisesServices } from "../../services/firestore";
import { styles } from "./addCategoryModal.style";
function AddCategoryModal({ isVisible, onClose }) {
  const [categoryName, setCategoryName] = useState("");
  // const[userData, _, toggleRefreshData] = useContext(UserContext)

  const handleAddCategory = () => {
    // exercisesServices.addCategory
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <Text style={styles.header}>Add Category</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}


export default AddCategoryModal;