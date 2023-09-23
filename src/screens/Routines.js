import React, { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { UserDataContext } from '../context/user';

export default function Exercises() {
  const { userData } = useContext(UserDataContext);

  useEffect(() => {

  }, []);

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!userData ? (
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : userData?.workouts?.length > 0 ? (
        <FlatList
          data={userData.workouts}
          keyExtractor={(item) => item.name}
          renderItem={renderExercise}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noWorkoutsText}>No workouts yet</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    paddingTop: '10%',
  },
  listContainer: {
    paddingHorizontal: '10%',
  },
  exerciseContainer: {
    backgroundColor: '#FFFFFF',
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
    color: '#333',
  },
  noWorkoutsText: {
    fontSize: 20,
    color: '#666',
  },
});