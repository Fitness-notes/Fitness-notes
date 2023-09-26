import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";
import { AUTH } from "../firebase.config";
import Login from "./screens/Login/Login";
import Routines from "./screens/Routines/Routines";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Exercises from "./screens/Exercises/Exercises";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { exercisesServices } from "./services/firestore";
import { UserDataContext } from "./context/user";
import Notes from "./screens/Notes/Notes";
import CreateWorkout from "./screens/CreateWorkout/CreateWorkout";
import { NotesTab } from "./navigaton/NotesTab";
import WorkoutDetail from "./screens/WorkoutDetail/WorkoutDetail";

const Stack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

authStack = createNativeStackNavigator();
export default function Main() {
  const [user, setUser] = useState(null);
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    onAuthStateChanged(AUTH, async (user) => {
      setUser(user);
      if (user) {
        let data = await exercisesServices.getUserData(user.uid);
        setUserData(data);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {user ? (
        <AppStack.Navigator>
          <AppStack.Screen name="Home" component={NotesTab} />
          <AppStack.Screen name="Notes" component={Notes} />
          <AppStack.Screen name="Create-workout" component={CreateWorkout}/>
          <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
        </AppStack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

