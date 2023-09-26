import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './workout.style';
import { useNavigation } from '@react-navigation/native';
function Workout({ workout }) {
  const navigation = useNavigation();
  const date = new Date(workout.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePress = () => {
    navigation.navigate('WorkoutDetail', { workout });
  };

  return (
    <TouchableOpacity style={styles.workoutContainer} onPress={handlePress}>
      <Text style={styles.workoutTitle}>{workout.name}</Text>
      <Text style={styles.workoutDate}>{new Date(workout.created_at).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
}

export default Workout;