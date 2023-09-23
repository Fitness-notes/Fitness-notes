import React, { useState, useContext } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { UserDataContext } from "../context/user";
import { exercisesServices } from "../services/firestore";

function InputField({ placeholder, label, onChangeText }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        contextMenuHidden={true}
        style={styles.input}
        keyboardType="numeric"
        placeholder={placeholder}
        onChangeText={onChangeText} // Forwarding onChangeText prop to TextInput
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function Notes({
  route: {
    params: { exercise },
  },
}) {
  const [log, setLog] = useState({ weigth: 0, reps: 0 });
  const [loading, setLoading] = useState(false);
  const { userData, _, toggleRefreshData } = useContext(UserDataContext);
  const handleSaveLog = async () => {
    setLoading(true);
    let safeLog = await exercisesServices.safeLog(userData.id, { ...log, name: exercise.name });
    if (safeLog) alert("logged!");
    await toggleRefreshData();
    setLoading(false);
  };

  const renderLog = ({ item }) => (
    <View style={styles.logContainer}>
      <Text style={styles.logText}>
        Weight: <Text style={styles.logDetail}>{item.weigth}</Text>
      </Text>
      <Text style={styles.logText}>
        Reps: <Text style={styles.logDetail}>{item.reps}</Text>
      </Text>
      <Text style={styles.timestamp}>
        {new Date(item.timeStamp).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
      </Text>
    </View>
  );
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <InputField
          placeholder="0"
          label="Weight"
          onChangeText={(text) => setLog({ ...log, weigth: text })}
        />
        <InputField
          placeholder="0"
          label="Reps"
          onChangeText={(text) => setLog({ ...log, reps: text })}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#00BFFF" style={{ marginTop: "50%" }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSaveLog}>
            <Text style={styles.buttonText}>Save Log</Text>
          </TouchableOpacity>
        )}
        {exercise.logs.length > 0 ? (
          <FlatList
            data={exercise.logs.slice(0, 5)}
            renderItem={renderLog}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        ) : (
          <Text style={styles.noLogsText}>No logs</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    paddingTop: "20%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 2.61,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
  exerciseInfo: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#ccc",
  },
  logContainer: {
    marginLeft: "10%",
    marginBottom: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    width: "80%",
  },
  logText: {
    fontSize: 16,
    color: "#333",
  },
  logDetail: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  noLogsText: {
    marginTop: 20,
    fontSize: 18,
    color: "#666",
    fontStyle: "italic",
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
