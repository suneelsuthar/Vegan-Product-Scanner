import React, { useState, Fragment, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Provider } from "react-native-paper";
import { ref, onChildAdded } from "firebase/database";
import { db } from "./../config";
const Home = ({ navigation, route }) => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const arr = [];
    navigation.addListener("focus", () => {
      const productsref = ref(db, "prducts/");
      onChildAdded(productsref, (snapshot) => {
        const data = snapshot.val();
        arr.push(data);
        setproducts(arr);
      });
    });
  }, []);

  let propsData = route.params.data;
  return (
    <Provider>
      <SafeAreaView style={globalStyles.container}>
        <View
          style={{
            ...(Platform.OS !== "android" && {
              zIndex: 3,
            }),
            flexDirection: "row",
          }}
        >
          <Fragment>
            <View style={styles.firstFiveTopBox}>
              <Image
                style={styles.imageSizeBusiness}
                source={{
                  uri: propsData.uri,
                }}
                resizeMode="cover"
              />
            </View>
          </Fragment>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 22,
              color: "black",
              paddingVertical: 10,
            }}
          >
            {propsData.title}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "black",
              paddingVertical: 10,
            }}
          >
            {propsData.desc}
          </Text>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default Home;
const styles = StyleSheet.create({
  //header style

  safeAreaView: {
    backgroundColor: "#f5fbff",
  },

  firstFiveTopBox: {
    alignItems: "center",
    marginBottom: 5,
    paddingBottom: 2,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0D7E73",
    flex: 1,
    overflow: "hidden",
  },

  imageSizeBusiness: {
    height: 230,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  imageSize: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginTop: 20,
  },
});
