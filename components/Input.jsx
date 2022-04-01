import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Input = ({ buttonTitle, onChange, value, submit, verify }) => (
  <View style={styles.barcode}>
    <View style={styles.barcodeTop}>
      <View style={styles.barcodeTopImage}>
        <TouchableOpacity onPress={submit}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/a/af/M%C3%A3_QR.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.barcodeTopInputText}>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={value}
          placeholder={buttonTitle}
          keyboardType="numbers-and-punctuation"
        />
      </View>
    </View>
    <View style={styles.barcodeBottom}>
      <Text style={styles.input2}> {verify}</Text>
    </View>
  </View>
);
export default Input;
const styles = StyleSheet.create({
  barcode: {
    flex: 2,
    // backgroundColor: "#A5548C",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  barcodeTop: {
    flex: 1,
    // backgroundColor: "#f250",
    flexDirection: "row",
  },
  barcodeTopImage: {
    flex: 2,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodeTopInputText: {
    flex: 7,
    // backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderBottomWidth: 1,
    padding: 10,
  },
  input2: {
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
    color: "gray",
  },
  barcodeBottom: {
    flex: 1,
    // backgroundColor: "#f00",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    // padding: 5,
  },
});
