import React, { useState } from "react";
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

import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config";
import { showMessage } from "react-native-flash-message";

const Signup = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const [dataConfirm, setDataConfirm] = React.useState({
    check_textInputChangeConfirm: false,
    secureTextEntryConfirm: true,
  });
  const updateSecureTextEntryConfirm = () => {
    setDataConfirm({
      ...dataConfirm,
      secureTextEntryConfirm: !dataConfirm.secureTextEntryConfirm,
    });
  };
  const register = () => {
    if (email === "") {
      showMessage({
        message: "Vul je geldige e-mailadres in",
        type: "danger",
      });
    } else if (password === "") {
      showMessage({
        message: "Voer uw wachtwoord in",
        type: "danger",
      });
    } else if (cpassword === "") {
      showMessage({
        message: "Voer uw bevestigingswachtwoord in",
        type: "danger",
      });
    } else if (name === "") {
      showMessage({
        message: "Vul je gebruikersnaam in",
        type: "danger",
      });
    } else if (password !== cpassword) {
      showMessage({
        message: "Wachtwoord komt niet overeen",
        type: "danger",
      });
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: name,
          });

          setname("");
          setpassword("");
          setcpassword("");
          setemail("");
          setIsLoading(false);
          props.navigation.navigate("Home");
        })
        .catch((e) => {
          setIsLoading(false);

          showMessage({
            message: e.message,
            type: "danger",
          });
        });
    }
  };

  return (
    <View style={styles._container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles._h1} fontWeight="bold">
          Laten we beginnen
          </Text>
          {isLoading === true ? (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                // opacity: 0.6,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : null}
          <View style={styles._input_row}>
            <AntDesign active name="user" style={{ fontSize: 20 }} />
            <TextInput
              placeholder="gebruikersnaam"
              style={styles._text_input}
              onChangeText={(v) => setname(v)}
            />
          </View>

          <View style={styles._input_row}>
            <Octicons active name="mail" style={{ fontSize: 20 }} />
            <TextInput
              placeholder="Email"
              style={styles._text_input}
              onChangeText={(v) => setemail(v)}
            />
          </View>

          <View style={styles._input_row}>
            <MaterialCommunityIcons
              active
              name="form-textbox-password"
              style={{ fontSize: 20 }}
            />

            <TextInput
              placeholder="Wachtwoord"
              style={styles._text_input}
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(v) => setpassword(v)}
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

          <View style={styles._input_row}>
            <MaterialCommunityIcons
              active
              name="form-textbox-password"
              style={{ fontSize: 20 }}
            />

            <TextInput
              placeholder="bevestig wachtwoord"
              style={styles._text_input}
              secureTextEntry={
                dataConfirm.secureTextEntryConfirm ? true : false
              }
              onChangeText={(v) => setcpassword(v)}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntryConfirm}
              style={{ position: "absolute", right: 20, bottom: 12 }}
            >
              {dataConfirm.secureTextEntryConfirm ? (
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

          <TouchableOpacity style={styles._btn} onPress={() => register()}>
            <Text style={styles._btn_Text}>Inschrijven</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles._footer}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles._dont_have_account}>
            Heb je geen account?
              <Text style={styles._signup_text}> Log in</Text>
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
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    marginVertical: 10,
    marginBottom: 15,
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

  _signup_text: {
    color: "#0077FF",
    fontFamily: "Poppins-Medium",
  },
  _dont_have_account: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  _footer: {
    marginVertical: 20,
  },
});

export default Signup;
