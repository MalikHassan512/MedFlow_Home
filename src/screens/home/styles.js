import { StyleSheet } from 'react-native';
import { APP_COLORS } from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const isIphoneXorAbove = () => {
  const dimen = Dimensions.get('window');
  console.log("height -- > ", dimen.height, dimen.width)
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896) || (dimen.height >= 900 || dimen.width >= 400) || (dimen.height >= 844 || dimen.width >= 390))
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.APP_BACKGROUND_COLOR,
    alignItems: 'center',

  },

  safeAreaStyling: { flex: 1, alignItems: "center" },

  topInnnerViewStyling:
  {
    width: isIphoneXorAbove ? wp('23%') : wp('19%'),
    height: isIphoneXorAbove ? wp('23%') : wp('19%'),
    borderRadius: isIphoneXorAbove ? wp('23%') / 2 : wp('19%') / 2,
    borderColor: "rgb(73,77,90)",
    borderWidth: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  topCircleOfName:
  {
    width: (isIphoneXorAbove) ? wp('22%') : wp('18%'),
    height: isIphoneXorAbove ? wp('22%') : wp('18%'),
    borderRadius: isIphoneXorAbove ? wp('22%') / 2 : wp('18%') / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },

  circleInnerTxt : {
    color: 'gray',
    fontSize: wp('8%')
  },

  nameTitleTxt : {
    marginTop: wp('2%'),
    fontSize: wp('4.5%'),
    color: APP_COLORS.WHITE,
  },
  qrCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginTop: isIphoneXorAbove ? wp('11%') : wp('9%')
  },
  qrCodeInfoTopView : {
    flexDirection: "row",
    marginVertical: isIphoneXorAbove ? wp('13%') : wp('10%'),
    justifyContent: "center",
    alignItems: "center"
  },
  infoStyle : {
    color: "gray",
    fontSize: wp('6%'),
    borderRadius: wp('6%') / 2,
    backgroundColor: "white",
    overflow: "hidden"
  },
  qrCodeTxtStyling : {
    color: 'white',
    marginHorizontal: wp('2%'),
    fontSize: wp('4.2%'),
  },
  passKitButton : {
    width: isIphoneXorAbove ? wp('40%') : wp('35%'),//isIphoneXorAbove ? 145 : 145,
    height: isIphoneXorAbove ? wp('10.5%') : wp('9.5%')//isIphoneXorAbove ? 40 : 40,
  }
});

export default styles;
