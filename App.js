import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Input from "./components/Input";
import Item from "./components/Item";
import Dialog from "react-native-dialog";
export default function App() {
  // const [hidden, setHidden] = useState(false);
  const [warehouses, setWarehouses] = useState([
    "Egypt",
    "Canada",
    "Australia",
    "Ireland",
  ]);
  const [visible, setVisible] = useState(false);
  //
  const [listData, setListData] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      rfid: "First Item 1",
      taisan: "First Item 2",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      rfid: "Second Item 1",
      taisan: "Second Item 2",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      rfid: "Third Item 1",
      taisan: "Third Item 2",
    },
  ]);
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
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
            data={warehouses}
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
          <Button title="Xem list" onPress={() => setVisible(true)} />
        </View>
        <Button title="Reset" />
      </View>
      {/* button */}

      {/* dialog */}
      <Dialog.Container visible={visible} style={styles.container}>
        <View style={styles.title}>
          <Dialog.Title style={{ color: "#0054A5", fontWeight: "bold" }}>
            Danh sách kết quả Mapping
          </Dialog.Title>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.dialogButton}>
          <Dialog.Button
            label="Đóng"
            style={{ fontWeight: "bold", color: "#0054A5" }}
            onPress={() => setVisible(false)}
          />
        </View>
      </Dialog.Container>
      {/* dialog */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  warehouse: {
    // marginTop: 9,
    flex: 1,
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
  //
  model: {
    flex: 1,
    backgroundColor: "#CFEBF7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    alignItems: "center",
    flex: 0.5,
    borderBottomWidth: 1,
  },
  flatlist: {
    marginTop: 5,
    flex: 4,
    borderBottomWidth: 1,
  },
  dialogButton: {
    flex: 2,
  },
});
