import { StyleSheet } from "react-native";
import { APP_COLORS } from "../../../constants/colors";

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 20,
    marginStart : 20,
    marginBottom : 25
  },
  question: {
    color: APP_COLORS.WHITE,
    fontSize: 16,
  },
  radioButton: { flex: 1 },
  radioLabel: { fontSize: 16, color: APP_COLORS.WHITE },
  radioContainer: {
    flexDirection: "row",
    marginTop: "5%",
  },
});

export default styles;
