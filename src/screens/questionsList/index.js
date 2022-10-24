import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Platform,
  StatusBar,
  ImageBackground,
  Alert
} from "react-native";

import { Header, Left, Icon, Button, Container } from "native-base";

import styles from "./styles";
import { APP_STRINGS } from "../../constants/strings";
import { APP_COLORS } from "../../constants/colors";
import AppCommonButton from "../../components/AppCommonButton";
import QuestionComponent from "./components/Question";
import { NavigationBar } from "../../components/NavigationBar";
import { SCREEN_DIMENSIONS_HEIGHT } from "../../constants";
import { DataStore } from "aws-amplify";
import { Question } from "../../models";
import Loader from "../../Loader";

const DATA = [
  {
    id: 1,
    question: "Are you Hamid?",
    answer: null,
  },
  {
    id: 2,
    question: "Do you work at Rapidzz Solutions?",
    answer: null,
  },
  {
    id: 3,
    question: "Do you have any experience on React Native Before?",
    answer: null,
  },
  {
    id: 4,
    question: "Are you Hamid?",
    answer: null,
  },
  {
    id: 5,
    question: "Do you work at Rapidzz Solutions?",
    answer: null,
  },
  {
    id: 6,
    question: "Do you have any experience on React Native Before?",
    answer: null,
  },
  {
    id: 7,
    question: "Are you Hamid?",
    answer: null,
  },
  {
    id: 8,
    question: "Do you work at Rapidzz Solutions?",
    answer: null,
  },
  {
    id: 9,
    question: "Do you have any experience on React Native Before?",
    answer: null,
  }

];

const QuestionsList = ({ navigation }) => {
  const [disableNextButton, setDisableNextButton] = useState(true);
  let answerCount = 0;
  const [mainQuestionsList, setQuestionsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllQuestions()
  }, [])

  const getAllQuestions = async () => {
    let questionsList = []
    const totalQuestions = await DataStore.query(Question)
    totalQuestions.map((item) => {
      let mQuestionModel = JSON.parse(item.question)
      mQuestionModel.question.map((question) => {
        let mapQuestion = question
        mapQuestion['answer'] = null
        questionsList.push(mapQuestion)
      })
    })
    setLoading(false)
    setQuestionsList(questionsList)
    console.log("myNewQuestion -- > ", questionsList)
  }

  const updateAnswerInList = (serialNo, selectedIndex) => {
    const obj = mainQuestionsList.find((x) => x.id === serialNo);

    if (obj.answer === null && selectedIndex !== null) {
      answerCount++;
    }

    if (selectedIndex === 1) {
      obj.answer = false;
    } else if (selectedIndex === 0) {
      obj.answer = true;
    }

    if (answerCount === mainQuestionsList.length) {
      setDisableNextButton(false);
    }
  };

  const renderQuestion = ({ item, index }) => (
    <QuestionComponent
      serialNo={item.id}
      question={item.name}
      answer={item.answer}
      updateAnswerInList={updateAnswerInList}
      index={index + 1}
    />
  );

  return (
    <Container style={styles.container}>
      <Loader loading={loading} />

      <StatusBar
        backgroundColor={APP_COLORS.STATUS_BAR_BACKGROUND_COLOR}
        barStyle="light-content"
      />

      <ImageBackground style={styles.image}>

        <NavigationBar
          props={navigation}
          type={null}
          text={'QUESTIONS'}
          isCardVisible={true}
          openDrawer={() => {
            openDrawer()
          }}
        />
        <View style={{ flex: 0.87 }}>

          <FlatList
            data={mainQuestionsList}
            showsVerticalScrollIndicator={false}
            renderItem={renderQuestion}
            keyExtractor={(item, index) => item.id}
          />
        </View>

        <View style={styles.nextButton}>
          <AppCommonButton
            btnTxt={APP_STRINGS.NEXT}
            disabled={disableNextButton}
            onPress={() => {
              Alert.alert(
                'Success, you have completed the required steps to join the event',
                '',
                [
                  {
                    text: "OK",
                    onPress: () => {
                      console.log("clicking")
                      navigation.navigate(APP_STRINGS.HOME)
                    },
                  }
                ],
                { cancelable: false }

              )
            }
            }
          />
        </View>
      </ImageBackground>
    </Container>
  );
};

export default QuestionsList;
