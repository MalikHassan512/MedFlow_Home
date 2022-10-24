// App Navigator

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home/index";
import Login from "../screens/login";
import { APP_STRINGS } from "../constants/strings";
import SignUpScreen from "../screens/signup";
import ConfirmScreen from "../screens/confirm";
import SideBar from "../constants/SideBar";
import QuestionsList from "../screens/questionsList";
import BarCode from "../screens/barCode";

import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name={APP_STRINGS.LOGIN} component={Login} />
        <Stack.Screen name={APP_STRINGS.BAR_CODE} component={BarCode} />
        <Stack.Screen
          name={APP_STRINGS.SIGN_UP_SCREEN}
          component={SignUpScreen}
        />
        <Stack.Screen
          name={APP_STRINGS.CONFIRM_SCREEN}
          component={ConfirmScreen}
        />

        <Stack.Screen name={APP_STRINGS.HOME} component={Home} />
        <Stack.Screen
          name={APP_STRINGS.START_SCREEN}
          component={MainNavigator}
        />
        <Stack.Screen
          name={APP_STRINGS.QUESTIONS_LIST}
          component={QuestionsList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainNavigator() {
  return (
    <Drawer.Navigator
      headerMode={"none"}
      drawerContent={(props) => <SideBar {...props} />}
    >
      <Drawer.Screen
        name={APP_STRINGS.QUESTIONS_LIST}
        component={QuestionsList}
      />
      <Drawer.Screen name={APP_STRINGS.HOME} component={Home} />
      <Drawer.Screen name={APP_STRINGS.BAR_CODE} component={BarCode} />

    </Drawer.Navigator>
  );
}
export default AppNavigator;
