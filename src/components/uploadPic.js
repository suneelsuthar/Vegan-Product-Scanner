import React, { useState } from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export default function UploadPic(props) {
  const [image1, setImage1] = useState("");

  async function imageHandleChange(handleChange) {
    setImage1("");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result);
    }
  }

  const uploadImage = async (result) => {
    props.onPress(image1, true);

    const imagename = result.uri.split("/");
    const storageRef = ref(storage, imagename.reverse()[0]);
    const response = await fetch(result.uri);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setImage1(url);
        props.onPress(url, false);
      });
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={styles.addPhotos}
        onPress={() => imageHandleChange()}
      >
        {image1 ? (
          <Image
            style={styles.button}
            source={{ uri: image1 }}
            resizeMode="cover"
          />
        ) : null}
        {image1 === "" ? (
          <FontAwesome name="photo" size={34} color="#efe6e6" />
        ) : null}
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
