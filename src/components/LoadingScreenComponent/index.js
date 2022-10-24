import React from "react";
import {Image, Text, View} from "react-native";
import styles from './styles';


const LoadingScreenComponent = (props) => {
  if (!props.visible){
    return null;
  }

  return (
    <View style={styles.loadingContainerStyle}>
      <View style={styles.logoContainerStyle}>
        <Image source={require('../../assets/ic_sparkels.gif')} style={styles.sparklesStyle}/>
        <Image source={require('../../assets/medflow-home-logo.png')} style={styles.appLogoStyle}/>
      </View>
      <Text style={styles.loadingTextStyle}>{props.messageText}</Text>
    </View>
  );
};
export default LoadingScreenComponent;
