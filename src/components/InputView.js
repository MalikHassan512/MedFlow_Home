import { Icon, Input, Item, Text } from "native-base"
import React, { useState } from 'react';
import { View } from "react-native"
import { APP_COLORS } from "../constants/colors";
import styles from "../screens/login/styles"


const InputView = ({iconType, iconName, placeHolder, value, returnKeyType, autoCapitalize, keyboardType, placeholderTextColor, setText, isErrorDisplay, myErrorMsg, displayErrorType, secureEntry}) => {

    const [incorrectLoginDisplay, setIncorrectLoginDisplay] = useState(displayErrorType)
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
                }
                numberOfLines = {2}
                >
                {myErrorMsg}
            </Text>
        </View>
    );
    return (
        <Item style={{ borderColor: 'transparent', marginLeft: 20 , marginTop : 30}}>
            <Icon
                active
                type={iconType}
                name={iconName}
                style={{ color: APP_COLORS.PLACE_HOLDER_TEXT_COLOR }}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Input
                    style={styles.inputStyle}
                    returnKeyType={returnKeyType}
                    autoCapitalize={autoCapitalize ? 'words' : 'none'}
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    placeholder={placeHolder}
                    value={value}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={setText}
                    secureTextEntry = {secureEntry ? secureEntry : false}

                />
                {isErrorDisplay ? errorMsg : null}
            </View>
        </Item>
    )
}

export default InputView