import React, { useState, Fragment, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../../styles/global";
import ProductListCard from "./../components/ProductCard";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { Menu, Divider, Provider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { ref, onChildAdded, remove } from "firebase/database";
import { db } from "./../config";
import { auth } from "../config";
const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [role, setrole] = React.useState(
    auth.currentUser !== null &&
      auth.currentUser.email === "laurensvmidden@gmail.com"
      ? "admin"
      : "user"
  );
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState("");

  const getProducts = () => {
    const productsref = ref(db, "prducts/");
    const arr = [];
    onChildAdded(productsref, (snapshot) => {
      var data = snapshot.val();
      data.id = snapshot.key;
      arr.push(data);
      setproducts(arr);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getProducts();

    navigation.addListener("focus", () => {
      getProducts();
    });
  }, [navigation]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const Logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const filteredData = products.filter((data) => {
    if (products.length !== 0) {
      if (search !== "") {
        return data.title.toLowerCase().includes(search.toLowerCase());
      } else {
        return products;
      }
    } else {
      return products;
    }
  });

  const deleteProduct = async (id) => {
    const productsref = ref(db, "prducts/" + id);
    remove(productsref);
    getProducts();
  };
  return (
    <Provider>
      <SafeAreaView style={globalStyles.container}>
        {loading === true ? (
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
            <ActivityIndicator size="small" color="black" />
          </View>
        ) : null}
        <View style={styles._header_row}>
          <TouchableOpacity
            style={styles._header_circle}
            onPress={() => navigation.navigate("Profile")}
          >
            <Feather name="user" size={20} />
          </TouchableOpacity>
          <View style={styles._search_bar}>
            <Feather active name="search" style={{ color: "grey" }} size={20} />
            <TextInput
              placeholder="Zoekopdracht"
              style={styles._serch_Text}
              value={search}
              onChangeText={(e) => setsearch(e)}
            />
          </View>

          {role === "admin" ? (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  style={styles._header_circle}
                  onPress={() => openMenu()}
                >
                  <Entypo name="dots-three-vertical" size={20} />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("ScanProduct");
                }}
                title={
                  <View style={styles._row}>
                    <AntDesign name="scan1" size={18} color="black" />
                    <Text style={styles._menue_text}>product scannen</Text>
                  </View>
                }
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("AddProduct");
                }}
                title={
                  <View style={styles._row}>
                    <Entypo name="add-to-list" size={18} color="black" />
                    <Text style={styles._menue_text}>toevoegen</Text>
                  </View>
                }
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  setVisible(false);
                  Logout();
                }}
                title={
                  <View style={styles._row}>
                    <AntDesign name="logout" size={18} />
                    <Text style={styles._menue_text}>uitloggen</Text>
                  </View>
                }
              />
              <Divider />
            </Menu>
          ) : (
            <TouchableOpacity
              style={styles._header_circle}
              onPress={() => Logout()}
            >
              <AntDesign name="logout" size={20} />
            </TouchableOpacity>
          )}
        </View>

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
                  uri: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/08/tofu-salad-pineapple-quinoa-vegan-meal-1296x728-header.png?w=1575%20750w",
                }}
                resizeMode="cover"
              />
            </View>
          </Fragment>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 18,
              color: "black",
            }}
          >
            Beste producten
          </Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
            data={filteredData}
            keyExtractor={(item) => "ab" + Math.random().toString()}
            renderItem={({ item }) => (
              <ProductListCard
                data={item}
                navigation={navigation}
                onPress={deleteProduct}
              />
            )}
          />
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

  searchFilter: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: "#F1F1F1",
    marginBottom: 8,
    marginTop: 40,
  },

  firstFiveTopBox: {
    alignItems: "center",
    marginBottom: 5,
    paddingBottom: 2,
    margin: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 170,
    color: "#0D7E73",
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "grey",
  },

  business: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "green",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },

  filter: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 3,
    borderWidth: 2,
    borderColor: "#0D7E73",
    padding: 5,
    marginLeft: 20,
    borderRadius: 10,
  },

  imageSizeBusiness: {
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
  },
  imageSize: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  _input: {
    flex: 1,
    fontFamily: "Poppins-Medium",
  },
  _header_row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
  },
  _search_bar: {
    borderWidth: 2,
    marginHorizontal: 10,
    flex: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 40,
    paddingHorizontal: 10,
    backgroundColor: "#F1F1F1",
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  _serch_Text: {
    fontSize: 15,
    margin: 0,
    height: 45,
    flex: 1,
    paddingLeft: 5,
  },
  _header_circle: {
    backgroundColor: "#F1F1F1",
    height: 36,
    width: 36,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.1,
    borderColor: "grey",
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
  },
  _menue_text: {
    fontFamily: "Poppins-Medium",
    marginLeft: 15,
  },
});
