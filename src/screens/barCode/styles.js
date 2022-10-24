import {StyleSheet} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const iconSize = hp('30%');
const crossIconSize = hp('25%');
export const qrSize = wp('70%');

const styles = StyleSheet.create({
  qrTopContainerStyle: {position: 'absolute', top: hp('13%'), alignItems: 'center'},
  qrBottomContainerStyle: {position: 'absolute', bottom: hp('15%'), alignItems: 'center'},
  qrTextStyle: {color: 'white', fontSize: hp('2.1%'), marginTop: hp('1%')},
  iconStyle: {height: iconSize, width: iconSize, tintColor: 'white'},
  xIconStyle: {height: crossIconSize, width: crossIconSize, tintColor: 'white'},
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  modelStyle: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: "white",
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    backgroundColor: 'red',
    height: hp('100%'),
    width: wp('100%'),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {marginTop: hp('5%')},
  messageTextStyle: {
    marginTop: hp('20%'),
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('4%'),
  },
  bottomTextStyle: {
    marginTop: hp('1.5%'),
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.6%'),
  },
  buttonStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    width: wp('80%'),
    textAlign: 'center',
    borderRadius: 15,
  },
  qrButtonStyle: {
    color: 'black',
    fontSize: hp('2.2%'),
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    width: wp('70%'),
    textAlign: 'center',
    borderRadius: 8,
  },
});

export default styles;
