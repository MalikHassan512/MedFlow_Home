import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { APP_COLORS } from "../../../constants/colors";
import RadioButton from "../../../components/RadioButton";

let radio_props = [
  { label: "Yes", value: 0 },
  { label: "No", value: 1 },
];

const QuestionComponent = ({ serialNo, question, answer, updateAnswerInList, index }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    updateAnswerInList(serialNo, selectedIndex);
  }, [selectedIndex]);

  const updateAnswer = (index) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.question}>
        {index})  {question}
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            obj={radio_props[0]}
            index={0}
            buttonSize={10}
            buttonOuterSize={20}
            isSelected={selectedIndex === 0}
            onPress={(index) => updateAnswer(index)}
            buttonInnerColor={APP_COLORS.WHITE}
            buttonOuterColor={APP_COLORS.WHITE}
            labelStyle={styles.radioLabel}
          />
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            obj={radio_props[1]}
            index={1}
            buttonSize={10}
            buttonOuterSize={20}
            isSelected={selectedIndex === 1}
            onPress={(index) => updateAnswer(index)}
            buttonInnerColor={APP_COLORS.WHITE}
            buttonOuterColor={APP_COLORS.WHITE}
            labelStyle={styles.radioLabel}
          />
        </View>
      </View>
    </View>
  );
};

export default QuestionComponent;
