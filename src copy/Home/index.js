import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import tailwind from "tailwind-rn";

import firebase from "../../firebase";

export class Home extends Component {
  state = {
    userData: {},
  };

  handleLogOut = () => {
    console.log("Button Pressed");
    firebase
      .auth()
      .signOut()
      .then(() => {
        () => this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setUserData = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ userData: user });
    } else {
      this.props.navigation.navigate("Login");
    }
  });
  render() {
    const { userData } = this.state;
    return (
      <View
        style={tailwind(
          "justify-center items-center m-4 bg-blue-200 px-3 py-1 rounded-md"
        )}
      >
        <Text> Welcome! </Text>
        <Text>{userData.displayName}</Text>
        <Image
          source={{ uri: userData.photoURL }}
          style={tailwind("w-20 h-20 rounded-full mt-10")}
        />
        <TouchableOpacity
          style={tailwind("w-24 h-8 mt-16 bg-gray-200 rounded-xl")}
          onPress={this.handleLogOut}
        >
          <View style={tailwind("justify-center items-center")}>
            <Text>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
