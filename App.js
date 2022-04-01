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
import { useState, useEffect, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Dialog from "react-native-dialog";
import Input from "./components/Input";
import Item from "./components/Item";
import client from "./sanity/config";
import { dataDropdown, dataRFIDList, STYLES, TRANSITIONS } from "./constants";
import { GET_PRODUCT, GET_WAREHOUSE } from "./sanity/query";
import { styles } from "./styles";

export default function App() {
  const [warehouses, setWarehouses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState(dataRFIDList);
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  const ware_house = useRef();
  const renderItem = ({ item }) => <Item item={item} />;

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "a9cd47bc-f717-440b-bc3d-9d1eb6f1460d",
  });
  const [outputs, setOutputs] = useState({
    rfid: "",
    property: "",
  });
  const [isSubmit1, setIsSubmit1] = useState(false);
  const handleChange = (type, value) => {
    setInputs({ ...inputs, [type]: value });
  };
  //
  useEffect(() => {
    client
      .fetch(GET_WAREHOUSE)
      .then((data) => {
        setWarehouses(
          data.map(({ _id, name }) => ({
            id: _id,
            name: name,
          }))
        );
      })
      .catch((err) => console.log({ err }));
  }, []);
  //
  useEffect(() => {
    client
      .fetch(
        `
      *[_type == 'product'&& _id=="${inputs.input2}"] {
          _id,
          name,
      }
  `
      )
      .then((data) => {
        data.length > 0
          ? setOutputs({ ...outputs, property: data[0].name })
          : setOutputs({ ...outputs, property: "" } && setIsSubmit1(false));
      })
      .catch((err) => console.log({ err }));
  }, [isSubmit1]);
  //
  const handleSubmit1 = () => {
    setIsSubmit1(true);
  };
  const handleSubmit2 = () => {
    setIsSubmit1(true);
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
            rowTextForSelection={({ name }) => name}
            onSelect={(item, index) => {
              ware_house.current = item;
            }}
            buttonTextAfterSelection={({ name }) => name}
          />
        </View>
      </View>
      {/* warehouse */}
      {/* barcodeRFID */}
      <Input
        buttonTitle="RFID barcode"
        value={inputs.input1}
        onChange={(value) => handleChange("input1", value)}
        submit={handleSubmit1}
        verify={outputs.rfid}
      />
      {/* barcodeRFID */}
      {/* barcodeProperty */}
      <Input
        buttonTitle="Property barcode"
        value={inputs.input2}
        onChange={(value) => handleChange("input2", value)}
        submit={handleSubmit2}
        verify={outputs.property}
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
        <Button title="Reset" />
        {/* onPress={handleEdit} */}
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
