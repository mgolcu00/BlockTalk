import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Animated from 'react-native-reanimated';
const AnimatedView = Animated.View
import BottomSheet from 'reanimated-bottom-sheet';

import NoteCard from "../components/NoteCard";
import NewsCard from "../components/NewsCard";

import { getNotes } from "../network/firebase/firestore";
const Notes = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(true);
    const [currentNews, setCurrentNews] = useState(null);
    const sheetRef = React.useRef(null);
    useEffect(() => {
        getNotesFromFirestore()
    }, []);


    const getNotesFromFirestore = () => {
        setLoading(true)
        getNotes().then(res => {
            setData(res);
            setLoading(false);
        }).catch(err => {
            setError(err);
        })
    }
    let fall = new Animated.Value(1)
    const renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolateNode(fall, {
            inputRange: [0, 1],
            outputRange: [0.5, 0],
        })

        return (
            <AnimatedView
                pointerEvents="none"
                style={[
                    styles.shadowContainer,
                    {
                        opacity: animatedShadowOpacity,
                    },
                ]}
            />
        )
    }

    const renderContent = () => (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 8,
                height: "100%",
            }}>
            <View
                style={styles.notch} />

            {currentNews ? <NewsCard data={currentNews} /> : null}
        </View>
    );

    return (
        <View style={styles.container}>
            <Ionicons name="ios-refresh" size={25} color={"#00BFFF"} onPress={
                () => {
                    getNotesFromFirestore()
                }
            } style={
                {
                    alignSelf:'flex-end',

                }
            }/>

            {
                error ?
                    <Text>{error}</Text>
                    :
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <NoteCard key={item.id} openNews={(item) => {
                            setCurrentNews(item);
                            sheetRef.current.snapTo(0);
                        }} onClick={(note) => {
                            navigation.navigate("AddNote", {
                                params: {
                                    news: note.new,
                                    note: note,
                                }
                            });
                        }} data={item} navigation={navigation} />}
                        keyExtractor={item => item.id}

                    />
            }

            <ActivityIndicator style={styles.loading} size="large" color="#00BFFF" animating={isLoading} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={[500, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
                initialSnap={2}
                onOpenStart={() => {
                    setVisible(false);
                }}
                onCloseEnd={() => {
                    setVisible(true);
                }}
                callbackNode={fall}
            />
            {renderShadow()}

            {visible ?
                <TouchableOpacity style={styles.addNoteButton}
                    visible={false}
                    onPress={() => {
                        navigation.navigate("AddNote", {
                            params: {
                            }
                        });
                    }}>
                    <Ionicons name="ios-add" style={styles.addNoteButtonIcon} size={32} color="white" />
                    <Text style={styles.addNoteButtonText}>Add Note</Text>
                </TouchableOpacity> : null
            }

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    notch: {
        backgroundColor: '#888888',
        padding: 0,
        height: 10,
        width: 60,
        borderRadius: 10,
        alignSelf: 'center',
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    addNoteButton: {
        flexDirection: "row",
        alignItems: "center",
        bottom: 20,
        width: 150,
        height: 50,
        backgroundColor: "#00BFFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: "center",
    },
    addNoteButtonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "Roboto",
    },
    addNoteButtonIcon: {
        marginRight: 10,
        marginLeft: 10,
    }

});
export default Notes;