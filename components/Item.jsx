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
    // width: 200,
    // backgroundColor: "red",
    padding: 5,
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: "black",
  },
});
