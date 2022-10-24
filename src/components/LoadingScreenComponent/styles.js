import {StyleSheet} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const sparkleIconSize = hp('55%');

const styles = StyleSheet.create({
  loadingContainerStyle: {
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255)',
    height: hp('100%'),
    width: wp('100%'),
  },
  logoContainerStyle: {marginTop: hp('15%'), alignItems: 'center', justifyContent: 'center'},
  appLogoStyle: {height: 240, width: 240, resizeMode: 'contain', position: 'absolute'},
  sparklesStyle: {height: sparkleIconSize, width: sparkleIconSize},
  loadingTextStyle: {
    color: 'grey',
    fontSize: hp('2.5%'),
  },
});

export default styles;
