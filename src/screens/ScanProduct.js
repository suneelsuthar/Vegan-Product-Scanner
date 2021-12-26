import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getDatabase, push, ref, onChildAdded } from "firebase/database";
const db = getDatabase();

export default function ScanProduct({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyAdded, setalreadyAdded] = useState(true);
  const [showScnner, setshowScnner] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsLoading(true);
    setshowScnner(false);
    const words = data.split(" ");
    const productsref = ref(db, "prducts/");

    onChildAdded(productsref, (snapshot) => {
      const data = snapshot.val();
      for (var j = 0; j < words.length; j++) {
        if (data.title === words[j]) {
          setIsLoading(false);
          setalreadyAdded(true);
        } else {
          setIsLoading(false);
          setalreadyAdded(false);
        }
      }
    });
    console.log(">>>>>data>>e>>>", words);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Cameratoestemming aanvragen
    </Text>;
  }
  if (hasPermission === false) {
    return <Text>Geen toegang tot camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles._title}>
      Scan het product via de QR-code en controleer of het al door u is toegevoegd{" "}
      </Text>

      {showScnner === false ? (
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
          {!isLoading ? (
            !alreadyAdded ? (
              <>
                <Text style={styles._title}>
                Je hebt deze product nog niet toegevoegd!
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddProduct")}
                  style={[styles._btn, { width: 230 }]}
                >
                  <Text style={styles._btn_text}>Nieuw product toevoegen</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles._title}>
                Je hebt deze trots al toegevoegd{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddProduct")}
                  style={[styles._btn, { width: 230 }]}
                >
                  <Text style={styles._btn_text}>Tab om opnieuw te scannen</Text>
                </TouchableOpacity>
              </>
            )
          ) : null}
          {isLoading && <ActivityIndicator size="large" color="black" />}
          {/* <ActivityIndicator size="large" color="black" /> */}
        </View>
      ) : (
        <View style={styles._layer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      <View style={styles._footer}>
        <TouchableOpacity
          onPress={() => {
            setshowScnner(false);
            setScanned();
            setIsLoading(true);
          }}
          style={styles._btn}
        >
          <Text style={styles._btn_text}>product verifiëren</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  _layer: {
    flex: 1,
  },
  _title: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    textAlign: "center",
    padding: 20,
    color: "grey",
  },
  _footer: {
    marginVertical: 10,
  },
  _btn: {
    backgroundColor: "black",
    height: 50,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  _btn_text: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
});
