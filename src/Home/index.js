import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import tailwind from "tailwind-rn";

import firebase from "../../firebase";

export class Home extends Component {
  state = {
    userData: {},
  };

  handleLogOut = () => {
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
    if (!userData.emailVerified) {
      this.handleLogOut();
    }
    return (
      <View style={tailwind("mt-32 ml-4 mr-4 items-center z-10")}>
        <View
          style={tailwind(
            "p-14 w-full bg-white rounded-xl items-center overflow-hidden p-6"
          )}
        >
          <Text style={tailwind("text-gray-900  text-3xl")}> Welcome! </Text>
          <Text>{userData.displayName}</Text>
          <Image
            source={{ uri: userData.photoURL }}
            style={tailwind("w-20 h-20 rounded-full m-10")}
          />
          <TouchableOpacity
            style={tailwind("mt-1 mb-4 items-center")}
            onPress={this.handleLogOut}
          >
            <View
              style={tailwind(
                "rounded-lg w-24 h-10 bg-black justify-center items-center"
              )}
            >
              <Text style={tailwind("text-white text-lg")}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Home;
