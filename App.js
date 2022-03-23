import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Input from "./components/Input";

const countries = ["Egypt", "Canada", "Australia", "Ireland"];

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];
export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  const [modalVisible, setModalVisible] = useState(true);
  // const changeStatusBarVisibility = () => setHidden(!hidden);

  // const changeStatusBarStyle = () => {
  //   const styleId = STYLES.indexOf(statusBarStyle) + 1;
  //   if (styleId === STYLES.length) {
  //     setStatusBarStyle(STYLES[0]);
  //   } else {
  //     setStatusBarStyle(STYLES[styleId]);
  //   }
  // };

  // const changeStatusBarTransition = () => {
  //   const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
  //   if (transition === TRANSITIONS.length) {
  //     setStatusBarTransition(TRANSITIONS[0]);
  //   } else {
  //     setStatusBarTransition(TRANSITIONS[transition]);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      {modalVisible ? (
        <>
          <Text>hello</Text>
        </>
      ) : (
        <>
          {/* warehouse */}
          <View style={styles.warehouse}>
            <View style={styles.warehouseLeft}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/702/702455.png",
                }}
              />
            </View>
            <View style={styles.warehouseRight}>
              <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
              />
            </View>
          </View>
          {/* warehouse */}

          {/* barcodeRFID */}
          <Input buttonTitle="RFID barcode" />
          {/* barcodeRFID */}

          {/* barcodeProperty */}
          <Input buttonTitle="Property barcode" />
          {/* barcodeProperty */}

          {/* notification */}
          <View style={styles.notification}>
            <View style={styles.notificationTop}>
              <Text style={styles.textA}>Kết quả cập nhật mã tài sản RFID</Text>
              <Text style={styles.textB}>nội dung</Text>
            </View>
            <View style={styles.notificationBottom}>
              <Text style={styles.textA}>Số thẻ mapping được</Text>
              <Text style={[styles.textB, { color: "red" }]}>01</Text>
            </View>
          </View>
          {/* notification */}

          {/* button */}
          <View style={styles.button}>
            <View>
              <Button title="Làm mới" />
            </View>
            <View>
              <Button title="Xem list" />
            </View>
            <Button title="Reset" />
          </View>
          {/* button */}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  warehouse: {
    // marginTop: 9,
    flex: 0.8,
    // backgroundColor: "#3E97CF",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#DEFCF9",
  },
  warehouseLeft: {
    // backgroundColor: "#3557CF",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  warehouseRight: {
    // backgroundColor: "#3E97CF",
    justifyContent: "center",
    alignItems: "center",
    flex: 4,
  },
  notification: {
    flex: 2,
    justifyContent: "center",
    // backgroundColor: "#FE9539",
    flexDirection: "column",
  },
  notificationTop: {
    flex: 1,
    // backgroundColor: "#FE9539",
  },
  notificationBottom: {
    flex: 1,
    // backgroundColor: "#f00",
  },
  textA: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  textB: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 18,
    color: "blue",
    textAlign: "center",
  },
  button: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "#8CBA19",
    flexDirection: "row",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    // padding: 5,
  },
});
