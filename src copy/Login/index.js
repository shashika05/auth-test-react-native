import React, { Component } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

import LoginWithEmail from "./LoginWithEmail";
import LoginWithPhone from "./LoginWithPhone";

export class Login extends Component {
  state = {
    toggle: false,
  };

  toggleChange = (event) => {
    this.setState({ [this.state.toggle]: !this.state.toggle });
  };

  render() {
    const { toggle } = this.state;
    const { navigation } = this.props;
    return (
      <View style={tailwind("mt-32 ml-4 mr-4 items-center z-10")}>
        <View
          style={tailwind(
            "p-14 w-full bg-white rounded-xl overflow-hidden p-6"
          )}
        >
          <Text style={tailwind("text-4xl font-bold text-center text-black")}>
            Login
          </Text>
          <View
            style={tailwind("items-center w-full mt-4 flex-row justify-center")}
          >
            <View style={tailwind("items-center pb-1 justify-center")}>
              <Text
                style={
                  toggle
                    ? tailwind("text-gray-900 line-through")
                    : tailwind("text-red-600")
                }
              >
                Email{" "}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={toggle ? "#000" : "#000"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(event) => this.setState({ toggle: !toggle })}
              value={toggle}
            />
            <View style={tailwind("items-center pb-1 justify-center")}>
              <Text
                style={
                  toggle
                    ? tailwind("text-red-600")
                    : tailwind("text-gray-900 line-through")
                }
              >
                Number
              </Text>
            </View>
          </View>
          {toggle ? (
            <LoginWithPhone navigation={navigation} />
          ) : (
            <LoginWithEmail navigation={navigation} />
          )}
          {/* REGISTER route */}
          <View style={tailwind("justify-center items-center")}>
            <Text style={tailwind("text-gray-600")}>Are you new ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={tailwind("text-blue-600")}>Register from here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
