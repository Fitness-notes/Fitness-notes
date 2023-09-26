import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './wourkoutDetail.style';

export default function WorkoutDetail() {
  const route = useRoute();
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text>Date: {new Date(workout.created_at).toLocaleDateString()}</Text>
      <View>
        {workout.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <Text>{exercise}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

