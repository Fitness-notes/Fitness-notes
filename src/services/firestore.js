import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  serverTimestamp,
  query,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";
import { Firestore } from "../../firebase.config";

const Database = Firestore;
const EX_COL = collection(Database, "exercises");
const USER_DATA = collection(Database, "userData");

export const exercisesServices = {
  async getAll() {
    const q = await getDocs(EX_COL);
    let exercises = [];
    q.forEach((doc) => {
      exercises.push(doc.data());
    });
    console.log(exercises);
  },

  async initUser(user) {
    try {
      const q = await getDocs(EX_COL);
      let exercises = [];
      q.forEach((doc) => {
        exercises.push(doc.data());
      });

      await addDoc(USER_DATA, { id: user.uid, email: user.email, exercises, workouts: [] });
    } catch (e) {
      console.error("DB Error:", e);
    }
  },

  async getUserData(userId) {
    try {
      console.log(userId);
      const q = query(USER_DATA, where("id", "==", userId));
      const querySnapshot = await getDocs(q);
      let userDoc;
      querySnapshot.forEach((document) => {
        userDoc = document.data();
      });
      userDoc["exercises"].forEach((exercise) => {
        exercise["logs"].sort((a, b) => b.timeStamp - a.timeStamp);
      });
      console.log(userDoc);
      return userDoc;
    } catch (e) {
      console.log("db error");
    }
  },

  async safeLog(userId, log) {
    console.log(userId, log);
    try {
      let sendLog = { ...log, timeStamp: Date.now() };
      const q = query(USER_DATA, where("id", "==", userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.error("User not found");
        return false;
      }
      if (!querySnapshot.empty) {
        let userDocId;
        let userData;
        querySnapshot.forEach((doc) => {
          userDocId = doc.id;
          userData = doc.data();
        });

        const exerciseIndex = userData.exercises.findIndex(
          (exercise) => exercise.name === sendLog.name //Names cannot be the sabe in exercises
        );

        if (exerciseIndex === -1) {
          console.error("Exercise not found");
          return false;
        }
        userData.exercises[exerciseIndex].logs.push(sendLog);
        await setDoc(doc(USER_DATA, userDocId), userData);
        return true;
      }
    } catch (e) {
      console.error("DB Error:", e);
      return false;
    }
  },
  async addExercise(userId, exercise) {
    try {
      const q = query(USER_DATA, where("id", "==", userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.error("User not found");
        return false;
      }

      let userDocId;
      let userData;

      querySnapshot.forEach((doc) => {
        userDocId = doc.id;
        userData = doc.data();
      });

      const exerciseExists = userData.exercises.some(
        (e) => e.name === exercise.name && e.category === exercise.category
      );
      if (exerciseExists) {
        console.error("Exercise already exists");
        return false;
      }

      userData.exercises.push(exercise);

      await setDoc(doc(USER_DATA, userDocId), userData);

      console.log("Exercise added successfully");
      return true;
    } catch (e) {
      console.error("DB Error:", e);
      return false;
    }
  },

  async saveWorkout(userId, workoutName, exercises) {
    try {
      const q = query(USER_DATA, where("id", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User not found");
        return false;
      }

      let userDocId;
      querySnapshot.forEach((doc) => {
        userDocId = doc.id;
      });

      const workout = {
        name: workoutName,
        exercises: exercises,
        created_at: Date.now(),
      };

      const userDocRef = doc(USER_DATA, userDocId);
      await updateDoc(userDocRef, {
        workouts: arrayUnion(workout),
      });

      console.log("Workout added successfully");
      return true;
    } catch (e) {
      console.error("DB Error:", e);
      return false;
    }
  },
};
