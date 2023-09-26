import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "../../../firebase.config";
import { exercisesServices } from "../../services/firestore";
import Spinner from "../../components/spinner/Spinner";
import { styles } from "./login.style";

export default function Login() {
  const [email, setEmail] = useState("malfoy@gmail.com");
  const [password, setPassword] = useState("x30011");
  const [loading, setLoading] = useState(false);
  const auth = AUTH;

  const login = async () => {
    setLoading(true);
    try {
      if (password.length === "" || email === "") {
        alert("Email or password cannot be empty");
        return;
      }
      if (!/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i.test(email)) {
        //email address check, https://stackoverflow.com/questions/6646613/please-explain-this-e-mail-validation-regular-expression
        alert("Enter a valid email address.");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);

      // console.log(response._tokenResponse.idToken)
      // console.log(response.user.uid)
      await exercisesServices.initUser(response.user);
      // await AsyncStorage.setItem('jwtToken',response._tokenResponse.idToke )
      // console.log('my storage', await AsyncStorage.getItem('jwtToken'))

      alert("User Created!");
    } catch (error) {
      alert("Email already registered");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Fitness Notes</Text>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A5A5A5"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A5A5A5"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
    </View>

    {loading ? (
      <Spinner/>
    ) : (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )}
  </SafeAreaView>
  );
}


