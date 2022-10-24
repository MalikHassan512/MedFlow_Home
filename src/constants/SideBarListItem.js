import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from "native-base";
import { APP_STRINGS } from "./strings";
import { Auth, DataStore } from "aws-amplify";


const SideBarListItem = ({ props, title, iconName, notification, destination }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        props.closeDrawer()
        if (title === APP_STRINGS.LOGOUT) {
          await DataStore.clear();
          await Auth.signOut();
          props.reset({
            index: 0,
            routes: [{ name: destination }],
          })
        }

        if (title === APP_STRINGS.SCAN_QR_CODE)
          props.navigate(destination);
        // this.props.navigation.navigate(this.props.destination);
      }}>
      <View
        style={styles.iconTopStyle}>

        <Icon
          active
          type={APP_STRINGS.IMAGES_TYPES.ANT_DESIGN}
          name={iconName}
          style={styles.iconStyle}
        />
        <View
          style={styles.textViewStyle}>
          <Text style={[{ marginLeft: 20, color: 'black', fontSize: 16 }, title === 'Logout' ? { textDecorationLine: 'underline' } : {}]}>
            {title}
          </Text>
          <Text style={{}}>{notification}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SideBarListItem

const styles = StyleSheet.create({
  container: {
    height: '8%',
    paddingLeft: 20,
  },
  iconTopStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  iconStyle: { color: "rgba(0,0,0,0.5)", alignSelf: "center" },
  textViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  }

})