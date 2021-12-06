import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { color } from 'react-native-reanimated';

const NewsCard = (props) => {
    const { title, author, pubDate, link, snippet, image } = props.data;

    onPress = () => {
        try {
            Linking.openURL(link);
        }
        catch (err) {
            console.log('An error occurred', err);
        }
    }

    return (
        <View>
            <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.line}></Text>
                <Text style={styles.content}>{snippet}</Text>
                <Text style={styles.date}>{pubDate}</Text>
                <Text style={styles.author}>{author}</Text>
                {props.isAddShow ? <Ionicons name="ios-document-attach" size={30} style={styles.addNoteButton} onPress={() => { props.addNote() }} /> : null}
                <Text style={styles.readMore} onPress={onPress}>Read More</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginStart: 10,
        marginEnd: 10,
        fontWeight: 'bold',
    },
    line: {
        borderBottomColor: '#f000f0',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    content: {
        fontSize: 15,
        marginBottom: 10,
    },
    date: {
        fontSize: 15,
        marginBottom: 10,
    },
    author: {
        fontSize: 15,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    readMore: {
        fontSize: 14,
        marginBottom: 10,
        color: '#02a8f3',
        textAlign: 'right',
    },
    addNoteButton: {
        alignSelf: "flex-start",
        color: "#00BFFF",
    }
});

export default NewsCard;