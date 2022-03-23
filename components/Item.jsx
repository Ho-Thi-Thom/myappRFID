import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function Item({ item }) {
  return (
    <View style={styles.item}>
      {/* <View> */}
      <Text style={[styles.title]}>{item.rfid}</Text>
      {/* </View> */}

      <Text style={[styles.title]}>{item.taisan}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    // backgroundColor: "#CFEBF7",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: "row",
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 5,
    color: "black",
  },
});
