import { Body, Header, Icon, Left, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN_DIMENSIONS_WIDTH } from '../constants';
import { APP_COLORS } from '../constants/colors';


export const NavigationBar = ({ props, type, text, isCardVisible, openDrawer }) => {
    useEffect(()=>{
        console.log("logs -- > " , props)
    }, [])
    return (
        <Header style={{ ...styles.header, width: SCREEN_DIMENSIONS_WIDTH, justifyContent: "center" }}>
            <Left style={{ justifyContent: "center" }}>
                {
                    type ?
                        <TouchableOpacity style={styles.topMarginTen} onPress={() => {
                            props.navigation.goBack()
                        }}>
                            <Icon style={styles.Icon} name="arrow-back" />

                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.topMarginTen} onPress={() => {
                           props.openDrawer()
                        }}>
                            <Icon style={styles.Icon} name="menu" />
                        </TouchableOpacity>
                }
            </Left>
            <Body>
            </Body>
            {
                isCardVisible ?
                    <View style={styles.textStyling}>
                        <Text style={styles.textSty}>{text}</Text>
                    </View>
                    : null
            }

            {/* <Right>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Profile');
            }}
            transparent>
            <Image
              source={require('../assets/avatar-empt.png')}
              style={{height: 25, width: 25}}
            />
          </Button>
        </Right> */}
        </Header>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: -20,
    },
    topMarginTen: {
        marginTop: 10
    },
    textStyling: {
        position: "absolute", height: "100%", justifyContent: "center"
    },
    textSty:
        { color: "white", fontSize: 18, fontWeight: "bold" },
    menu: {
        height: 20,
        width: 20,
        marginLeft: 10,
    },
    Icon: {
        color: APP_COLORS.BUTTON_COLOR,
        height: 40,
        width: 25,
        fontSize: 32,
    },
});