import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    ActivityIndicator,
    Modal,
    Platform,
} from 'react-native';
import {
    Button,
    Text,
    Header,
    Left,
    Container,
    Item,
    Input,
    Icon,
    Root,
    Body,
    Content,
} from 'native-base';
import { APP_COLORS } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../login/styles';
import { APP_STRINGS } from '../../constants/strings';
import InputView from '../../components/InputView';
import { AsYouType } from 'libphonenumber-js';
import AppCommonButton from '../../components/AppCommonButton';
import { validEmail, validPassword, VALID_PASSWORD_ERROR } from '../../constants';
import { useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST } from '../../store/actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../Loader';
import { Auth } from 'aws-amplify';

const SignUpScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [signUpErrors, setSignUpErrors] = useState(false)
    const [myErrorMsg, setErrorMsg] = useState('')
    const [firstNameError, setFirstNameError] = useState(null)
    const [lastNameError, setLastNameError] = useState(null)
    const [phoneNumberError, setPhoneNumberError] = useState(null)
    const [isPhoneNumberValid, setPhoneNumberValid] = useState(true)
    const [isEmailValid, setEmailValid] = useState(true)
    const [isValidPassword, setValidPassword] = useState(true)
    const [passwordError, setPasswordError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [incorrectLoginDisplay, setIncorrectLoginDisplay] = useState(false)
    const [loading, setLoading] = useState(false)


    const signUpUser = async () => {
        console.log("phoneeee - >  ", phoneNumber.replace(/\D/g, ''))
        setLoading(true)
        try {
            const signUpParams = {
                username: '+1' + phoneNumber.replace(/\D/g, ''),
                password: password,
                attributes: {
                    email: emailAddress,
                    preferred_username: firstName + ' ' + lastName,
                    phone_number: '+1' + phoneNumber.replace(/\D/g, ''),
                    'custom:firstName': firstName,
                    'custom:lastName': lastName,
                    'custom:role': 'Employees',
                    "custom:note": "System",
                },
            }
            const signUp = await Auth.signUp(signUpParams)
            setLoading(false)

            navigation.navigate(APP_STRINGS.CONFIRM_SCREEN, {
                username: signUp.user.username,
                password: password,
                confirmation: false
            });
        } catch (err) {
            let message = err
            if (message.toString() === APP_STRINGS.USER_NAME_EXIST_EXCEPTION) {
                let confirmString = await AsyncStorage.getItem(APP_STRINGS.CONFIRM_PHONE)
                let confirmList = JSON.parse(confirmString)
                if (confirmList && confirmList.length > 0) {
                    const filterList = confirmList.filter((item) => item.number === '+1' + phoneNumber.replace(/\D/g, ''))

                    if (filterList.length > 0 && !filterList[filterList.length - 1].isConfirm) {
                        navigation.navigate(APP_STRINGS.CONFIRM_SCREEN, {
                            username: '+1' + phoneNumber.replace(/\D/g, ''),
                            password: password,
                            confirmation: true
                        });
                    } else {
                        setSignUpErrors(err);
                    }
                } else
                    setSignUpErrors(err);
            } else {
                setSignUpErrors(err);
            }
            setLoading(false)

        }

    }

    let errorMsg = (
        <View
            style={
                incorrectLoginDisplay
                    ? styles.incorrectLoginError
                    : styles.emptyFieldError
            }>
            <Text
                style={
                    incorrectLoginDisplay
                        ? styles.incorrectTxtStyle
                        : styles.errorStyles
                }>
                {myErrorMsg}
            </Text>
        </View>
    );


    return (
        <Container style={styles.container}>
            <StatusBar backgroundColor={APP_COLORS.STATUS_BAR_BACKGROUND_COLOR} barStyle="light-content" />
            <Loader loading={loading} />

            <KeyboardAwareScrollView>

                <ImageBackground style={styles.image}>
                    <Header style={styles.header}>
                        <Left>
                            <Button
                                style={{ marginLeft: Platform.OS === 'ios' ? 0 : -60 }}
                                onPress={() => navigation.goBack()}
                                transparent>
                                <Icon
                                    style={{ ...styles.backButton, fontSize: 32 }}
                                    name="arrow-back"
                                />
                            </Button>
                        </Left>
                    </Header>

                    <View style={{ flex: 0.1, marginLeft: -15 }}>
                        <View style={styles.row}>
                            <Text style={styles.title}>New Account</Text>
                        </View>
                        {signUpErrors && (
                            <View style={{ paddingHorizontal: 35 }}>
                                <Text style={{ fontSize: 12, color: 'red' }}>
                                    {signUpErrors.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formContainer}>

                        <InputView
                            iconType={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
                            iconName={APP_STRINGS.USER}
                            placeHolder={APP_STRINGS.FIRST_NAME_PLACE_HOLDERS}
                            value={firstName}
                            returnKeyType={'next'}
                            autoCapitalize={false}
                            placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
                            setText={(text) => {
                                setFirstName(text)
                            }}
                            isErrorDisplay={firstNameError}
                            myErrorMsg={myErrorMsg}
                            displayErrorType={incorrectLoginDisplay}
                        />


                        <InputView
                            iconType={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
                            iconName={APP_STRINGS.USER}
                            placeHolder={APP_STRINGS.LAST_NAME_PLACE_HOLDER}
                            value={lastName}
                            returnKeyType={'next'}
                            autoCapitalize={true}
                            placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
                            setText={(text) => {
                                setLastName(text)
                            }}
                            isErrorDisplay={lastNameError}
                            myErrorMsg={myErrorMsg}
                            displayErrorType={incorrectLoginDisplay}
                        />

                        <InputView
                            iconType={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
                            iconName={APP_STRINGS.Phone}
                            placeHolder={APP_STRINGS.PHONE_NUMBER_PLACE_HOLDERS}
                            value={phoneNumber}
                            returnKeyType={'next'}
                            autoCapitalize={false}
                            placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
                            setText={(text) => {
                                if (
                                    text.length < phoneNumber.length &&
                                    new AsYouType('US').input(text) === phoneNumber
                                ) {
                                    text = text.slice(0, -1);
                                }
                                if (new AsYouType('US').input(text).length > 13) {
                                    setPhoneNumberValid(false)
                                } else {
                                    setPhoneNumberValid(true)
                                }
                                setPhoneNumber(new AsYouType('US').input(text))
                                setPhoneNumberError(false)
                                setIncorrectLoginDisplay(false)
                                setErrorMsg(APP_STRINGS.FEILD_REQUIRED)
                            }}
                            keyboardType={APP_STRINGS.KEYBOARD_TYPES.NUMBER_PAD}
                            isErrorDisplay={phoneNumberError}
                            myErrorMsg={myErrorMsg}
                            displayErrorType={incorrectLoginDisplay}
                        />

                        <InputView
                            iconType={APP_STRINGS.IMAGES_TYPES.MATERIAL_COMMUNITY_DESIGN}
                            iconName={APP_STRINGS.EMAIL_OUTLINE}
                            placeHolder={APP_STRINGS.EMAIL}
                            value={emailAddress}
                            returnKeyType={'next'}
                            autoCapitalize={false}
                            placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
                            setText={(text) => {
                                if (validEmail.test(text)) {
                                    setEmailValid(false)
                                } else {
                                    setEmailValid(true)
                                }
                                setEmailAddress(text)
                            }}
                            keyboardType={APP_STRINGS.KEYBOARD_TYPES.EMAIL_ADDRESS}
                            isErrorDisplay={emailError}
                            myErrorMsg={myErrorMsg}
                            displayErrorType={incorrectLoginDisplay}
                        />

                        <InputView
                            iconType={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
                            iconName={APP_STRINGS.PASSWORD_LOCK}
                            placeHolder={APP_STRINGS.PASSWORD_HINT}
                            value={password}
                            returnKeyType={'next'}
                            autoCapitalize={false}
                            placeholderTextColor={APP_COLORS.PLACE_HOLDER_TEXT_COLOR}
                            setText={(text) => {
                                if (validPassword.test(text)) {
                                    setValidPassword(false)
                                    setPasswordError(false)
                                    setErrorMsg('')
                                } else if (text.length == 0) {
                                    setErrorMsg('')

                                } else {
                                    setPasswordError(true)
                                    setValidPassword(true)
                                    setErrorMsg(VALID_PASSWORD_ERROR)

                                }
                                setPassword(text)
                            }}
                            isErrorDisplay={passwordError}
                            myErrorMsg={myErrorMsg}
                            displayErrorType={incorrectLoginDisplay}
                            secureEntry={true}

                        />


                        <View style={{marginTop : 80}}>
                            <AppCommonButton
                                btnTxt={APP_STRINGS.CREATE}
                                disabled={firstName === '' || lastName === '' || isPhoneNumberValid || isEmailValid || isValidPassword || loading}
                                onPress={async() => {
                                    await signUpUser()
                                    //navigation.navigate(APP_STRINGS.CONFIRM_SCREEN)
                                    // signUpBtnProcessed()
                                }}
                            />

                        </View>



                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>

        </Container>

    )
}

export default SignUpScreen