import Auth from "@aws-amplify/auth";
import { DataStore, Hub } from "aws-amplify";
import { AsYouType } from "libphonenumber-js";
import { isNull } from "lodash";
import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Root,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import TouchID from "react-native-touch-id";
import api from "../../api";
import AppCommonButton from "../../components/AppCommonButton";
import { ICONS_NAME } from "../../constants";
import { APP_COLORS } from "../../constants/colors";
import { APP_STRINGS } from "../../constants/strings";
import styles from "./styles";

let isLoggedIn = false;
const HOME_LOGO_PATH = "../../assets/medflow-home-logo.png"
const Login = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectLoginDisplay, setIncorrectLoginDisplay] = useState(false);
  const [errorMsgDisplayPwd, setErrorMsgDisplayPwd] = useState(false);
  const [errorMsgDisplayUser, setErrorMsgDisplayUser] = useState(false);
  const [myErrorMsg, setErrorMsg] = useState(APP_STRINGS.FEILD_REQUIRED);
  const [isLoading, setIsLoading] = useState(false);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const user = await api.getCurrentUser();
      if (!isNull(user)) {
        navigation.reset({
          index: 0,
          routes: [{ name: APP_STRINGS.START_SCREEN }],
        });
      }
      SplashScreen.hide();
    }, 2000);
  }, []);

  const signUpBtnProcessed = async () => {
    Keyboard.dismiss();
    if (username == "" && password == "") {
      setErrorMsgDisplayUser(true);
      setErrorMsgDisplayPwd(true);
    } else if (username == "") {
      setErrorMsgDisplayUser(true);
    } else if (password == "") {
      setErrorMsgDisplayPwd(true);
    } else {
      setIsLoading(true);

      try {
        const user = await api.signIn(
          "+1" + username.replace(/\D/g, ""),
          password
        );
        if (user !== undefined) {
          await DataStore.start();
          await listener();
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const listener = async () => {
    const hubListener = Hub.listen("datastore", async (hubData) => {
      if (isLoggedIn) {
        return;
      }
      const { event } = hubData.payload;
      const { data } = hubData.payload;
      console.log("eventOccur -- > ", event);
      if (event === "ready") {
        const loginUser = await api.getCurrentUser();
        if (loginUser) {
          setLoading(false);
          isLoggedIn = true;
          navigation.reset({
            index: 0,
            routes: [{ name: APP_STRINGS.START_SCREEN }],
          });
          Hub.remove("datastore", hubListener);
        }
      }
    });
  };

  const faceRecognizeClick = () => {
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.authenticate(
      "to demo this react-native component",
      optionalConfigObject
    )
      .then((success) => {
        console.log("printSuccess -- > ", success);

        Alert.alert("FACE Authenticated Successfully");
      })
      .catch((error) => {
        console.log("printError -- > ", error);
        Alert.alert("FACE SAuthentication Failed");
      });
  };

  let errorMsg = (
    <View
      style={
        incorrectLoginDisplay
          ? styles.incorrectLoginError
          : styles.emptyFieldError
      }
    >
      <Text
        style={
          incorrectLoginDisplay ? styles.incorrectTxtStyle : styles.errorStyles
        }
      >
        {myErrorMsg}
      </Text>
    </View>
  );
  return (
    <Container style={styles.container}>
      <StatusBar
        backgroundColor={APP_COLORS.STATUS_BAR_BACKGROUND_COLOR}
        barStyle="light-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.homeLogoImageSize}
            resizeMode={"stretch"}
            source={require(HOME_LOGO_PATH)}
          />
          {/* <Text style={styles.titleStyle}>{APP_STRINGS.MED_FLOW_HOME}</Text> */}
        </View>

        {incorrectLoginDisplay && errorMsg}
        {isLoading && (
          <View
            style={{
              elevation: 20,
            }}
          >
            <ActivityIndicator size="large" color={APP_COLORS.BUTTON_COLOR} />
          </View>
        )}
        <Item style={styles.transparentWithTwentyMargin}>
          <Icon
            active
            type={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
            name={ICONS_NAME.USER_ICON}
            style={styles.iconStyle}
          />
          <View style={styles.flexHorizontal}>
            <Input
              ref={userNameRef}
              style={styles.inputStyle}
              placeholder={APP_STRINGS.PHONE_NUMBER_PLACE_HOLDERS}
              placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
              keyboardType={APP_STRINGS.KEYBOARD_TYPES.NUMBER_PAD}
              value={username}
              onChangeText={(text) => {
                if (
                  text.length < username.length &&
                  new AsYouType("US").input(text) === username
                ) {
                  text = text.slice(0, -1);
                }
                setUserName(new AsYouType("US").input(text));
                setErrorMsgDisplayUser(false);
                setIncorrectLoginDisplay(false);
                setErrorMsg(APP_STRINGS.FEILD_REQUIRED);

                if (text.length > 13) {
                  passwordRef.current._root.focus();
                }
              }}
              returnKeyType={"next"}
              blurOnSubmit={false}
            />
            {errorMsgDisplayUser ? errorMsg : null}
          </View>
        </Item>

        <Item style={{ ...styles.transparentWithTwentyMargin, marginTop: 15 }}>
          <Icon
            active
            type={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
            name={ICONS_NAME.LOCK_ICON}
            style={styles.iconStyle}
          />
          <View style={styles.flexHorizontal}>
            <Input
              ref={passwordRef}
              style={styles.inputStyle}
              placeholder={APP_STRINGS.PASSWORD_PLACE_HOLDER}
              placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrorMsgDisplayPwd(false);
                setIncorrectLoginDisplay(false);
                setErrorMsg(APP_STRINGS.FEILD_REQUIRED);
              }}
              secureTextEntry={true}
            />
            {errorMsgDisplayPwd ? errorMsg : null}
          </View>
        </Item>

        <View style={styles.topThirty}>
          <AppCommonButton
            btnTxt={APP_STRINGS.SIGN_IN_TXT}
            disabled={username.length < 12 || password.length < 5 || isLoading}
            onPress={() => {
              signUpBtnProcessed();
            }}
          />
        </View>

        <View style={{ ...styles.signUp, justifyContent: "center" }}>
          <Text style={styles.dontHaveAccount}>
            Don&#x27;t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(APP_STRINGS.SIGN_UP_SCREEN);
            }}
          >
            <Text style={styles.signUpTitle}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUp}>
          <TouchableOpacity
            onPress={() => {
              faceRecognizeClick();
            }}
          >
            <Text style={styles.faceRecogiseTxt}>
              {APP_STRINGS.FACIAL_RECOGNITION}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.topThirty}>
          <AppCommonButton
            btnTxt={APP_STRINGS.BAR_CODE}
            disabled={false}
            onPress={() => navigation.navigate(APP_STRINGS.BAR_CODE)}
          />
        </View> */}
      </ScrollView>
    </Container>
  );
};

export default Login;
