import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { LogBox } from "react-native";

import firebase from "./firebase";

import Home from "./src/Home";
import Login from "./src/Login";
import Register from "./src/Register";

const Stack = createStackNavigator();

const initialRoute = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
};

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={!initialRoute ? "Login" : "Home"}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
// export default class LoginWithEmail extends Component
export default class App extends React.Component {
  render() {
    LogBox.ignoreLogs(["Setting a timer"]);
    return (
      <NavigationContainer>
        <MyStack />

        {/* ------------ Expo StatusBar ---------- */}
        <StatusBar style="dark" />
      </NavigationContainer>
    );
  }
}
