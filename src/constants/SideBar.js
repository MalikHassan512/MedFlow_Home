
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ICONS_NAME } from '.';
import api from '../api';
import SideBarListItem from './SideBarListItem';
import { APP_STRINGS } from './strings';

const SideBar = (props) => {
    const [name, setName] = useState("")
    const [user, setUser] = useState();
    const isFocused = useIsFocused();
    useEffect(() => {
        const getUSer = async () => {
            const user = await api.getCurrentUser();
            setUser(user);
            setName(user?.["custom:firstName"] && user?.["custom:lastName"] ? user["custom:firstName"] + " " + user["custom:lastName"] : user ? user.email : '')
        }
        getUSer();
    }, [isFocused])
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 12 }}>
            <View style={styles.profile}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon
                        active
                        type="AntDesign"
                        name="user"
                        style={{ color: "rgba(0,0,0,0.5)", borderWidth: 2, borderColor: "rgba(0,0,0,0.5)", borderRadius: 10, padding: 2, fontSize: 32, }}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                    <Text style={{ fontSize: 14 }}>{name.length > 23 ? name.substring(0, 23) + "..." : name}</Text>
                </View>
            </View>


            {/* <SideBarListItem
                iconName={'dashboard'}
                title={'Rapid Antigen Test List'}
                notification={''}
                navigation={props.navigation}
                destination={'Antigen'}
                props={props.navigation}

            /> */}

            <SideBarListItem
                iconName={ICONS_NAME.QR_CODE}
                title={APP_STRINGS.SCAN_QR_CODE}
                notification={''}
                navigation={props.navigation}
                destination={APP_STRINGS.BAR_CODE}
                props={props.navigation}

            />

            <SideBarListItem
                iconName={ICONS_NAME.SETTING}
                title={APP_STRINGS.Settings}
                notification={''}
                navigation={props.navigation}
                destination={APP_STRINGS.HOME}
                props={props.navigation}

            />



            <SideBarListItem
                iconName={ICONS_NAME.LOG_OUT}
                title={APP_STRINGS.LOGOUT}
                notification={''}
                navigation={props.navigation}
                destination={APP_STRINGS.LOGIN}
                props={props.navigation}
            />




        </View>
    )
}

export default SideBar;

const styles = StyleSheet.create({
    profile: {
        marginTop: 50,
        marginBottom: 20,
        alignSelf: 'stretch',
        paddingLeft: 20,
        flexDirection: 'row',
    },
})
