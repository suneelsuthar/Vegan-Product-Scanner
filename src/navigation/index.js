// In App.js in a new project

import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Login from "../screens/Login";
import Signup from "../screens/signup";
import AddProduct from "../screens/AddProduct";
import { AntDesign } from "@expo/vector-icons";
import ProductDetail from "./../screens/ProductDetail";
import EditProduct from "./../screens/EditProduct";
import { FontAwesome } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        {/* EditProduct */}
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            title: "Product Detail",
            headerTitleStyle: {
              fontFamily: "Poppins-Medium",
            },
          }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerRight: () => (
              <View>
                <AntDesign name="addfile" size={24} color="black" />
              </View>
            ),
            title: "Producten toevoegen",
            headerTitleStyle: {
              fontFamily: "Poppins-Medium",
            },
          }}
        />

        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            headerRight: () => (
              <View>
                <FontAwesome name="edit" size={24} color="black" />
              </View>
            ),
            title: "product updaten",
            headerTitleStyle: {
              fontFamily: "Poppins-Medium",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
