import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Item({ item }) {
  return (
    <View style={styles.item}>
      {/* <View> */}
      <Text style={[styles.title, { color: "indigo", paddingRight: 5 }]}>
        {item.rfid}
      </Text>
      {/* </View> */}

      <Text style={[styles.title, { color: "crimson" }]}>{item.property}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    // width: 200,
    // backgroundColor: "red",
    marginVertical: 8,
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
});
