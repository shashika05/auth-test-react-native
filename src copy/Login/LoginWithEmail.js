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

export default class LoginWithEmail extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  validateEmail = ({ email }) => {
    let emailCharSet = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (emailCharSet.test(email) === false) {
      // Email not correct
      return false;
    } else {
      // Email is correct
      return true;
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Please fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.validateEmail(this.state)) {
      //throw error
      error = { message: "Email is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      //form valid
      return true;
    }
  };

  isFormEmpty = ({ email, password }) => {
    return !email.length || !password.length;
  };

  displayError = (errors) =>
    errors.map((error, i) => (
      <Text key={i} style={tailwind("text-red-600")}>
        {error.message}
      </Text>
    ));

  handleSubmit = (event) => {
    let errors = [];
    let error;
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          if (signedInUser.user.emailVerified) {
            this.props.navigation.navigate("Home");
            // error = { message: "Email is invalid" };
            this.setState({
              // errors: errors.concat(error),
              loading: false,
            });
          } else {
            error = { message: "Email is not verified" };
            this.setState({
              errors: errors.concat(error),
              loading: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
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
    const { email, password, errors, loading } = this.state;
    return (
      <View style={tailwind("px-2 mt-4 relative rounded-lg")}>
        <View style={this.handleInputError(errors, "email")}>
          <TextInput
            placeholder="Email"
            textContentType="emailAddress"
            name="email"
            onChange={(text) => this.setState({ email: text.nativeEvent.text })}
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={email}
            keyboardType="email-address"
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
