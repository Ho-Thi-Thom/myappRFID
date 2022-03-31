import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    paddingRight: 10,
  },
  notification: {
    flex: 2,
    justifyContent: "center",
    // backgroundColor: "#FE9539",
    flexDirection: "column",
    paddingHorizontal: 5,
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
  title: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    color: "#0054A5",
    fontWeight: "bold",
    fontSize: 20,
  },
  flatlist: {
    marginTop: 5,
    borderBottomWidth: 1,
    height: "auto",
    minHeight: 300,
  },
  dialogButton: {
    fontWeight: "bold",
    color: "#0054A5",
  },
});
