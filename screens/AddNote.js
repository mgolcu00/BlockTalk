import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import NewsCard from "../components/NewsCard";

import { addNote } from "../network/firebase/firestore";

const Tags = [
    "Happy",
    "Sad",
    "Emergency!",
    "So so",
    ":')"
]


const News = (props) => {
    const note = props.route.params.params.note
    const [text, setText] = useState(note ? note.text : "");
    const [tags, setTags] = useState(note ? note.tags : []);
    const [news, setNews] = useState(props.route.params.params.news ? props.route.params.params.news : null);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState(note ? note.color : "");
    const [isNoteChanged, setIsNoteChanged] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        if (note)
            setIsAdd(false);
        else {
            setIsAdd(true);
            setIsNoteChanged(true);
        }
    }, [note]);

    const isTagsSame = () => {
        if (note)
            note.tags.forEach(tag => {
                if (tags.indexOf(tag) === -1) {
                    return false;
                }
            });
        return true;
    }


    const onTextChange = (txt) => {
        if (note)
            if (txt === note.text) {
                if (isTagsSame()) {
                    setIsNoteChanged(false);
                } else {
                    setIsNoteChanged(true);
                }
            } else {
                setIsNoteChanged(true);
            }
        setText(txt);
    };


    return (
        <View style={styles.container}>
            <View style={styles.root}>
                <ScrollView>
                    {news ? <View style={styles.newsContainer}>
                        <Ionicons name="ios-close-sharp" size={30} style={styles.deleteNews} color="red" onPress={() => {
                            setNews(null);
                        }} />
                        <NewsCard data={news} />
                    </View>
                        : null}

                    <View style={styles.tagsContainer}>
                        {
                            Tags.map((tag1, index1) => {
                                return (
                                    <View style={styles.tag} key={index1}>
                                        <Text style={styles.tagText}>{tag1}</Text>
                                        {tags.indexOf(tag1) == -1 ?
                                            <Ionicons name="ios-add-sharp" size={20} style={styles.tagCheck} color="green" onPress={() => {
                                                setTags([...tags, tag1]);
                                            }} /> :
                                            <Ionicons name="ios-close-sharp" size={20} style={styles.tagCheck} color="red" onPress={() => {
                                                setTags(tags.filter(tag => tag !== tag1));
                                            }} />}
                                    </View>
                                )
                            })
                        }
                    </View>


                    <TextInput style={styles.input}
                        multiline={true}
                        onChangeText={(text) => onTextChange(text)}
                        value={text}
                    >
                    </TextInput>

                </ScrollView>
            </View>
            <TouchableOpacity style={[styles.button, {
                backgroundColor: isNoteChanged ? '#00BFFF' : 'red'
            }]} onPress={() => {
                if (isNoteChanged) {
                    if (isAdd) {
                        setLoading(true);
                        let newNote = {
                            text: text,
                            tags: tags,
                            color: color,
                            created: new Date().getTime(),
                            new: news
                        }
                        addNote(newNote).then(() => {
                            setLoading(false);
                            props.navigation.goBack();
                        });
                    }
                    else {
                        let newNote = note;
                        newNote.text = text;
                        newNote.tags = tags;
                        newNote.new = news;
                        // addNote(newNote).then(() => {
                        //     props.navigation.goBack();
                        // });
                    }

                }
                else {
                    props.navigation.goBack();
                }
            }}>
                <Text style={styles.buttonText}>{isNoteChanged ? "Save" : "Cancel"}</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 50,
    },
    root: {
        flex: 1,
        padding: 10,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#fff",
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    deleteNews: {
        position: "relative",
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        marginTop: 4,
        marginLeft: 4,
    },
    input: {
        padding: 10,
        width: "90%",
        height: 250,
        alignSelf: "center",
        borderRadius: 5,
        fontFamily: "monospace",
        color: "#000",
        margin: 10,
        fontSize: 18,
        textAlignVertical: "top"
    },
    button: {
        padding: 10,
        margin: 20,
        width: 80,
        bottom: 0,
        height: 60,
        alignSelf: "flex-end",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 18
    },
    tagsContainer: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#00BFFF',
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
    tagText: {
        fontSize: 14,
        fontFamily: 'monospace',
        color: '#fff',
    },
});


export default News;