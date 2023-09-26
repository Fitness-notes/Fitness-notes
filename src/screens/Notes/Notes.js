import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Spinner from "../../components/spinner/Spinner";
import { UserDataContext } from "../../context/user";
import { exercisesServices } from "../../services/firestore";
import { styles } from "./notes.style";

function InputField({ placeholder, label, onChangeText }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        contextMenuHidden={true}
        style={styles.input}
        keyboardType="numeric"
        placeholder={placeholder}
        onChangeText={onChangeText}
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
  const { userData, toggleRefreshData } = useContext(UserDataContext);
  const handleSaveLog = async () => {
    setLoading(true);
    let safeLog = await exercisesServices.safeLog(userData.id, { ...log, name: exercise.name });
    if (safeLog) alert("logged!");
    await toggleRefreshData();
    setLoading(false);
  };

  const exerciseLogs = useMemo(() => {
    return userData.exercises.find((x) => x.name === exercise.name).logs.slice(0, 5);
  }, [userData]);


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
          <Spinner />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSaveLog}>
            <Text style={styles.buttonText}>Save Log</Text>
          </TouchableOpacity>
        )}
        {exercise.logs.length > 0 ? (
          <FlatList
            data={exerciseLogs}
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

