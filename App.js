import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, LogBox, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as firebase from 'firebase/app';
import apiKeys from './network/firebase/keys';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


import Login from "./screens/Login";
import AddNote from './screens/AddNote';
import Main from "./screens/Main";


import { savePushToken } from "./network/firebase/firestore";

import { NavigationContainer, NavigationActions } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


const Stack = createNativeStackNavigator();

const App = () => {
    LogBox.ignoreAllLogs(true)
    if (!firebase.apps) {
        //  console.log('Connected with Firebase')
        firebase.initializeApp(apiKeys.firebaseConfig);
    }

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" options={
                    {
                        detachPreviousScreen: true
                    }
                } component={Main} />
                <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        height: 50,
        backgroundColor: "#00a680",
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        color: "#fff",
        fontSize: 20
    },
    body: {
        flex: 1,
        padding: 10
    }
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        savePushToken({ token: token }).then(res => {
            if (res)
                console.log(res);
            else
                console.log("token is valid");
        })
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            lockscreenVisibility: true,
            showBadge: true,
            enableVibrate: true,
            enableLights: true
        });
    }

    return token;
}

export default App;