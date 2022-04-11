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
import { GET_NAME, GET_PRODUCT, GET_WAREHOUSE } from "./sanity/query";
import { styles } from "./styles";
import useQuery from "./hooks/useQuery";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState(dataRFIDList);
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  const [content, setContent] = useState({ success: false, message: "" });
  const ware_house = useRef();
  const [mappingCount, setMappingCount] = useState(0);
  const { data: warehouses } = useQuery(GET_WAREHOUSE);

  const [inputs, setInputs] = useState({
    input1: "RFID" + ((Math.random() + 1) * 1000000).toFixed(),
    input2: "a9cd47bc-f717-440b-bc3d-9d1eb6f1460d",
  });
  const [outputs, setOutputs] = useState({
    rfid: "",
    property: { _id: "", name: "" },
  });
  const [isSubmit, setIsSubmit] = useState({
    isSubmit1: false,
    isSubmit2: false,
  });
  const [isSave, setIsSave] = useState(false);

  const handleChange = (type, value) => {
    setInputs({ ...inputs, [type]: value });
  };

  useEffect(() => {
    if (isSubmit.isSubmit2) {
      setIsSubmit({ ...isSubmit, isSubmit2: false });
      client
        .fetch(GET_NAME, { abc: inputs.input2 })
        .then((data) => {
          data.length > 0
            ? setOutputs({
                ...outputs,
                property: { _id: data[0]._id, name: data[0].name },
              })
            : setOutputs({ ...outputs, property: "" });
        })
        .catch((err) => console.log({ err }));
    }
  }, [isSubmit.isSubmit2]);
  //
  useEffect(() => {
    if (isSubmit.isSubmit1) {
      setIsSubmit({ ...isSubmit, isSubmit1: false });
      inputs.input1.length === 11 &&
        inputs.input1.toLowerCase().startsWith("rfid") &&
        setOutputs({ ...outputs, rfid: inputs.input1 });
    }
  }, [isSubmit.isSubmit1]);
  //
  const handleSubmit = (type) => {
    setIsSubmit({ ...isSubmit, [type]: true });
  };
  const handleReset = () => {
    setInputs({
      input1: "RFID" + ((Math.random() + 1) * 1000000).toFixed(),
      input2: "a9cd47bc-f717-440b-bc3d-9d1eb6f1460d",
    });
    setOutputs({ rfid: "", property: { _id: "", name: "" } });
  };
  const handleSave = () => {
    if (
      outputs.property.name.length > 0 &&
      outputs.rfid.length > 0 &&
      ware_house.current
    )
      setIsSave(true);
    // alert("helloabc");
  };
  useEffect(() => {
    if (isSave) {
      setContent({ success: false, message: "Đang tải..." });
      client
        .create({
          _type: "mapping",
          _id: outputs.rfid,
          code_product: {
            _type: "reference",
            _ref: outputs.property._id,
          },
          warehouse: {
            _type: "reference",
            _ref: ware_house.current._id,
          },
        })
        .then((res) => {
          setListData((prev) => [
            ...prev,
            { rfid: res._id, property: res.code_product._ref },
          ]);
          setContent({ success: true, message: "Mapping thành công!" });
          setMappingCount((prev) => prev + 1);
        })
        .catch((err) => {
          setContent({ success: false, message: "Mapping không thành công!" });
        });
      setIsSave(false);
    }
  }, [isSave]);

  // useEffect(() => {
  //   client.delete({
  //     query: '*[_type == "mapping"]',
  //   });
  // }, []);

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
              // console.log(item);
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
        submit={() => handleSubmit("isSubmit1")}
        verify={outputs.rfid}
      />
      {/* barcodeRFID */}
      {/* barcodeProperty */}
      <Input
        buttonTitle="Property barcode"
        value={inputs.input2}
        onChange={(value) => handleChange("input2", value)}
        submit={() => handleSubmit("isSubmit2")}
        verify={outputs.property.name}
      />
      {/* barcodeProperty */}
      {/* notification */}
      <View style={styles.notification}>
        <View style={styles.notificationTop}>
          <Text style={styles.textA}>Kết quả cập nhật mã tài sản RFID</Text>
          <Text
            style={[styles.textB, { color: content.success ? "blue" : "red" }]}
          >
            {content.message}
          </Text>
        </View>
        <View style={styles.notificationBottom}>
          <Text style={styles.textA}>Số thẻ mapping được</Text>
          <Text style={[styles.textB, { color: "red" }]}>{mappingCount}</Text>
        </View>
      </View>
      {/* notification */}
      {/* button */}
      <View style={styles.button}>
        <View>
          <Button title="Reset" />
        </View>
        <View>
          <Button title="Xem list" onPress={() => setVisible(true)} />
        </View>
        <View>
          <Button title="Làm mới" onPress={handleReset} />
        </View>
        <View>
          <Button title="Lưu" onPress={handleSave} />
        </View>
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
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.rfid}
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
