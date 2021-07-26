import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import tailwind from "tailwind-rn";

import firebase from "../../firebase";

export default class LoginWithPhone extends Component {
  state = {
    phoneNumber: "",
    password: "",
    errors: [],
    loading: false,
  };

  // validateEmail = ({ email }) => {
  //   let emailCharSet = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  //   if (emailCharSet.test(email) === false) {
  //     // Email not correct
  //     return false;
  //   } else {
  //     // Email is correct
  //     return true;
  //   }
  // };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Please fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      //form valid
      return true;
    }
  };

  isFormEmpty = ({ phoneNumber, password }) => {
    return !phoneNumber.length || !password.length;
  };

  displayError = (errors) =>
    errors.map((error, i) => (
      <Text key={i} style={tailwind("text-red-600")}>
        {error.message}
      </Text>
    ));

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      console.log("Phone sign In Pressed");

      // Need Changes

      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.state.email, this.state.password)
      //   .then((signedInUser) => {
      //     console.log(signedInUser);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.setState({
      //       errors: this.state.errors.concat(err),
      //       loading: false,
      //     });
      //   });
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? tailwind("mt-2 border-b-2 rounded-lg border-red-500")
      : tailwind("mt-2 border-b-2 rounded-lg border-gray-500");
  };

  render() {
    const { phoneNumber, password, errors, loading } = this.state;
    return (
      <View style={tailwind("px-2 mt-4 relative rounded-lg")}>
        <View style={this.handleInputError(errors, "phoneNumber")}>
          <TextInput
            placeholder="Phone Number"
            textContentType="telephoneNumber"
            name="phoneNumber"
            onChange={(text) =>
              this.setState({ phoneNumber: text.nativeEvent.text })
            }
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={this.handleInputError(errors, "password")}>
          <TextInput
            placeholder="Password"
            textContentType="password"
            name="password"
            onChange={(text) =>
              this.setState({ password: text.nativeEvent.text })
            }
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={password}
            secureTextEntry
          />
        </View>
        <View style={tailwind("w-full mt-10 justify-center items-center")}>
          {errors.length > 0 && (
            <Text style={tailwind("text-red-600")}>
              {this.displayError(errors)}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={tailwind("mt-1 mb-4 items-center")}
          onPress={this.handleSubmit}
          disabled={loading}
        >
          <View
            style={tailwind(
              "rounded-lg w-24 h-12 bg-black justify-center items-center"
            )}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={tailwind("text-white text-base")}>Sign in</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
