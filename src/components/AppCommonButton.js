import React, { useEffect } from 'react';
import { Button } from "native-base";
import { Text, View } from "react-native";
import styles from "../screens/login/styles";
import { APP_COLORS } from '../constants/colors';


const AppCommonButton = (props) => {  
    return (
        <Button
            style={{...styles.button, backgroundColor : props.disabled ? APP_COLORS.BUTTON_DISABLED_COLOR : APP_COLORS.BUTTON_COLOR}}
            disabled={props.disabled}
            onPress={() => {
                props.onPress()
            }}>
            <Text style={{ color: props.disabled ? APP_COLORS.GRAY :  APP_COLORS.WHITE, fontSize : 16, fontWeight : "bold" }}>{props.btnTxt}</Text>
        </Button>
    )
}

export default AppCommonButton

