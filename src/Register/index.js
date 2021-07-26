import React, { Component } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

import RegisterWithEmail from "./RegisterWithEmail";

export class Register extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={tailwind("mt-32 ml-4 mr-4 items-center z-10")}>
        <View
          style={tailwind(
            "p-14 w-full bg-white rounded-xl overflow-hidden p-6"
          )}
        >
          <Text style={tailwind("text-4xl font-bold text-center text-black")}>
            Register
          </Text>
          <View
            style={tailwind("items-center w-full mt-4 flex-row justify-center")}
          >
            <Text style={tailwind("text-gray-900 text-base")}>
              Register with email
            </Text>
          </View>
          <RegisterWithEmail />
          {/* REGISTER route */}
          <View style={tailwind("justify-center items-center")}>
            <Text style={tailwind("text-gray-600")}>Already Registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={tailwind("text-blue-600")}>Login from here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Register;
