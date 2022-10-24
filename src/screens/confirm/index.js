import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import {
    Container,
    Text,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Form,
    Item,
    Input,
} from 'native-base';
import styles from './styles';
import { APP_COLORS } from '../../constants/colors';

import DigitBox from './DigitBox'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STRINGS } from '../../constants/strings';
import { Employee } from '../../models';
import { CommonActions } from '@react-navigation/routers';
import Loader from '../../Loader';
import { Auth, DataStore, Hub } from 'aws-amplify';
import api from '../../api';
let isLoggedIn = false

const ConfirmScreen = ({ navigation, route }) => {
    const [displayError, setDisplayError] = useState(false);
    const [error, setError] = useState('');
    const { username, password, confirmation } = route.params
    const [loading, setLoading] = useState(false);

    const digit1Ref = useRef();
    const digit2Ref = useRef();
    const digit3Ref = useRef();
    const digit4Ref = useRef();
    const digit5Ref = useRef();
    const digit6Ref = useRef();


    const [confirmationCode, setConfirmationCode] = useState({
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: '',
        digit5: '',
        digit6: '',
    });

    useEffect(() => {

        digit1Ref.current.focus();

        numberStoreSilently()

    }, []);
    const numberStoreSilently = async () => {
        if (confirmation) {
            console.log("i am enter for resending ", username)
            await Auth.resendSignUp(username);

        }
        let phoneUser = {
            number: username,
            isConfirm: false
        }
        let confirmString = await AsyncStorage.getItem(APP_STRINGS.CONFIRM_PHONE)
        console.log("confirmList == > ", confirmString)

        let confirmList = JSON.parse(confirmString)
        if (confirmList && confirmList.length > 0) {
            console.log("enteringNumber111 == >? ", confirmList.find(item => item.number === username))

            if (confirmList.find(item => item.number === username) === undefined) {
                // console.log("enteringNumber111 == >? ", confirmList.find(item => item.number !== username))
                confirmList.push(phoneUser)

            }
        } else {
            confirmList = [phoneUser]
        }

        console.log("confirmList == > ", confirmList)

        await AsyncStorage.setItem(APP_STRINGS.CONFIRM_PHONE, JSON.stringify(confirmList))

    }

    const navigateUserHome = () => {
        setLoading(false);
        isLoggedIn = true

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                {
                    name: APP_STRINGS.START_SCREEN,
                },
            ],
        });
        navigation.dispatch(resetAction);
    };

    useEffect(() => {
        let { digit1, digit2, digit3, digit4, digit5, digit6 } = confirmationCode;
        if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6) {
            confirmSignUp();
        }
    }, [confirmationCode.digit6]);
    const confirmSignUp = async () => {
        let { digit1, digit2, digit3, digit4, digit5, digit6 } = confirmationCode;
        let codeToConfirm = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
        setLoading(true);
        try {
            console.log("confirmSignUp -- > " , username, codeToConfirm, password)

            await Auth.confirmSignUp(username, codeToConfirm);
            console.log("signUpConfirm -- > " )
            const signInnUser = await api.signIn(username, password);
            console.log("signInnUser", signInnUser)

            let phoneUser = {
                number: username,
                isConfirm: true
            }
            let confirmString = await AsyncStorage.getItem(APP_STRINGS.CONFIRM_PHONE)
            console.log("confirmList == > ", confirmString)

            let confirmList = JSON.parse(confirmString)
            if (confirmList && confirmList.length > 0) {
                const filterList = confirmList.filter((item) => item.number !== username)
                confirmList = filterList
                confirmList.push(phoneUser)
            }

            console.log("confirmList ", confirmList)

            await AsyncStorage.setItem(APP_STRINGS.CONFIRM_PHONE, JSON.stringify(confirmList))
            const employeeUser = await DataStore.query(Employee)

            console.log("printEmploueee -- > " , employeeUser)
            await DataStore.start();
            alert('Thank you! You have successfully created a Med Flow Account.')

            const hubListener = Hub.listen('datastore', async (hubData) => {
                if (isLoggedIn) {
                    return
                }

                const { event } = hubData.payload;
                if (event === 'ready') {
                    console.log("eeeeeee ==> ", event)
                    const newEmployeeCreated = await DataStore.save(
                        new Employee({
                            firstName: signInnUser?.["custom:firstName"].toLowerCase(),
                            lastName: signInnUser?.["custom:lastName"].toLowerCase(),
                            phoneNumber: username.substring(2),
                            email: signInnUser.email,
                            isNew: true,
                            subID: signInnUser.sub
                        }),
                    );
                    console.log("newEmployeeCreated == > ", newEmployeeCreated)
                    Hub.remove('datastore', hubListener);
                    // alert('Thank you! You have successfully created a Med Flow Account.')
                    navigateUserHome();
                }
            });
            // navigateUserHome();
        } catch (error) {
            console.log("signuperror == > ", error)
            setLoading(false);
            setDisplayError(true);
            if (error.code === 'CodeMismatchException') {
                setError('Invalid confirmation code');
            } else if (error.code === 'UserNotFoundException') {
                setError('User not found');
            } else if (error.code === 'LimitExceededException') {
                setError('Too many attempts. Try again later.');
            } else {
                setError('Something went wrong. Please try again.');
            }
            console.log("======error.code======", error);
            setConfirmationCode({
                digit1: '',
                digit2: '',
                digit3: '',
                digit4: '',
                digit5: '',
                digit6: '',
            });
            digit1Ref.current.focus();
        }
        //  alert('Thank you! You have successfully created a Med Flow Account.')
    };


    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

            <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
            <Loader loading={loading} />

                <Header style={styles.header}>
                    <Left>
                        <Button
                            active={true}
                            style={{ marginLeft: Platform.OS === 'ios' ? 0 : -60 }}

                            onPress={() => {
                                navigation.goBack();
                            }}
                            transparent>
                            <Icon style={{ ...styles.backButton, fontSize: 32 }} name="arrow-back" />
                        </Button>
                    </Left>
                </Header>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 30, color: APP_COLORS.WHITE }}>Confirmation</Text>
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 16,
                            color: APP_COLORS.PLACE_HOLDER_TEXT_COLOR
                        }}>
                        {`Enter the confirmation code sent to your phone number (${username}))`}
                    </Text>

                </View>
                <View style={styles.digitCon}>
                    <Text
                        style={{
                            opacity: displayError ? 1 : 0,
                            textAlign: 'center',
                            color: APP_COLORS.RED,
                            fontWeight: '500',
                        }}>
                        {error}
                    </Text>
                    <View style={styles.digitBoxes}>
                        <DigitBox
                            inputProps={{ autoFocus: true }}
                            digitInput={confirmationCode.digit1}
                            setData={(value) => {
                                console.log("value == > ", value)
                                if (value.length === 1) {
                                    setConfirmationCode({ ...confirmationCode, digit1: value.charAt(0) });
                                    digit2Ref.current.focus();
                                } else if (value.length === 2) {
                                    setConfirmationCode({ ...confirmationCode, digit2: value.charAt(1) });
                                    digit3Ref.current.focus();
                                } else if (value.length === 3) {
                                    setConfirmationCode({ ...confirmationCode, digit3: value.charAt(2) });
                                    digit4Ref.current.focus();
                                } else if (value.length === 4) {
                                    setConfirmationCode({ ...confirmationCode, digit4: value.charAt(3) });
                                    digit5Ref.current.focus();
                                } else if (value.length === 5) {
                                    setConfirmationCode({ ...confirmationCode, digit5: value.charAt(4) });
                                    digit6Ref.current.focus();
                                } else if (value.length === 6) {
                                    setConfirmationCode({ ...confirmationCode, digit6: value.charAt(5) });
                                    Keyboard.dismiss()

                                }
                                console.log("valueLength == > ", value.length)


                                setDisplayError(false);
                                // digit2Ref.current.focus();
                            }}
                            isFocused={
                                digit1Ref.current ? digit1Ref.current.isFocused() : false
                            }
                            forwardedRef={digit1Ref}
                        />

                        <DigitBox
                            digitInput={confirmationCode.digit2}
                            setData={(value) => {
                                setConfirmationCode({ ...confirmationCode, digit2: value });
                                digit3Ref.current.focus();
                            }}
                            onBack={(event) =>
                                event.nativeEvent.key === 'Backspace'
                                    ? (setConfirmationCode({ ...confirmationCode, digit1: '' }),
                                        digit1Ref.current.focus())
                                    : null
                            }
                            isFocused={
                                digit2Ref.current ? digit2Ref.current.isFocused() : false
                            }
                            forwardedRef={digit2Ref}
                        />

                        <DigitBox
                            digitInput={confirmationCode.digit3}
                            setData={(value) => {
                                setConfirmationCode({ ...confirmationCode, digit3: value });
                                digit4Ref.current.focus();
                            }}
                            onBack={(event) =>
                                event.nativeEvent.key === 'Backspace'
                                    ? (setConfirmationCode({ ...confirmationCode, digit2: '' }),
                                        digit2Ref.current.focus())
                                    : null
                            }
                            isFocused={
                                digit3Ref.current ? digit3Ref.current.isFocused() : false
                            }
                            forwardedRef={digit3Ref}
                        />

                        <DigitBox
                            digitInput={confirmationCode.digit4}
                            setData={(value) => {
                                setConfirmationCode({ ...confirmationCode, digit4: value });
                                digit5Ref.current.focus();
                            }}
                            onBack={(event) =>
                                event.nativeEvent.key === 'Backspace'
                                    ? (setConfirmationCode({ ...confirmationCode, digit3: '' }),
                                        digit3Ref.current.focus())
                                    : null
                            }
                            isFocused={
                                digit4Ref.current ? digit4Ref.current.isFocused() : false
                            }
                            forwardedRef={digit4Ref}
                        />

                        <DigitBox
                            digitInput={confirmationCode.digit5}
                            setData={(value) => {
                                setConfirmationCode({ ...confirmationCode, digit5: value });
                                digit6Ref.current.focus();
                            }}
                            onBack={(event) =>
                                event.nativeEvent.key === 'Backspace'
                                    ? (setConfirmationCode({ ...confirmationCode, digit4: '' }),
                                        digit4Ref.current.focus())
                                    : null
                            }
                            isFocused={
                                digit5Ref.current ? digit5Ref.current.isFocused() : false
                            }
                            forwardedRef={digit5Ref}
                        />

                        <DigitBox
                            digitInput={confirmationCode.digit6}
                            setData={(value) => {
                                setConfirmationCode({ ...confirmationCode, digit6: value });
                                digit5Ref.current.focus();
                            }}
                            onBack={(event) =>
                                event.nativeEvent.key === 'Backspace'
                                    ? (setConfirmationCode({ ...confirmationCode, digit5: '' }),
                                        digit5Ref.current.focus())
                                    : null
                            }
                            isFocused={
                                digit6Ref.current ? digit6Ref.current.isFocused() : false
                            }
                            forwardedRef={digit6Ref}
                        />
                    </View>

                    <TouchableOpacity onPress={async () => {
                        try{
                            await Auth.resendSignUp(username);
                            alert("We have successfully sent another code to your phone")
                        }catch(error){
                            console.log("printError ", error)
                        }
             
                    }}>
                        <View style={styles.button}>
                            <Text style={{ color: "white", width: 100 }} numberOfLines={1}>Resend Code</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Container>
        </TouchableWithoutFeedback>
    )
}

export default ConfirmScreen