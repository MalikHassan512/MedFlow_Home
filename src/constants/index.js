import { Dimensions } from "react-native";

export const SCREEN_DIMENSIONS_WIDTH = Dimensions.get('window').width
export const SCREEN_DIMENSIONS_HEIGHT = Dimensions.get('window').height
export const ICONS_NAME = {
    LOCK_ICON : 'lock1',
    USER_ICON : 'user',
    SETTING: 'setting',
    LOG_OUT: 'logout',
    QR_CODE : 'qrcode'
}

export const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!()@#\?/\$%\^&\*])(?=.{8,})");
export const VALID_PASSWORD_ERROR = 'Password at least 8 characters, 1 num, 1 UC, 1 LC, and 1 SC'
