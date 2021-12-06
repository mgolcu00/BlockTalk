import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'

import News from '../screens/News';
import Tweets from '../screens/Tweets';
import Notes from '../screens/Notes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {

    return (
        <Tab.Navigator screenOptions={({ route }) => ({

            tabBarOptions: {
                activeTintColor: '#e91e63',
                inactiveTintColor: '#000',
                labelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                style: {
                    backgroundColor: '#fff',
                },
            },
            tabBarIcon: ({ color, size, focused }) => {
                let iconName;
                if (route.name === 'News') {
                    iconName = focused
                        ? 'ios-logo-rss'
                        : 'ios-logo-rss';
                } else if (route.name === 'Tweets') {
                    iconName = focused ?
                        'ios-megaphone'
                        : 'ios-megaphone-outline';
                } else if (route.name === 'Notes') {
                    iconName = focused ?
                        'ios-book'
                        : 'ios-book-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
        })
        } >

            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Tweets" component={Tweets} />
            <Tab.Screen name="Notes" component={Notes} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});
