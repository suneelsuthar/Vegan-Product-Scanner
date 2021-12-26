import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const ProductListCard = ({ data, navigation }) => {
  return (
    <View style={styles._card}>
      <View style={styles._card_header}>
        <TouchableOpacity>
          <Image
            source={{
              uri: data.uri,
            }}
            style={styles._product_img}
          />
        </TouchableOpacity>
      </View>
      <View style={styles._Card_detail}>
        <Text numberOfLines={1} style={styles._product_name}>
          {data.title}
        </Text>
        <Text style={styles._promade} numberOfLines={2}>
          {data.desc}
        </Text>
        <View style={styles._card_footer}>
          <TouchableOpacity
            style={styles._buyBtn}
            onPress={() => navigation.navigate("ProductDetail", { data: data })}
          >
            <Text style={styles._buyBtn_text}>bekijk details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductListCard;

const styles = StyleSheet.create({
  _card: {
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
    alignSelf: "flex-start",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    elevation: 2,
  },
  _card_header: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 10,
  },
  _product_img: {
    height: 110,
    width: 110,
    marginLeft: 12,
    marginVertical: 8,
    borderRadius: 12,
  },
  _favourite: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 5,
    zIndex: 1,
    elevation: 4,
  },
  _product_name: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    width: 150,
    lineHeight: 20,
  },
  _sub_heading: {
    paddingBottom: 5,
    marginTop: -5,
    fontFamily: "Poppins-Medium",
  },
  _card_footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  _buyBtn: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  _buyBtn_text: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  _price: {
    fontFamily: "Montserrat-Bold",
  },
  _Card_detail: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    paddingLeft: 10,
  },
  _promade: {
    fontSize: 14,
    lineHeight: 18,
    paddingTop: 5,
    paddingBottom: 10,
    width: 130,
    fontFamily: "Poppins-Regular",
  },
});
