import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons'
import { signOutUser } from '../network/firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

import Home from './Home';
import Settings from './Settings';

const Main = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={props =>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" icon={
                    ({ color, size }) => (
                        <Ionicons
                            name="ios-log-out"
                            color={color}
                            size={size}
                        />
                    )
                } onPress={() => {
                    console.log('logout');
                    signOutUser((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(res);
                            AsyncStorage.setItem('rememberMe', 'false');
                            navigation.navigate('Login');
                        }
                    });
                }} />
            </DrawerContentScrollView>

        } >
            <Drawer.Screen name="Bl0ckTalk" component={Home} options={
                {
                    drawerLabel: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="ios-home"
                            color={color}
                            size={size}
                        />
                    )
                }

            } />
            {/* <Drawer.Screen name="Settings" component={Settings}
                options={
                    {
                        drawerLabel: 'Settings',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons
                                name="ios-settings"
                                color={color}
                                size={size}
                            />
                        )
                    }
                } /> */}

        </Drawer.Navigator>
    );
}
export default Main;