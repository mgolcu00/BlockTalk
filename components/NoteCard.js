import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Pressable } from 'react-native';

import NewsCard from './NewsCard';


const Tags = (props) => {
    const { tags } = props;
    return (
        <View style={styles.tagsContainer}>
            {tags.map((tag, index) => {
                return (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                )
            })}
        </View>
    )
}


const NoteCard = (props) => {
    const { text, created, color, tags, priority } = props.data;
    const newsData = props.data.new

    return (
        <View style={styles.container} >
            <Pressable onPress={
                () => {
                    props.onClick(props.data)
                }
            }>
                <View style={styles.header}>
                    {tags ? <Tags tags={tags} /> : null}
                    {newsData ?
                        <View style={styles.newsContainer} >
                            <Ionicons name="ios-newspaper-outline" size={30} color={"green"} onPress={
                                () => {
                                    props.openNews(newsData)
                                }
                            } />
                        </View>
                        :
                        <View style={styles.newsContainer}>
                            <Ionicons name="ios-newspaper-outline" size={30} color={"red"} />
                        </View>
                    }
                </View>
                <View style={styles.note}>
                    <Text style={styles.text}>{text}</Text>
                    <Text style={styles.date}>{created}</Text>
                </View>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: 10,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    note: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    newsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
    date: {
        fontSize: 12,
        color: '#000',
        marginTop: 20,
        alignSelf: 'flex-end',
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

export default NoteCard;