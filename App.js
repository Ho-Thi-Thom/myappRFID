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
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Dialog from "react-native-dialog";
import Input from "./components/Input";
import Item from "./components/Item";
import client from "./sanity/config";
import { dataDropdown, dataRFIDList, STYLES, TRANSITIONS } from "./constants";
import { GET_PRODUCT } from "./sanity/query";
import { styles } from "./styles";

export default function App() {
  const [warehouses, setWarehouses] = useState(dataDropdown);
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState(dataRFIDList);
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  const renderItem = ({ item }) => <Item item={item} />;

  useEffect(() => {
    client
      .fetch(GET_PRODUCT)
      .then((data) => {
        setListData(
          data.map(({ _id, name, price }) => ({
            id: _id,
            rfid: name,
            taisan: price,
          }))
        );
      })
      .catch((err) => console.log({ err }));
  }, []);

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
  });

  const handleChange = (type, value) => {
    setInputs({ ...inputs, [type]: value });
  };

  const handleAdd = () => {
    client
      .createIfNotExists({
        _id: "123",
        _type: "product",
        name: inputs.input1,
        price: Number(inputs.input2),
      })
      .then((data) => console.log("success", data))
      .catch((err) => console.log(err));
  };
  const handleEdit = () => {
    client.createOrReplace({
      _id: inputs.input2,
      _type: "product",
      name: inputs.input1,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />

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
            buttonStyle={{ width: "100%" }}
            data={warehouses}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
          />
        </View>
      </View>
      {/* warehouse */}

      {/* barcodeRFID */}
      <Input
        buttonTitle="RFID barcode"
        value={inputs.input1}
        onChange={(value) => handleChange("input1", value)}
      />
      {/* barcodeRFID */}

      {/* barcodeProperty */}
      <Input
        buttonTitle="Property barcode"
        value={inputs.input2}
        onChange={(value) => handleChange("input2", value)}
      />
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
        <Button title="Reset" onPress={handleEdit} />
      </View>
      {/* button */}

      {/* dialog */}
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.title}>
          Danh sách kết quả Mapping
        </Dialog.Title>
        <Dialog.Description style={styles.flatlist}>
          <FlatList
            style={{ width: 250 }}
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Dialog.Description>
        <Dialog.Button
          label="Đóng"
          style={styles.dialogButton}
          onPress={() => setVisible(false)}
        />
      </Dialog.Container>
      {/* dialog */}
    </SafeAreaView>
  );
}
