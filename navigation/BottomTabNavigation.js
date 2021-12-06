import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import News from '../screens/News';
import Tweets from '../screens/Tweets';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="News"  tabBarIcon component={News} />
                <Tab.Screen name="Tweets" component={Tweets} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

