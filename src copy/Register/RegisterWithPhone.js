import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

import firebase from "../../firebase";

export default class RegisterWithPhone extends Component {
  state = {
    username: "",
    phonenumber: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  };
  // const [username, setUsername] = useState("");
  // const [phonenumber, setphonenumber] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [errors, setErrors] = useState([""]);

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

  // handleChange = (change) => {
  //   this.setState(this.state.change);
  // };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Please fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      //throw error
      error = { message: "The password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
      // } else if (!this.validateEmail(this.state)) {
      //   //throw error
      //   error = { message: "Email is invalid" };
      //   this.setState({ errors: errors.concat(error) });
      //   return false;
    } else {
      //form valid
      return true;
    }
  };

  isFormEmpty = ({ username, phonenumber, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !phonenumber.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayError = (errors) =>
    errors.map((error, i) => (
      <Text key={i} style={tailwind("text-red-600")}>
        {error.message}
      </Text>
    ));

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithPhoneNumber()
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `https://ui-avatars.com/api/?background=random&name=${this.state.username}&size=160`,
            })
            .then(() => {
              createdUser.user.sendEmailVerification();
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                firebase.auth().signOut();
                // Needs to changes loadings routes
                // Set Email verfication sent function for show custom View
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            });
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

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? tailwind("mt-2 border-b-2 rounded-lg border-red-500")
      : tailwind("mt-2 border-b-2 rounded-lg border-gray-500");
  };
  render() {
    const {
      username,
      phonenumber,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;
    return (
      <View style={tailwind("px-2 mt-4 relative rounded-lg")}>
        <View style={tailwind("mt-2 border-b-2 rounded-lg border-gray-500")}>
          <TextInput
            placeholder="Username"
            textContentType="username"
            keyboardType="default"
            onChange={(text) =>
              this.setState({ username: text.nativeEvent.text })
            }
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={username}
          />
        </View>
        <View style={tailwind("mt-2 border-b-2 rounded-lg border-gray-500")}>
          <TextInput
            placeholder="Phone Number"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            onChange={(text) =>
              this.setState({ phonenumber: text.nativeEvent.text })
            }
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={phonenumber}
            maxLength={10}
          />
        </View>
        <View style={tailwind("mt-2 border-b-2 rounded-lg border-gray-500")}>
          <TextInput
            placeholder="Password"
            textContentType="password"
            onChange={(text) =>
              this.setState({ password: text.nativeEvent.text })
            }
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={password}
            secureTextEntry
          />
        </View>
        <View style={tailwind("mt-2 border-b-2 rounded-lg border-gray-500")}>
          <TextInput
            placeholder="Confirm Passowrd"
            textContentType="password"
            onChange={(text) =>
              this.setState({ passwordConfirmation: text.nativeEvent.text })
            }
            style={tailwind("p-2 w-full text-lg bg-transparent")}
            value={passwordConfirmation}
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
          // disabled={emailValidation} // Need changes
        >
          <View
            style={tailwind(
              "rounded-lg w-24 h-12 bg-black justify-center items-center"
            )}
          >
            <Text
              // Need Changes
              style={tailwind("text-white text-base")}
            >
              Sign up
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
