import { StyleSheet } from 'react-native';
import { SCREEN_DIMENSIONS_HEIGHT, SCREEN_DIMENSIONS_WIDTH } from '../../constants';
import { APP_COLORS } from '../../constants/colors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.APP_BACKGROUND_COLOR
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

    digitBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },

    digitCon: {
        flexDirection: 'column',
        marginTop: 150,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: 'rgba(216, 216, 216, 0.25)',
        borderRadius: 20,
    },

    backButton: {
        color: APP_COLORS.BUTTON_COLOR,
        zIndex: 99,
    },

    button: {
        marginTop : 30,
        alignSelf: 'center',
        backgroundColor: APP_COLORS.BUTTON_COLOR,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: SCREEN_DIMENSIONS_WIDTH / 2 - 80,
        paddingRight: SCREEN_DIMENSIONS_WIDTH / 2 - 80,
        borderRadius: 30,
    },

})

export default styles;
