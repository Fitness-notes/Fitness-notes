import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";
import { AUTH } from "../firebase.config";
import Login from "./screens/Login";
import Routines from "./screens/Routines";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Exercises from "./screens/Exercises";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { exercisesServices } from "./services/firestore";
import UserContext, { UserDataContext } from "./context/user";
import Notes from "./screens/Notes";

const Stack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

authStack = createNativeStackNavigator();
export default function Main() {
  const [user, setUser] = useState(null);
  const { _, setUserData } = useContext(UserDataContext);

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

const NotesTab = () => {
  return (
    <Tab.Navigator initialRouteName="Routines">
      <Tab.Screen
        name="Routines"
        component={Routines}
        options={{
          headerShown: false,
          tabBarLabel: "Routines",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="bookmark-outline" size={24} color={focused ? "blue" : "black"} />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          headerShown: false,
          tabBarLabel: "Exercises",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="arm-flex-outline"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
