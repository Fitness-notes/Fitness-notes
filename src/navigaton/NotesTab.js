import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Routines from "../screens/Routines/Routines"
import Exercises from "../screens/Exercises/Exercises"
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
export const NotesTab = () => {
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