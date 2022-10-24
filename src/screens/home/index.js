import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, Platform, SafeAreaView } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { testAction } from '../../store/actions';
import TouchID from 'react-native-touch-id';
import SplashScreen from 'react-native-splash-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SvgQRCode from 'react-native-qrcode-svg';
import { APP_COLORS } from '../../constants/colors';
import { Container, Icon } from 'native-base';
import { NavigationBar } from '../../components/NavigationBar';
import PassKit, { AddPassButton } from 'react-native-wallet-pass';
import { APP_STRINGS } from '../../constants/strings';
import api from '../../api';
import SCLogo from '../../components/SCLogo';

const STATIC_PHONE_NUMBER = '8888888888'
const { width, height } = Dimensions.get('window');
const DEVICES = [
  'iPhone X',
  'iPhone XS',
  'iPhone XS Max',
  'iPhone XR'
]

const DEVICE_STANDARD_HEIGHTS = {
  "iPhone X": 812,
  "iPhone XS": 812,
  "iPhone XS Max": 896,
  "iPhone XR": 896,
}

const Home = ({ navigation }) => {
  const initialState = useSelector(state => state.reducer.auth);
  const [userNameChar, setUserNameChar] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    const getUSer = async () => {
      const user = await api.getCurrentUser();
      setUserNameChar(user?.["custom:firstName"] && user?.["custom:lastName"] ? user["custom:firstName"] + " " + user["custom:lastName"] : user ? user.email : '')
    }
    getUSer();

  }, [])


  const isIphoneXorAbove = () => {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896) || (dimen.height >= 900 || dimen.width >= 400) || (dimen.height >= 844 || dimen.width >= 390))
    );
  }

  const closeDrawer = () => {
    navigation.closeDrawer()

  };

  const openDrawer = () => {
    navigation.openDrawer()

  };

  return (
    <Container style={styles.container}>
      <SafeAreaView style={styles.safeAreaStyling}>
        <NavigationBar
          props={navigation}
          type={null}
          text={'My QR CODE'}
          isCardVisible={true}
          openDrawer={() => {
            openDrawer()
          }}
        />
        <View style={styles.topInnnerViewStyling}>
          <View style={styles.topCircleOfName}>
            <Text style={styles.circleInnerTxt}>
              {userNameChar.split(" ").length > 1 ? userNameChar.split(" ")[0].substring(0, 1).toUpperCase() + userNameChar.split(" ")[1].substring(0, 1).toUpperCase() : userNameChar.substring(0, 1).toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.nameTitleTxt}>{userNameChar}</Text>
        <View style={styles.qrCon}>
          <SvgQRCode value={STATIC_PHONE_NUMBER} size={isIphoneXorAbove ? wp('55%') : wp('45%')}  />
        </View>
        <View style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'My Card',
              'Present My Card when being tested at a Safe Camp testing site to uniqely identify yourself and enable test results to be synced back to your mobile device.',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]
            );
          }}>
            <View style={styles.qrCodeInfoTopView}>
              <Icon
                active
                type={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
                name={APP_STRINGS.INFO}
                style={styles.infoStyle}
              />
              <Text style={styles.qrCodeTxtStyling}>{APP_STRINGS.QR_CODE_INFO_TXT}</Text>
            </View>
          </TouchableOpacity>
          {
            Platform.OS === 'ios' ?
              <AddPassButton
                style={styles.passKitButton}
                addPassButtonStyle={PassKit.AddPassButtonStyle.black}
                onPress={async () => {

                }}
              />
              : null
          }

          <View style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: isIphoneXorAbove ? wp('10%') : wp('4%'),
          }}>
            <SCLogo width={isIphoneXorAbove ? wp('15') : wp('12')} height={isIphoneXorAbove ? wp('15') : wp('12')}
              bottomStickColor={'#ffffff'} />
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Home;
