import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Pressable, TextInput, Platform } from "react-native";
import { signIn, getUser, createUser } from '../network/firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

function MyCheckbox({ onCheckedChange }) {
    const [checked, onChange] = useState(false);
    function onCheckmarkPress() {
        onCheckedChange(!checked)
        onChange(!checked);
    }
    return (
        <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={onCheckmarkPress}>
            {checked && <Ionicons name="ios-checkmark" style={styles.checkboxIcon} size={24} color="white" />}
        </Pressable>
    );
}

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        try {
            getRememberedUser();
        } catch (e) {
            console.log(e);
        }
    }, [])

    getRememberedUser = async () => {
        try {
            const rememberMe = await AsyncStorage.getItem('rememberMe');
            if (rememberMe === 'true') {
                getUser((err, res) => {
                    if (res) {
                        navigation.navigate('Main')
                    }
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    rememberUser = async () => {
        try {
            await AsyncStorage.setItem('rememberMe', 'true');
        } catch (e) {
            console.log(e);
        }
    }


    login = async () => {
        signIn(username, password, (err, user) => {
            if (err) {
                if (err == "User not found") {
                    Alert.alert(
                        'User not found',
                        'Do you want to create an account?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => createUser(username, password, (err, res) => {
                                    if (res) {
                                        alert('Account created successfully')
                                        login()
                                    }
                                }
                                )
                            },
                        ],
                        { cancelable: false },
                    );
                } else
                    alert(err);
            } else {
                try {
                    if (checked) {
                        rememberUser(checked);
                    }
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }]
                    })
                    navigation.navigate("Main");
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bl0ckT4lk</Text>
                {/* <Image style={styles.logo} source={{ uri: 'https://cdn.pixabay.com/photo/2019/10/24/08/23/lock-4573711_1280.png' }} /> */}
                <Ionicons name="ios-logo-electron" style={styles.logo} size={100} color="#a200ff" />
            </View>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-mail" style={styles.inputIcon} size={24} color="#00BFFF" />
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(username) => setUsername(username)} />
                    </View>
                </View>
                <View style={styles.bodyContent}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-lock-closed" style={styles.inputIcon} size={24} color="#00BFFF" />
                        <TextInput style={styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => setPassword(password)} />
                    </View>
                </View>
                <View style={styles.rememberContent}>
                    <MyCheckbox onCheckedChange={(checked) => setChecked(checked)} />
                    <Text style={styles.checkboxLabel}>Remember me</Text>
                </View>
                <TouchableOpacity style={styles.rightArrowSquareButton} onPress={() => login()}>
                    <Ionicons name="ios-arrow-forward" style={styles.rightArrowSquareButtonIcon} size={32} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#00BFFF',
        borderRadius: 10,
        height: 200,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 50,
    },
    headerText: {
        color: '#fff',
        fontSize: 50,
        fontFamily: 'monospace',
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        marginBottom: 20,
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: 'rgba(0,191,255,0.2)',
        borderRadius: 10,
        borderBottomWidth: 1,
        width: 300,
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 25,
        height: 25,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 80,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#00BFFF',
    },
    loginButton: {
        backgroundColor: "#00BFFF",
    },
    loginText: {
        color: 'white',
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#00BFFF',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#00BFFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontWeight: '100',
        fontSize: 14,
        color: 'black'
    },
    checkboxIcon: {
        width: 24,
        height: 24,
        alignSelf: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        marginTop: 30,
        alignSelf: 'center',
    },
    rightArrowSquareButton: {
        width: 80,
        backgroundColor: '#00BFFF',
        borderColor: 'coral',
        elevation: 5,
        borderRadius: 10,
        height: 80,
        alignSelf: 'flex-end',
        marginTop: 30,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArrowSquareButtonIcon: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },


});


export default Login;