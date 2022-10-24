import { StyleSheet } from 'react-native';
import { SCREEN_DIMENSIONS_HEIGHT, SCREEN_DIMENSIONS_WIDTH } from '../../constants';
import { APP_COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: APP_COLORS.APP_BACKGROUND_COLOR
    },
    logoContainer: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 138,
        width: '80%',
    },
    contentContainer: {
        flexGrow: 1,
    },
    incorrectLoginError: {
        marginLeft: 15,
    },
    emptyFieldError: {
        position: 'absolute',
        bottom: -20,
        marginLeft: 15,
        marginEnd: 5
    },
    homeLogoImageSize: { width: "80%", height: 110 },
    iconStyle: { color: '#D8D8D8' },
    flexHorizontal: { flex: 1, flexDirection: 'row' },
    inputStyle: {
        color: '#D8D8D8',
        marginLeft: 10,
        marginRight: 20,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 0.6,
    },
    incorrectTxtStyle: {
        fontSize: 14,
        color: 'red',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 3,
        flexDirection: 'row'
    },
    errorStyles: { fontSize: 13, color: 'red', marginTop: 3 },
    transparentWithTwentyMargin: {
        borderColor: 'transparent',
        marginLeft: 20
    },
    button: {
        alignSelf: 'center',
        backgroundColor: APP_COLORS.BUTTON_COLOR,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: SCREEN_DIMENSIONS_WIDTH / 2 - 50,
        paddingRight: SCREEN_DIMENSIONS_WIDTH / 2 - 50,
        borderRadius: 30,
    },
    signUp: {
        alignSelf: 'center',
        paddingTop: 10,
        flexDirection: 'row',
        marginTop: 10,
    },

    faceRecogiseTxt: {
        color: APP_COLORS.BUTTON_COLOR,
        fontSize: 18,
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    topThirty: {
        marginTop: 50
    },
    titleStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 36
    },
    signUpTitle: {
        color: APP_COLORS.BUTTON_COLOR,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    dontHaveAccount: {
        color: APP_COLORS.PLACE_HOLDER_TEXT_COLOR,
        marginEnd: 5,
        fontSize: 16
    },
    image: {
        width: SCREEN_DIMENSIONS_WIDTH,
        height: SCREEN_DIMENSIONS_HEIGHT,
        alignItems: 'flex-start',
    },
    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        marginBottom: 20,
        width: '100%',
        shadowColor: 'transparent',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 30,
        marginLeft: 35,
        color: '#D8D8D8',
        // fontWeight: '100',
    },

    backButton: {
        color: APP_COLORS.BUTTON_COLOR,
        zIndex: 99,
    },
    formContainer: {
        flex: 0.5,
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
    },
    horizontalContainer: {
        flex: 0.8,
        alignSelf: 'stretch',
    },


});

export default styles;
