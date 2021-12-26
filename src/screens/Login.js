import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { showMessage } from "react-native-flash-message";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setemail] = useState(null);
  const [userPasswrod, setpassword] = useState(null);
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
  });

  useEffect(() => {
    if (auth.currentUser !== null) {
      props.navigation.navigate("Home");
    }
  }, []);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const LoginFunc = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, userEmail, userPasswrod)
      .then((userCredential) => {
        setIsLoading(false);
        props.navigation.navigate("Home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: "danger",
        });
        setIsLoading(false);
      });
  };

  return (
    <View style={styles._container}>
      <StatusBar barStyle="dark-content" />
      {isLoading === true ? (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : null}
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles._h1} fontWeight="bold">
            Welkom terug
          </Text>
          <Text style={styles._desc}>
            Log in op uw account met uw e-mailadres en wachtwoord of gebruik
            social logins om in te loggen.
          </Text>

          <View style={styles._input_row}>
            <Octicons active name="mail" style={{ fontSize: 20 }} />
            <TextInput
              placeholder="Email"
              style={styles._text_input}
              onChangeText={(v) => setemail(v)}
              value={userEmail}
            />
          </View>

          <View style={styles._input_row}>
            <MaterialCommunityIcons
              name="form-textbox-password"
              style={{ fontSize: 20 }}
            />

            <TextInput
              placeholder="Wachtwoord"
              style={styles._text_input}
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(v) => setpassword(v)}
              value={userPasswrod}
            />

            <TouchableOpacity
              onPress={updateSecureTextEntry}
              style={{ position: "absolute", right: 20, bottom: 12 }}
            >
              {data.secureTextEntry ? (
                <Feather
                  name="eye-off"
                  color="black"
                  size={20}
                  style={{ paddingRight: 10, paddingTop: 15 }}
                />
              ) : (
                <Feather
                  name="eye"
                  color="black"
                  size={20}
                  style={{ paddingRight: 10, paddingTop: 15 }}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles._btn} onPress={LoginFunc}>
            <Text style={styles._btn_Text}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Signup")}
            style={{ marginTop: 30 }}
          >
            <Text style={styles._dont_have_account}>
              Heb je geen account?
              <Text style={styles._signup_text}> Inschrijven</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    paddingTop: 60,
  },

  _h1: {
    fontSize: 25,
    marginVertical: 10,
    fontFamily: "Poppins-Bold",
  },
  _desc: {
    fontSize: 12,
    color: "#393434",
    marginBottom: 30,
  },
  _btn: {
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  _btn_Text: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  _text_input: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    paddingLeft: 10,
    flex: 1,
  },
  _input_row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  _forgot_Text: {
    color: "grey",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 12,
  },
  _loginSocial_text: {
    fontWeight: "bold",
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    marginTop: 30,
  },
  _social_btn: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#0077FF",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  _google_logo: {
    height: 17,
    width: 17,
  },
  _logo_circle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    backgroundColor: "white",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  _social_btn_row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  _signup_text: {
    color: "#0077FF",
    fontFamily: "Poppins-Medium",
  },
  _dont_have_account: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    color: "black",
  },
});
export default Login;
