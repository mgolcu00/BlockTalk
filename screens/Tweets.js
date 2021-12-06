import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import TweetCard from "../components/TweetCard";


import {
    tweet_parsed,
    get_next
} from "../network/twitter/twitter"



const Tweets = ({ navigation }) => {
    const [tweets, setTweets] = useState([]);
    const [next, setNext] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);



    useEffect(() => {

        tweet_parsed('Blokchain', (err, data) => {
            if (err) {
                console.log(err);
                setError(err);
                setIsLoading(false);
                setIsEmpty(false);
            } else {
                if (data.tweets == null) {
                    setIsEmpty(true);
                }
                else {
                    setIsEmpty(false);
                }
                setTweets(data.tweets);
                setNext(data.next);
                setIsLoading(false);
            }
        })
    }, []);

    loadMoreData = () => {
        if (next) {
            setIsLoading(true);
            get_next(next, (err, data) => {
                if (err) {
                    setError(err);
                    setIsLoading(false);
                } else {
                    setTweets([...tweets, ...data.tweets]);
                    setNext(data.next);
                    setIsLoading(false);
                }
            })
        }
    }

    return (

        <View style={styles.container}>
            {
                error ?
                    <Text>{error}</Text>
                    :
                    isEmpty ?
                        <Text style={styles.emptyText}>No tweets found</Text>
                        :
                        <FlatList
                            data={tweets}
                            renderItem={({ item }) => <TweetCard key={item.id} data={item} navigation={navigation} />}
                            onEndReachedThreshold={0}
                            onEndReached={() => loadMoreData()}
                        />
            }
            <ActivityIndicator style={styles.loading} size="small" color="#0000ff" animating={isLoading} />
        </View>
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
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        fontSize: 20,
        textAlign: "center",
        marginTop: "50%"
    }
});


export default Tweets;