import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { APP_COLORS } from "../../constants/colors";

const DigitBox = ({inputProps, onBack, digitInput, isFocused, setData, forwardedRef}) => {
  return(
    <View style={styles.digitBox}>
      {isFocused ? <View style={styles.inputDigitComplete}/> : null}
      <TextInput
        value={digitInput}
        onChangeText={setData}
        keyboardType={"number-pad"}
        onKeyPress={onBack}
        ref={forwardedRef}
        {...inputProps}
        style={styles.inputDigit}
      />
    </View>
  );
}
export default DigitBox;
const styles = StyleSheet.create({
  digitBox: {
    flex: 1,
    width: 57,
    height: 52,
    justifyContent: "center", 
    alignItems: "center"
  },
  inputDigitComplete: {
    position: "absolute",
    borderRadius: 10,
    width: 57,
    height: 52,
    zIndex: 0,
    backgroundColor: APP_COLORS.BUTTON_COLOR
  },
  inputDigit: {
    borderWidth: 1,
    borderColor: APP_COLORS.BUTTON_COLOR,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    width: 55,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});

