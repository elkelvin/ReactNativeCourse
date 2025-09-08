import { StyleSheet, Text } from "react-native";
const TitleComponent = (props) => {
  return (
    <Text style={{ ...style.title, ...props.style }}>{props.children}</Text>
  );
};

const style = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    maxWidth:"80%"
  },
});
export default TitleComponent;
