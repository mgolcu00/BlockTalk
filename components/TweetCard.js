import React from 'react';

import { View, Text, StyleSheet, Image, Linking } from 'react-native';

const TweetCard = (props) => {
    const { user, text, imageUrl, link } = props.data;

    onClick = () => {
        try {
            if (link.expanded_url) {
                Linking.openURL(link.expanded_url);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <Image source={{ uri: user.imageUrl }} style={styles.image} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.screenName}>@{user.username}</Text>
            </View>
            <Text style={styles.text}>{text}</Text>
            {imageUrl ?
                <Image source={{ uri: imageUrl }} style={styles.bigImage} /> : null}

            <Text style={styles.link} onPress={() => onClick()}>Read More</Text>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    user: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 18,
        marginLeft: 10
    },
    screenName: {
        fontSize: 14,
        color: '#ccc',
        marginLeft: 10,
        alignSelf: 'flex-end'
    },
    text: {
        padding: 10,
        fontSize: 16,
    },
    link: {
        padding: 10,
        fontSize: 16,
        color: '#0084b4',
        alignSelf: 'flex-end'
    },
    bigImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    }


});

export default TweetCard;