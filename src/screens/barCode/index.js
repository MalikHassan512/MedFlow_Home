import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Modal, Image, StatusBar} from "react-native";
import {LoadingScreenComponent} from "../../components";
import BarcodeMask from "react-native-barcode-mask";
import {RNCamera} from "react-native-camera";
import styles, {qrSize} from "./styles";

const BarCode = ({ navigation }) => {
  const navigate = useNavigation();
  const [barCodeValue, setBarCodeValue] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isBarCodeVerified, setBarCodeVerified] = useState(false)

  const onBarCodeRead = ({data}) => {
    setBarCodeValue(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBarCodeVerified(!isBarCodeVerified);
    }, 5 * 1000);

    console.log('JSON.stringify(data) True ===> ', JSON.stringify(data));
  };

  function BarCodeScannedComponent() {
    return <>
      {barCodeValue.length < 1 && (
        <>
          <RNCamera
            captureAudio={false}
            style={styles.preview}
            onBarCodeRead={onBarCodeRead}>
            <BarcodeMask
              width={qrSize}
              height={qrSize}
              outerMaskOpacity={0.8}
              lineAnimationDuration={1500}
              showAnimatedLine={true}
              animatedLineColor={'red'}
            />
            <View style={styles.qrTopContainerStyle}>
              <Text style={styles.qrTextStyle}>QR code quick scan</Text>
              <Text style={styles.qrTextStyle}>Place the QR code inside the frame</Text>
            </View>
            <View style={styles.qrBottomContainerStyle}>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate.goBack(null)}>
                <Text style={styles.qrButtonStyle}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </RNCamera>
        </>
      )}
    </>;
  }

  function scanResultsModal() {
    return (
      <Modal
        transparent={true}
        visible={barCodeValue.length > 0 && !isLoading}
        animationType={'slide'}
        animated={true}>
        <View style={[styles.modelStyle, {backgroundColor: isBarCodeVerified ? '#6ab04c' : '#FF9494'}]}>
          {isBarCodeVerified ? (
            <Image source={require('../../assets/ic_verified_qr.png')} style={styles.iconStyle}/>
          ) : (
            <Image source={require('../../assets/ic_not_verified_qr.png')} style={styles.iconStyle}/>
          )}
          {isBarCodeVerified ? (
            <Text style={styles.messageTextStyle}>Scan Verified!</Text>
          ) : (
            <Text style={styles.messageTextStyle}>Scan Not Verified!</Text>
          )}
          <TouchableOpacity style={styles.buttonContainer} onPress={() =>  setBarCodeValue('')}>
            <Text style={styles.buttonStyle}>CLOSE</Text>
          </TouchableOpacity>
          <Text style={styles.bottomTextStyle} onPress = {()=>  setBarCodeValue('')}>Close to scan again.</Text>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'black'}
        barStyle="light-content"
      />
      {BarCodeScannedComponent()}
      <LoadingScreenComponent visible={isLoading} messageText={'Please wait...'}/>
      {scanResultsModal()}
    </View>
  );
};

export default BarCode;
