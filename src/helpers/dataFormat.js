const dataFormatHelper = {
  groupByCategory(exercises) {
    const groupedExercises = {};
    exercises.forEach((exercise) => {
      const category = exercise.category;
      if (groupedExercises[category]) {
        groupedExercises[category].push(exercise);
      } else {
        groupedExercises[category] = [exercise];
      }
    });
    return groupedExercises;
  },
};

export default dataFormatHelper;
