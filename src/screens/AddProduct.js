import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../../styles/global.js";
import { showMessage } from "react-native-flash-message";
import UploadPic from "../components/uploadPic.js";
import { getDatabase, push, ref } from "firebase/database";
const db = getDatabase();
export default function ReviewForm({ navigation }) {
  const [image1, setImage1] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const AddProduct = () => {
    if (title === "") {
      showMessage({
        message: "Enter product title",
        type: "danger",
      });
    } else if (desc === "") {
      showMessage({
        message: "Enter product description",
        type: "danger",
      });
    } else {
      push(ref(db, "prducts/"), {
        title: title,
        desc: desc,
        uri: image1,
      })
        .then((res) => {
          showMessage({
            message: "Product added successfully",
            type: "success",
          });
          setImage1("");
          settitle("");
          setdesc("");
          navigation.navigate("Home");
        })
        .catch((err) => {
          showMessage({
            message: err.message,
            type: "danger",
          });
        });
    }
  };

  const imageHandleChange = (uri, loading) => {
    setIsLoading(loading);
    setImage1(uri);
  };

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : null}
      <View style={styles._inner_layer}>
        <View>
          <Text
            style={[
              globalStyles.inputTopLabel,
              { paddingTop: 0, marginTop: 25 },
            ]}
          >
            Titel *{" "}
          </Text>
          <TextInput
            style={globalStyles.input}
            maxLength={400}
            value={title}
            onChangeText={(e) => settitle(e)}
          />

          <Text style={[globalStyles.inputTopLabel, { paddingTop: 30 }]}>
            {" "}
            Beschrijving *{" "}
          </Text>
          <TextInput
            style={[globalStyles.input, { height: 180 }]}
            maxLength={800}
            multiline={true}
            value={desc}
            onChangeText={(e) => setdesc(e)}
          />
        </View>

        <Text style={[globalStyles.inputTopLabel, { marginTop: 10 }]}>
          {" "}
          Productfoto toevoegen *{" "}
        </Text>
        <UploadPic onPress={imageHandleChange} />
      </View>
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() => AddProduct()}
        disabled={image1 === "" ? true : false}
      >
        <Text style={styles.findPosts}>product opslaan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0.5,
    padding: 8,
  },

  inputs: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingBottom: 5,
    fontFamily: "Poppins-Medium",
    height: 50,
  },
  dropdown: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "stretch",
  },
  formTitle: {
    fontSize: 15,
    paddingHorizontal: 0,
    backgroundColor: "#FAFAFA",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    fontFamily: "Poppins-Medium",
  },
  formDescription: {
    fontSize: 13,
    paddingBottom: 14,
    fontFamily: "Poppins-Medium",
  },
  button: {
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  addPhotos: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    borderWidth: 2,
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f2f2f2",
    // width: windowWidth ,
    flex: 1,
  },
  submit: {
    margin: 20,
  },
  pay: {
    color: "gold",
    fontFamily: "Poppins-Medium",
  },
  _upload_textt: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "grey",
  },
  doneBtn: {
    marginBottom: 20,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
  },
  findPosts: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    color: "white",
  },
  payment_containers: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 15,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
    fontSize: 15,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  modalContent: {
    flex: 1,
    padding: 15,
    paddingTop: 1,
    marginTop: 50,
  },
  _subscription_views: {
    marginHorizontal: 5,
    backgroundColor: "white",
    height: 80,
    elevation: 2,
    marginBottom: 15,
    borderWidth: 0.1,
    borderColor: "#0D7E73",
    flexDirection: "column",
    padding: 10,
  },
  _subscription_row: {
    flexDirection: "column",
    marginBottom: 50,
  },
  _text: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  _package_text: {
    fontFamily: "Poppins-Medium",
    marginLeft: 5,
  },
  _price_view: {
    fontFamily: "Poppins-Medium",
  },
  _header: {
    // height: 80,
    backgroundColor: "grey",
  },
  _inner_layer: {
    flex: 1,
  },
});
