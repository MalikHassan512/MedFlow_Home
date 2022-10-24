import { DataStore, Predicates, SortDirection, syncExpression } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify';
import { Platform } from 'react-native';



const getCurrentUser = async () => {
    try {
        const response = await Auth.currentAuthenticatedUser();
        // console.log('getCurrentUser111 ', JSON.stringify(response));
        let object = {
            ...response.attributes,
            roles:
                response.signInUserSession.accessToken.payload['cognito:groups'] || [],
            isAdmin: function () {
                return this.roles.some(
                    (role) => role === 'Admins' || role === 'Testers' && Platform.OS !== "android",
                );
            },
            isUser: function () {
                return this.roles.some((role) => Platform.OS === "android" ? "Employees" : role === 'Employees');
            },
        };
        if (Platform.OS === 'android') {
            object['custom:role'] = 'Employees'
            object['roles'] = ['Employees']

        }
        return object;
    } catch (err) {
        return null;
    }
};

const signIn = async (username, password) => {
    try {
        console.log("trigger == > " , username, password)
        const response = await Auth.signIn(username, password);
        console.log('login api response: ', JSON.stringify(response));
        let object = {
            ...response.attributes,
            roles:
                response.signInUserSession.accessToken.payload['cognito:groups'] || [],
            isAdmin: function () {
                return this.roles.some(
                    (role) => role === 'Admins' || role === 'Testers' && Platform.OS !== "android",
                );
            },
            isUser: function () {
                return this.roles.some((role) => Platform.OS === "android" ? "Employees" : role === 'Employees');
            },
        };
        if (Platform.OS === 'android') {
            object['custom:role'] = 'Employees'
            object['roles'] = ['Employees']

        }
        console.log("prinntLoginObject", JSON.stringify(object))
        return object
    } catch (err) {
        return undefined;
    }
};

export default {
    signIn,
    getCurrentUser
}