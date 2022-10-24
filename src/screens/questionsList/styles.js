import { StyleSheet } from "react-native";
import { APP_COLORS } from "../../constants/colors";
import {
  SCREEN_DIMENSIONS_HEIGHT,
  SCREEN_DIMENSIONS_WIDTH,
} from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.APP_BACKGROUND_COLOR,
  },
  image: {
    width: SCREEN_DIMENSIONS_WIDTH,
    height: SCREEN_DIMENSIONS_HEIGHT,
    alignItems: "flex-start",
  },
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    width: "100%",
    shadowColor: "transparent",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  backButton: {
    color: APP_COLORS.BUTTON_COLOR,
    zIndex: 99,
  },
  nextButton: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    marginVertical: 16,
  },
});

export default styles;
