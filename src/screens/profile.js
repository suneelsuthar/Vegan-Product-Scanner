import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { auth } from "../config";
import { showMessage } from "react-native-flash-message";
import { updateProfile } from "firebase/auth";

const Profile = (props) => {
  const [name, sentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");

  const getCurrentUserData = () => {
    sentName(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
    setphone(auth.currentUser.phoneNumber);
  };
  useEffect(() => {
    getCurrentUserData();
  }, []);

  const UpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((res) => {
        showMessage({
          message: "Profile updated successfully",
          type: "success",
        });
      })
      .catch((err) => {
        showMessage({
          message: err.message,
          type: "danger",
        });
      });
  };

  console.log(auth.currentUser);

  return (
    <View style={styles._container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        style={styles._back_icon}
        onPress={() => props.navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} />
      </TouchableOpacity>
      <Text style={styles._h1} fontWeight="bold">
      profiel
      </Text>
      {/* FORM START */}
      <View>
        <TextInput
          placeholder="Full Name"
          style={styles._text_input}
          value={name}
          onChangeText={(v) => sentName(v)}
        />

        <TextInput
          placeholder="Email"
          style={styles._text_input}
          value={email}
          onChangeText={(v) => setEmail(v)}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
      {/* FORM END */}
      <TouchableOpacity style={styles._btn} onPress={() => UpdateProfile()}>
        <Text style={styles._btn_Text}>bijwerken</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  _h1: {
    fontSize: 25,
    marginVertical: 30,
    fontFamily: "Poppins-Bold",
  },
  _product_list: {
    flexDirection: "column",
    flex: 1,
  },
  _price_td: {
    backgroundColor: "white",
    width: 120,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  _price: {
    fontSize: 25,
  },
  _price_title: {
    fontSize: 10,
    fontFamily: "Poppins-Bold",
  },
  _btn: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 15,
    marginTop: 30,
  },
  _btn_Text: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 18,
  },
  h5: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  _billingText: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  _text_input: {
    borderBottomWidth: 1,
    borderColor: "#AFAFAF",
    fontWeight: "bold",
    height: 50,
  },
  _text_input_half: {
    borderBottomWidth: 1,
    borderColor: "#AFAFAF",
    width: "40%",
    fontFamily: "Poppins-Bold",
  },
  _form_footer_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  _footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  save_billingText: {
    fontSize: 12,
  },
});
// export default styles;
