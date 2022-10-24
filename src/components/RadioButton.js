import React, { useEffect, useState } from "react";
import {
  RadioButton as RB,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const RadioButton = (props) => {
  return (
    <RB labelHorizontal={true} disabled={props.disabled}>
      <RadioButtonInput
        obj={props.obj}
        index={props.index}
        isSelected={props.isSelected}
        onPress={props.onPress}
        borderWidth={1}
        buttonInnerColor={props.buttonInnerColor}
        buttonOuterColor={props.buttonOuterColor}
        buttonSize={props.buttonSize}
        buttonOuterSize={props.buttonOuterSize}
        buttonStyle={{}}
        buttonWrapStyle={{ marginLeft: 10 }}
      />
      <RadioButtonLabel
        obj={props.obj}
        index={props.index}
        labelHorizontal={true}
        onPress={props.onPress}
        labelStyle={props.labelStyle}
        labelWrapStyle={{}}
      />
    </RB>
  );
};
export default RadioButton;
